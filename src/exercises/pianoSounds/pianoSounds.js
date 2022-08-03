// import { Sounds } from "./piano-wav/exportSounds";
import { Sounds } from "./piano-wav/exportSounds";
import Silent from "./piano-wav/silent.wav"; // Used in Note.quickPlay() hack.
import { DEMO } from "../../pages/Exercise";

const DEBUG = true;

// const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B']; // Dead code: transferred this to Notes class as static object.
// const pathToFolder = "./piano-wav/"; // Where all samples are stored. Lowest note available: C1. Highest note available: C8.
let audioObjects = []; // Global list to keep track of all sounds currently playing
let repeatMap; // Global variable to remember most recently played.

/** Class representing a note.
 * 
 * Separating the letter and octave makes for easier and more efficient function calls.
 * @typedef {Object} Note
 * @property {string} name - the full name in scientific pitch notation
 * @property {string} letter - Just the letter part of `name`.
 * @property {number} octave - Just the number part of `name`.
*/
export class Note {

  static audioCtx; // = new AudioContext();

  static min = 2;
  static max = 4;
  static notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
  static Silence = new Audio(Silent); // Used in Note.quickPlay() hack.
  audioBuffer;
  // buffer = await Note.createAudioBuffer(this.name);
  buffer;
  /** Create a Note object from a note name. 
   * If one isn't given, a random note is generated.
   * The available range of notes you can create is C1 to C8 inclusive.
   * @param {string} noteName - Note name in scientfic pitch notation e.g. "Cs4".
   */
  constructor(noteName, audioBuffer=undefined) {
    if (DEBUG) console.log(`constructing note: ${noteName}`);
    if (noteName === undefined) {
      this.letterIndex = getRandomInt(12); // 12 notes in western scale
      this.octave = Note.#getRandomOctave(Note.min, Note.max);
      this.letter = Note.notes[this.letterIndex];
      this.name = this.letter + this.octave;
      this.audioElement = new Audio(Sounds[this.name]);
      this.staticPath = Sounds[this.name]; // Path to the .wav file imported from the src folder.
      this.audioBuffer = audioBuffer;
    }
    else {
      this.name = noteName;
      this.letter = noteName.slice(0,-1);
      this.octave = parseInt(noteName[noteName.length-1]);
      this.letterIndex = Note.notes.indexOf(this.letter);
      this.audioElement = new Audio(Sounds[noteName]);
      this.staticPath = Sounds[noteName]; // Path to the .wav file imported from the src folder.
      this.audioBuffer = audioBuffer;
    }
  }

  /** Pretty print a Note object and its properties.
   * @param {string} callingFunction - The name of the parent function from which you're calling printNote().
   */
  printNote(callingFunction) {
    
    console.log(`Printing ${this.name} from ${callingFunction}():`)
    // console.log(`\tthis.letter: ${this.letter}`)
    // console.log(`\tthis.octave: ${this.octave}`)
    // console.log(`\tthis.letterIndex: ${this.letterIndex}`)
    // console.log(`\tthis.audioElement: ${this.audioElement}`)
    console.log(`\tthis.staticPath: ${this.staticPath}`)
    console.log(`\tthis.audioBuffer: ${this.audioBuffer}`)
  }

  /** Wrapper function for the Note constructor to create new Note objects with properly initialized audio buffers.
   * @description Asynchronous code like fetch() isn't allowed in constructors. To get around that, this factory function creates the Note with its property audioBuffer=undefined, awaits until it can store Sounds[noteName] in audioBuffer, and only then returns the new Note.
   * @async
   * @param {string} noteName - Name of the note to create in scientific pitch notation.
   * @returns {Promise<Note>} A Promise that resolves to a new Note object with the audioBuffer set to Sounds[noteName].
   */
  static async newNote(noteName) {
    if (DEBUG) console.log(`newNote() [starting]: noteName = ${noteName}`);

    // First instantiate a new Note normally (audioBuffer will be undefined).
    let newNote = new Note(noteName);
    // newNote.printNote(`newNote`); // Show that newNote.audioBuffer is still undefined.

    // Then, use createAudioBuffer() to set the audioBuffer property and return the new Note.
    return await Note.createAudioBuffer(noteName)
      .then( (buffer) => {
        newNote.audioBuffer = buffer;
        // console.log(`newNote(): In then(), newNote.audioBuffer = ${newNote.audioBuffer}`);
        // newNote.printNote(`newNote`); // Show that newNote.audioBuffer is now set.
        return newNote;
      })
      .catch( (err) => {
        console.error(`newNote(): Note.createAudioBuffer(${noteName}) failed: ${err}`);
        return undefined;
      });
  }

  /** Syntactic sugar: `await fetch(Sounds[noteName]);` -> `await Note.fetchSound(noteName);`
   * @param {string} noteName - Name of the note to create in scientific pitch notation.
   * @returns {Promise<Response>} A promise that resolves to the resposne after requesting the imported wav file.
   */
  static async fetchSound(noteName) {
    let resp = await fetch(Sounds[noteName]);
    // console.log(`resp url: ${resp.url}`)
    // console.log(`resp: ${resp.status}`)
    return resp;
  }

  /** Fetch and store the note's wav file in an audio buffer to use every time we need to create an audioBufferSourceNode. 
   * @param {string} noteName - Name of the note to create in scientific pitch notation.
   * @returns {Promise<AudioBuffer>} A Promise that resolves to an audio buffer storing the .wav file.
   */
  static async createAudioBuffer(noteName) {
    if (DEBUG) console.log('Note.createAudioBuffer() [starting]');
  
    // Create an audio context.
    const audioCtx = new AudioContext();
    
    // Fetch the wav file.
    const resp = await fetch(Sounds[noteName]); // using path to src folder
    if (DEBUG) console.log(`Note.createAudioBuffer(): resp: ${resp}, resp.url: ${resp.url}`);

    // Create an ArrayBuffer.
    const arrayBuffer = await resp.arrayBuffer();
    // console.log(`Note.createAudioBuffer(): arrayBuffer: ${arrayBuffer}`);
    
    // Decode the ArrayBuffer into an AudioBuffer.
    let audioBuffer = await audioCtx.decodeAudioData(
      arrayBuffer, 
      (buffer) => { 
        // console.log(`then() decodeAudioData: returning ${buffer}`);
        return buffer;
      }, 
      (err) => {
        console.error(`Note.createAudioBuffer(): error decoding audio data: ${arrayBuffer}`);
        console.error(err);
        return undefined;
      }
    );

    // Return the new audioBuffer (or undefined).
    console.log(`Note.createAudioBuffer() [ending]: Returning audioBuffer as ${audioBuffer}`);
    return audioBuffer;
  }

  // ? This function is only asynchronous when `this.audioBuffer == undefined`. Can we pull out that guard condition so this function can be called sychronously?
  // * Solution: new call `new Note()`. Only call `await Note.newNote()`.
  /** New play() method that uses web audio api.
   */
  // async play() {
  play(duration=2, when=0) {
    if (Note.audioCtx === undefined) {
      Note.setAudioContext();
    }

    if (DEBUG) console.log(`play() [starting]: Attempting to play ${this.name}`);
    // Make sure `this.audioBuffer` isn't still undefined, since the constructor doesn't set the audioBuffer, Note.newNote() does.
    if (this.audioBuffer === undefined) {
      /** If we wanted to the audioBuffer here we could, but that would make this function asynchronous which makes the code more complex. */
      // console.error(`In play(): this.audioBuffer is undefined and will now be initialized. Consider setting it earlier for faster playback.`)
      // this.audioBuffer = await Note.createAudioBuffer(this.name)
      //   .then( (buffer) => {
      //     return buffer
      //   })
      //   .catch((err) => {
      //     console.error(`In play(): Note.createAudioBuffer(this.name) failed.`);
      //     console.error(err);
      //   });
      // console.log(`play(): this.audioBuffer is now ${this.audioBuffer}`);
      console.error("In play(): this.audioBuffer is undefined. Remember to use `await Note.newNote(noteName)` not `new Note(noteName)`");
      return;
    }
    const source = Note.audioCtx.createBufferSource();
    // if (DEBUG) console.log(`play() AUDIO CONTEXT: ${source.context}`);
    source.buffer = this.audioBuffer;
    // console.log(`play(): source.buffer: ${source.buffer}`) // This is now an audio buffer
    source.connect(Note.audioCtx.destination);
    source.start(Note.audioCtx.currentTime + when, 0, duration); // Todo: start(when, offset, duration): set when for scales/intervals and duration for cutoff?
  }

  /** Set or reset the Audio Context for all Notes.
   * 
   * @description This method should be called outside of pianoSounds.js or inside of a guard condition
   * for when Note.audioCtx is undefined. Since pianoSounds.js is a library now, setting Note.audioCtx 
   * from outside the library is an efficient way to generate 1 shared audio context.
   */
  static setAudioContext() {
    if (DEBUG) console.log(`SETTING AUDIO CONTEXT`); // Todo: should this be set to 'interactive' or 'playback'?
    Note.audioCtx = new AudioContext();
    // let str = JSON.stringify(Note.audioCtx);
    // console.log(`New Audio Context: ${str}`);
  }

  static closeAudioContext() {
    console.log(`CLOSING AUDIO CONTEXT`)
    if (Note.audioCtx !== undefined) {
      Note.audioCtx.close();
    }
  }

  /** New Note.quickPlay() method that uses the web audio api.
   * 
   * @description In order for this function to be synchronous, it's important that the audioBuffer property of each Note is already initialized to encode a .wav file.
   * @param {Array<Note>} listOfNoteObjects - A list of Note objects with their audioBuffers already initialized.
   * @param {number} duration - Time in milliseconds to let the chord play.
   */
  // static async playChord(listOfNoteObjects, duration=3000) {
  static playChord(listOfNoteObjects, duration=3000) {
    if (Note.audioCtx === undefined) {
      Note.setAudioContext();
    }

    let chord = [];

    for (let i = 0; i < listOfNoteObjects.length; i++) {
      // console.log(`note[${i}]: ${listOfNoteObjects[i].name}`);
      const note = listOfNoteObjects[i];
      console.log(`playChord(): listOfNoteObjects[${i}].audioBuffer: ${note.audioBuffer}`)
      // note.audioBuffer = await Note.createAudioBuffer(note.name);
      let source = Note.audioCtx.createBufferSource();
      source.buffer = note.audioBuffer;
      source.connect(Note.audioCtx.destination);
      chord.push(source);
    }

    chord.forEach(source => {
      source.start(0, 0, duration/1000);
    });
  }

  /** Pick a random octave for a new note.
   * @private This should only be used by the constructor.
   * @param {number} min - lowest possible octave
   * @param {number} max - highest possible octave
   * @returns {number} A number between min and max representing an octave.
   */
  static #getRandomOctave(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  // Old play() method that used <audio>
  // /** Play the note.
  //  * @returns {Promise} A Promise which is resolved when playback has been started, or is rejected if for any reason playback cannot be started.
  //  */
  // play(duration=3000, sustain=false) {
  //   audioObjects.push(this.audioElement);
  //   // let p = this.audioElement.play() // returning a Promise
  //     // .then( () => {
  //     //   console.log(`play(${this.name}): nice!`);
  //     // })
  //     // .catch( (err) => {
  //     //   console.error(`play(${this.name}): uh oh \n`, err);
  //     // });
  //   let p = this.audioElement.play() // returning a Promise
  //     .then( () => {
  //       if (!sustain) {
  //         // console.log(`Stopping Note.`)
  //         this.stop(duration);
  //       }
  //     }).catch( () => {
  //       console.error(`Couldn't play Note.`);
  //     })
  //   return p;
  // }

  /** Use this to (hopefully) avoid lag between notes when playing a chord.
   * 
   * This is faster is because it separates out all work besides HTMLMediaElement.play() 
   * into a previous for-loop. This was meant to fix the lag issue between the 1st and 2nd note that 
   * sometimes occurs when playing chords with playChord() but it didn't seem to work even though in theory this
   * should be faster. So, I also made the first "note" silence so that the lag between the 1st and 2nd note
   * wouldn't be noticed. Still this only works half the time.
   * @param {Array<Note>} listOfNoteObjects
   * @returns {Promise} A promise that resolves when the last note in the list begins playback.
   */
  static quickPlay(listOfNoteObjects, duration=3000) {
    let chord = [Note.Silence];
    listOfNoteObjects.forEach(note => {
      let ele = note.audioElement;
      chord.push(ele);
      audioObjects.push(ele);
    });
    
    let lastIndex = chord.length-1;
    for (let i = 0; i < lastIndex; i++) {
      chord[i].play();
    }
    let p = chord[lastIndex].play();

    setTimeout( () => {
        Note.stopChord(chord, duration);
      }, duration
    )

    return p; 
  }

  /** Fade out an HTMLMediaElement. 
   * @private This is meant to be used in Note.stopChord().
   * @param {HTMLMediaElement} audioElement - An audio element created by new Audio().
   * @param {number} duration - Time in milliseconds to let the note play.
   */
  static fadeOutAudioElement(audioElement, duration=1000) {
    
    // const fadeOutPoint = duration / 2; // fadeOutPoint point is when the note should start fading out (arbitrarily set at halfway)
    const fadeOutPoint = duration; // linear fadeout from beginning to end
    const fadeDuration = duration - fadeOutPoint; // The note should start fading out at the halfway point.
    const changeVolume = .01; // A constant to decrease the volume by
    const slope = changeVolume / fadeDuration; // Determines how quickly the audio fades out.

    /** Fade out the audio instead of cutting it off abruptly. */
    const fadeAudio = setInterval(() => {
      const fadePoint = fadeOutPoint / 1000; // setTimeout is in milliseconds but audioElement.duration and audioElement.currentTime are in seconds.
      if ((audioElement.currentTime >= fadePoint) && (audioElement.volume > 0)) {
        let newVolume = audioElement.volume - changeVolume;
        if (newVolume > 0) {
          audioElement.volume = newVolume;
        }
        else {
          // audioElement.pause();
          clearInterval(fadeAudio);
        }
      }
    }, slope);
  }

  /** Fade out a list of HTMLMediaElement audio sources.
   * @private Only meant to be used by Note.quickPlay().
   * @param {Array<HTMLMediaElement>} chord - A list of audio elements.
   * @param {number} duration - Time in milliseconds to let the chord play.
   */
  static stopChord(chord, duration = 1500) { // Todo: Since this doesn't pop elements off audioObjects, find a way to remove unplayable elements from audioObjects.
    chord.forEach(audioElement => {
      Note.fadeOutAudioElement(audioElement, duration);
    });
  }

  /** Fade out a note to silence.
   * @param {number} duration - Time in milliseconds to let a note play before stopping it.
   */
  stop(duration=1000) { // Todo: Since this doesn't pop elements off audioObjects, find a way to remove unplayable elements from audioObjects.

    // slope = y / x
    // fadeDuration = x
    // y = slope * fadeDuration
    // .05 == fadeDuration / slope

    const fadeOutPoint = duration / 3 * 2; // fadeOutPoint point is when the note should start fading out (arbitrarily set at halfway)
    const fadeDuration = duration - fadeOutPoint; // The note should start fading out at the halfway point.
    const changeVolume = .01; // A constant to decrease the volume by
    const slope = changeVolume / fadeDuration; // Determines how quickly the audio fades out.


    /** Fade out the audio instead of cutting it off abruptly. */
    const sound = this.audioElement;
    // let i = 0;
    const fadeAudio = setInterval(() => {
      const fadePoint = fadeOutPoint / 1000; // setTimeout is in milliseconds but sound.duration and sound.currentTime are in seconds.
      if ((sound.currentTime >= fadePoint) && (sound.volume > 0)) {

        let newVolume = sound.volume - changeVolume;
        if (newVolume > 0) {
          sound.volume = newVolume;
          // console.log(`${i++}. volume = ${newVolume}`);
        }
        else {
          // sound.pause();
          clearInterval(fadeAudio);
        }
      }

      // if (sound.volume < 0.003) {
      //   clearInterval(fadeAudio);
      // }
    }, slope);
  }

  /** Get the note a certain number of semitones away from the current note.
   * @async
   * @param {number} semitones - Can be a positive or negative number.
   * @returns {Promise<Note>} A Promise that resolves to a new Note object.
   */
  async nextNote(semitones) { // Todo: Rewrite this so it can handle very large intervals (rn can't produce anything 2 octaves away)
    let nextIndex = this.letterIndex + semitones;
    let nextLetter = Note.notes[nextIndex%12];
    let octaveDisplacement = (nextIndex < 12 && nextIndex >= 0) 
                              ? 0 // same octave
                              : ((nextIndex >= 12) 
                                  ? 1 // 1 octave higher
                                  : -1 // 1 octave lower
                                )
    let nextOctave = this.octave + octaveDisplacement;
    let noteName = nextLetter + (nextOctave).toString();
    if (nextOctave < 1 || (nextOctave == 8 && nextLetter !== 'C') || nextOctave > 8) {
      console.error(`Note.nextNote() generated an out of range note: ${noteName}`);
    } 
    let finalNote = await Note.newNote(noteName)
      .then( (note) => {
        note.printNote(`then of nextNote`); 
        return note;
      });

    finalNote.printNote(`nextNote`);
    return finalNote;
    // return new Note(noteName);
  }

  /** Get the corresponding note name of an integer.
   * 
   * The lowest note name this can generate is C2.
   * @param {number} i - A non-negative integer.
   * @returns {string} The name of the note in scientific pitch notation.
   */
  static numberToNoteName(i) {
    if (i < 0) return; // guard condition
    let letter = Note.notes[i%12];
    let octave = (Math.trunc(i/12) + 2); // Alternatively, use Note.min for floor
    return letter + octave;
  }

  /** Generate a Note object from a number.
   * 
   * The lowest note this can generate is C2 (when i = 0).
   * @param {number} i - A non-negative integer.
   * @returns {Note} A new Note object.
   */
  static numberToNote(i) {
    if (i < 0) return; // guard condition
    let noteName = Note.numberToNoteName(i);
    return new Note(noteName);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/** Pause and delete all Notes currently playing.
 * 
 * This works by iterating through the global audioObjects list.
 * @Returns {Promise} A Promise that resolves when every audio element is paused.
 */
export function stopAll() {

  let p = new Promise( (resolve, reject) => {
    if (audioObjects == undefined) {audioObjects = []; resolve()}
    if (audioObjects.length === 0) { resolve() }

    // Stop all audio.
    while (audioObjects.length > 0) {
      audioObjects.pop().pause();
    }

    // Make sure there's no audio elements left.
    if (audioObjects.length == 0) {
      resolve();
    }
    else {
      console.error('stopAll(): Unable to pause all audio elements');
      reject();
    }
  })

  return p; // Todo: Rewrite references to stopAll() to take advantage of returned Promise.
}

export function playRandomNote() {
  let note = new Note();
  console.log(`Playing ${note.name}`);
  note.play();
  return note.name;
}

/** Return an array containing the name and number of semitones in an interval. 
 * If semitones argument isn't given, a random interval map is returned.
 * @param {number} [semitones] - How many semitones between the interval and root note.
 * @returns {Array<string, number>} A 2-array of the form [{string} name, {number} semitones].
 */
export function getIntervalMap(semitones) {
  
  // Names must match the names in ../../context/auth-context.js
  const intervals = [
    ["Minor 2nd", 1],
    ["Major 2nd", 2],
    ["Minor 3rd", 3],
    ["Major 3rd", 4],
    ["Perfect 4th", 5],
    ["Tritone", 6],
    ["Perfect 5th", 7],
    ["Minor 6th", 8],
    ["Major 6th", 9],
    ["Minor 7th", 10],
    ["Major 7th", 11],
    ["Octave", 12]
  ]
  
  let i = (semitones === undefined) 
    ? getRandomInt(intervals.length)
    : semitones - 1;

  return intervals[i];
}

/** Given a number, return a map describing the chord's name and structure.
 * 
 * This function is specifically designed to be used in Chords(first_note, chord_type)
 * in toneFunctions.js.
 * @param {number} index - The index to access in values[] to select the chord type.
 * @returns {Array<string, number} An array where the first element is the chord's name
 * and the rest of the elements are the chords intervals as semitones.
 */
export function getChordMap(index) {

  /** Values must match the values in ../toneFunctions.js function find_chord_type(num)
   *  Values must also match the values in ../../context/auth-context.js
  */
  const values = [
    "Major",
    "Minor",
    "Diminished",
    "Augmented",
    "Dominant Seventh",
    "Major Seventh",
    "Minor Seventh",
  ];
  
  const chordsDictionary = {
    "Major" : ["Major",4,7],
    "Major Seventh" : ["Major Seventh",4,7,11],
    "Dominant Seventh" : ["Dominant Seventh",4,7,10],
    "Minor" : ["Minor",3,7],
    "Minor Seventh" : ["Minor Seventh",3,7,10],
    "Diminished" : ["Diminished",3,6],
    "Augmented" : ["Augmented",4,8],
    "Half Diminished 7th" : ["Half Diminished 7th",3,6,10], // (minor triad with dominant 7th)
  }

  // If no chord type is specified, return a random chord map
  if (index === undefined) { index = getRandomInt(values.length) }

  let key = values[index];

  return chordsDictionary[key];
}

// Todo: delete this function. It's no longer necessary.
function getRandomChordMap() {
  
  const chords = [
    ['major',4,7], // major
    ['major 7th',4,7,11], // major 7th
    ['minor',3,7], // minor
    ['minor 7th',3,7,10], // minor 7th
    ['diminished',3,6], // diminished
    ['augmented',4,8], // augmented
    ['half diminished 7th',3,6,10], // half diminished 7th (minor triad with dominant 7th)
  ]
  
  let i = getRandomInt(chords.length);

  return chords[i];
}

/** Given a number, return a map describing the scales's name and structure.
 * 
 * This function is specifically designed to be used in Scales(first_note, scale_type)
 * in toneFunctions.js.
 * @param {number} index - The index to access in values[] to select the scales type.
 * @returns {Array<string, number} An array where the first element is the scales's name
 * and the rest of the elements are the scales intervals as semitones.
 */
export function getScaleMap(index) {

  /** Values must match the values in ../toneFunctions.js function find_scale_type(num)
   *  Values must also match the answers for "Scales" in ../../context/auth-context.js
  */
  const values = [
    "Major (Ionian)",
    "Natural Minor (Aeolian)",
    "Harmonic Minor",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
  ];
  
  const scalesDictionary = {
    "Major (Ionian)" : ["Major (Ionian)",2,4,5,7,9,11,12],
    "Natural Minor (Aeolian)" : ["Natural Minor (Aeolian)",2,3,5,7,8,10,12],
    "Harmonic Minor" : ["Harmonic Minor",2,3,5,7,8,11,12],
    "Dorian" : ["Dorian",2,3,5,7,9,10,12],
    "Phrygian" : ["Phrygian",1,3,5,7,9,10,12],
    "Lydian" : ["Lydian",2,4,6,7,9,11,12],
    "Mixolydian" : ["Mixolydian", 2,4,5,7,9,10,12] ,
    "Locrian" : ["Locrian",1,3,5,6,8,10,12],
  }

  // If no scale type is specified, return a random scale map
  if (index === undefined) { index = getRandomInt(values.length) }

  let key = values[index];

  let map = scalesDictionary[key];
  // console.log('map: ', map)
  return map;
  // return scalesDictionary[key];
}

/** Play a scale or arpeggio in ascending or descending order.
 * @param {Array<Note>} playing - A list of Note objects.
 * @param {number} delay - Time in milliseconds between each note. Default: 750 ms.
 * @param {boolean} ascending - Play the notes first to last or last to first?
 * @param {boolean} sustain - If (false): silence each note before playing the next one.
 */
export function playNotes(playing, delay=750, ascending=true, sustain=true) {
  stopAll(); // Stop all other music before playing the scale.

  if (ascending) {
    playing[0].play(delay, sustain).then( () => {
      // if (!sustain) {setTimeout(() => {playing[0].stop()}, delay);} // not necessary
      playSoundRecursiveAscending(playing, 1, delay, sustain);
    } );
  }
  else {
    let i = playing.length-1;
    playing[i].play(delay, sustain).then( () => {
      // if (!sustain) {setTimeout(() => {playing[playing.length-1].stop()}, delay);}
      playSoundRecursiveDescending(playing, --i, delay, sustain);
    } );
  }
}

/** Play a list of notes in order with a delay between each note. This should never be used directly, only by playNotes().
 * @private Only playNotes() should call this function.
 * @param {Array<Note>} playing - A list of Note objects.
 * @param {number} i - Index to tell function to play playing[i]
 * @param {number} delay - Time in milliseconds to play between chords
 * @param {boolean} sustain - If (false): silence each note before playing the next one.
 */
function playSoundRecursiveAscending(playing, i, delay=750, sustain) {

  if (playing[i] === undefined) { return; } // no more notes to play
  
  setTimeout( () =>
    {
      if (!sustain) stopAll();
      // if (!sustain) playing[i-1].pause();
      playing[i].play(delay, sustain)
        .then(() => {
          playSoundRecursiveAscending(playing, ++i, delay, sustain);
        })
        .catch(() => {console.log('interrupted')})
    }, delay
  )
}

/** Play a list of notes in reverse order with a delay between each note. This should never be used directly, only by playNotes().
 * @private Only playNotes() should call this function.
 * @param {Array<Note>} playing - A list of Note objects.
 * @param {number} i - Index to tell function to play playing[i]
 * @param {number} delay - Time in milliseconds to play between chords
 * @param {boolean} sustain - If (false): silence each note before playing the next one.
 */
function playSoundRecursiveDescending(playing, i, delay=750, sustain) {

  if (i < 0) { return; } // no more notes to play

  setTimeout( () =>
    {
      if (!sustain) stopAll();
      playing[i].play(delay, sustain)
        .then(() => {
          playSoundRecursiveDescending(playing, --i, delay, sustain);
        })
        .catch(() => {console.log('interrupted')})
    }, delay
  )
}

/** Play the chord decided by a root note and chord map.
 * @param {Note} rootNote - A Note object to specify the root to build the chord on.
 * @param {Array<string|number>} chordMap - An array from chords[] where chordMap[0] is the chord's name and the rest of the list describes the semitones to build the chord.
 * @param {boolean} arpeggiate - Whether to play this chord as a block chord or arpeggio.
 * @param {boolean} ascending - When (boolean == true), whether to play the arpeggio in ascending or descending order.
 * @returns A Promise that resolves when the last note begins playing.
 */
 export function playChord(rootNote, chordMap, arpeggiate=false, ascending=true, delay=1020) {

  // Make sure we have a chord to play.
  if (rootNote == undefined) {
    rootNote = new Note();
    chordMap = getRandomChordMap(); // If rootNote is undefined, chordMap would be too.
  }
  
  // Store the chord in case we want to replay it. // Todo: edit repeat() and repeatMap so first argument is name of the function to replay
  repeatMap = [rootNote, chordMap, arpeggiate, ascending];

  let playing = [rootNote];
  for (let i = 1; i < chordMap.length; i++) { // Start at 1 because chordMap[0] is the chord's name.
    let nextNote = rootNote.nextNote(chordMap[i]);
    playing.push(nextNote);
  }
  /** just for printing 
  // let display = [];
  // playing.forEach(note => {display.push(note.name)});
  // console.log(`Playing ${display} ${chordMap[0]}`);
  */

  // Stop any music that might already be playing.
  stopAll();
  
  // Play the chord.
  if (arpeggiate) {
    playNotes(playing, delay, ascending, false);
  }
  else {
    // return Note.quickPlay(playing, 3000);
    return Note.playChord(playing);
  }
}

// Todo: edit this so it works with scales and chord progressions.
function repeat() {
  playChord(...repeatMap);
}

function getRandomKey(obj) {
  let keys = Object.keys(obj);
  let i = getRandomInt(keys.length);
  return keys[i];
};

// Todo: add doc string
// Todo: Also, do this and playRandomChord really need to be different functions?
function playRandomInterval(arpeggiate=false, ascending=true) {
  let rootNote = new Note();
  let chordMap = getIntervalMap();
  playChord(rootNote, chordMap, arpeggiate, ascending);
  return chordMap[0]; // Return the interval's name
}

/** Wrapper function for playChord() to make playing intervals more intuitive.
 * @param {Note} rootNote - Note to build the interval on.
 * @param {string} intervalMap - Array of [name, semitones]. Should be produced by getIntervalMap()
 * @param {boolean} arpeggiate - Whether to play as chord or arpeggio.
 * @param {boolean} ascending - If (arpeggiate): whether to play arpeggio ascending or descending.
 * @returns {string} The name of the interval.
 */
export function playInterval(rootNote, intervalMap, arpeggiate=false, ascending=true, delay=1110) {
  if (rootNote === undefined) {console.error(`In playInterval(): rootNote is undefined`); return;}
  if (intervalMap === undefined) {console.error(`In playInterval(): intervalMap is undefined`); return;}

  // playChord(rootNote, intervalMap, arpeggiate, ascending, 1110);
  // let nextNote = rootNote.nextNote(intervalMap[1])
  // rootNote.play(1110, false).then( () => {
  //   setTimeout( () => {
  //     nextNote.play(2700, false);
  //   }, delay)}).catch(() => {console.error(`playInterval() failed`)});
  // return intervalMap[0]; // Return the interval's name

  // Todo: rewrite doc string.
  rootNote.nextNote(intervalMap[1])
    .then( (secondNote) => {
      // rootNote.play(1110, false).then( () => { // Todo: .play() doesn't return a promise anymore!!!!
      let duration = 1;
      rootNote.play(duration);
      secondNote.play(2, duration);
    })
  return intervalMap[0]; // Return the interval's name
}

function getChordMapFromSymbol(chordSymbol) {

  let chordMapsDictionary = {
    // 'M/5': ['major first inversion',5,9], // major first inversion (fifth as root)
    // 'M/3': ['major second inversion',3,8], // major second inversion (3rd as root)
    'M': ['major',4,7], // major
    'm': ['minor',3,7], // minor
    'dim': ['diminished',3,6], // diminished triad
    'aug': ['augmented',4,8], // augmented triad
    'sus4': ['suspended 4th triad',5,7], // suspended 4th triad
    'sus2': ['suspended 2nd triad',2,7], // suspended 2nd triad
    '7': ['dominant 7th',4,7,10], // dominant 7th chord
    'm7': ['minor 7th',3,7,10], // minor 7th (minor triad with dominant 7th)
    'maj7' : ['major 7th',4,7,11], // major 7th chord
    'mM7': ['minor triad with major 7th',3,7,11], // minor triad with major 7th
    'dim7': ['diminished 7th',3,6,9], // diminished triad with diminished 7th (same as major 6th) -> stack of minor thirds
    'm7(b5)': ['half diminished 7th',3,6,10] // half diminished 7th aka diminished triad with a dominant 7th
  }

  if (chordSymbol == undefined) chordSymbol = getRandomKey(chordMapsDictionary);
  // console.log(`Chord symbol: ${chordSymbol}`);
  
  return chordMapsDictionary[chordSymbol];
}

function playRandomChord(arpeggiate=false, ascending=true) {
  let rootNote = new Note();
  let chordMap = getChordMapFromSymbol();
  playChord(rootNote, chordMap, arpeggiate, ascending);
}

/** Play a chord by describing it with a symbol ('M') instead of a mapping (['major',4,7]).
 * @param {Note} rootNote - Note object
 * @param {string} chordSymbol - String to decide the chord's quality e.g. 'M' for major or 'm' for minor.
 * @returns {Promise} The Promise from playChord().
 */
function playChordFromSymbol(rootNote, chordSymbol) {
  let chordMap = getChordMapFromSymbol(chordSymbol);
  return playChord(rootNote, chordMap);
}

// if ( DEMO ) {var displayChordSymbols;}

/** Function to return a chord progression with a specific number of random chords.
 * @param {Array<string>} chordProgressionAsSymbols - List of strings where each string is a functional chord symbol e.g. 'IV' for the 4 chord.
 * @returns {Array<Array<number,string>>} newProgMap - A array of 2-tuples (number, string) to describe the chord's place in the chord progression and its quality.
 * Each number represents how many semitones up that chord's root is from the root note of the scale.
 * Each string represents a symbol to describe that chord's quality. It should only be used with getChordMapFromSymbol().
 */
function getChordProgessionMap(chordProgressionAsSymbols=['I', 'III', 'V']) {

  const chordNames = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VII', 'III']; // uppercase = major, lowercase = minor
  const chordNameMeaning = { 
    'I': [0, 'M'],
    'ii': [2, 'm'], // "meaning" refers to the chord's relationship to the root and the chord quality
    'iii': [4, 'm'], // for example, iii -> 4 semitones up from the root and it's a minor chord
    'IV': [5, 'M'],
    'V': [7, 'M'],
    'vi': [9, 'm'],
    'VII': [11, 'M'],
    'III': [4, 'M'],
  }

  // If chordProgressionAsSymbols doesn't exist, get random chord symbols to make a chord progression.
  if (chordProgressionAsSymbols === undefined || chordProgressionAsSymbols.length === 0) {
    chordProgressionAsSymbols = [];
    for (let i = 0; i < 3; i++) { // 3 is default length of the random chord progression
      let symbol = chordNames[getRandomInt(chordNames.length)];
      chordProgressionAsSymbols.push(symbol);
    }
  }
  
  // Make the chord progresion.
  let newProgMap = [];
  chordProgressionAsSymbols.forEach(symbol => {
    let map = chordNameMeaning[symbol]; 
    if (map === undefined) {
      console.error('Invalid chord symbol')
      return;
    }
    newProgMap.push(map);
  });

  return newProgMap;
}

/** Play a chord progression given it's root note and a list of chords.
 * @param {Note} rootNote - Root note to base the progression on.
 * @param {Array<Array<number,string>>} chordProgMap - An array of arrays describing chords. Should always be generated by getChordProgessionMap();
 * @returns {void} void
 */
 export function playChordProgression(rootNote, chordProgressionAsSymbols, delay=1100) {

  // if (rootNote instanceof Note) {console.log('playChordProgression(): rootNote is a Note')} // todo: delete this
  
  // Get random root note if one isn't supplied.
  if (rootNote == undefined || !(rootNote instanceof Note)) {console.error(`rootNote is undefined`);rootNote = new Note();}
  
  // Get random chord progression if one isn't supplied.
  let chordProgMap = getChordProgessionMap(chordProgressionAsSymbols);
  if (chordProgMap == undefined) chordProgMap = getChordProgessionMap();

  // Describe and display the chord progression during the demo.
  if ( DEMO ) { console.log(`${chordProgressionAsSymbols} on ${rootNote.name}`) }

  // Generate the set of chords to play based on the progression and root note.
  let newChordProgression = []; // This is a list of chords where each chord ->[Note, symbol].
  chordProgMap.forEach(chordSymbolMap => {
    let nextNote = rootNote.nextNote(chordSymbolMap[0]);
    newChordProgression.push([nextNote, chordSymbolMap[1]]); // Add the finished chord (root note, chord symbol) to the chord progression
  });

  // Play the new chord progression.
  playChordProgressionWrapper(newChordProgression, delay=1100);
}

/** Recursive function to play a chord progression.
 * @private This should only be called by playChordProgressionWrapper().
 * @param {Array<Note, string>} chordProgMap - A list of arrays where each child array describes a chord e.g. [Note object, 'M'] (major chord on this note);
 * @param {number} i - Index of the chord in chordProgMap to play.
 * @returns void
 */
 function playChordProgressionRecursive(chordProgMap, i, delay) {

  if (chordProgMap[i] === undefined) { return; } // no more chords to play
  
  setTimeout( () =>
    {playChordFromSymbol(chordProgMap[i][0], chordProgMap[i][1]).then(() => { 
      playChordProgressionRecursive(chordProgMap, ++i, delay);
    }).catch(() => {console.log('interrupted')})},
    delay //1100 // delay between chords
  )
}

/** Wrapper function for playChordProgressionRecursive().
 * @private This should only be called by playChordProgression().
 * @param {Array<Note, string>} chordProgMap - A list of arrays where each child array describes a chord e.g. [Note object, 'M'] (major chord on this note);
 * @returns void
 */
function playChordProgressionWrapper(chordProgMap, delay=1100) {
  if (chordProgMap === undefined || chordProgMap[0] === undefined) { return; } // guard condition

  playChordFromSymbol(chordProgMap[0][0], chordProgMap[0][1]).then(() => { 
    playChordProgressionRecursive(chordProgMap, 1, delay);
  }).catch(() => {console.log('interrupted')})
}

/** Return a scale given a starting root note and scale type.
 * @param {Note} rootNote - Note object
//  * @param {string} scaleType - string describing the scale type
* @param {Array<string, number>} scaleMap - A map describing the chords name and structure. Should only be generated by getScaleMap().
 * @returns {Array<Note>} List of Note objects to form a scale.
 */
 function makeScale(rootNote, scaleMap) {
  // let scaleMap = getScaleMap(scaleType);
  // console.log(`makeScale(): scaleMap = ${scaleMap}`)

  let scale = [rootNote];
  // scaleMap.forEach(note => {
  //   // let index = rootNote.letterIndex + note;
  //   // let newNote = new Note(notes[index%12] + (rootNote.octave + (index<12 ? 0 : 1)));
  //   // scale.push(newNote);

  //   let nextNote = rootNote.nextNote(note);
  //   scale.push(nextNote);
  // });

  for (let i = 1; i < scaleMap.length; i++) { // Start at 1 because scaleMap[0] is the name.
    let nextNote = rootNote.nextNote(scaleMap[i]);
    scale.push(nextNote);
  }

  return scale;
}

// Old playScale() function. Not useful anymore.
// /** Play a scale given a root note and scale type.
//  * @param {Note} rootNote - Root of the scale.
//  * @param {string} scaleType - Select either ['major', 'minor']
//  * @param {boolean} ascending - Play the scale ascending or descending.
//  */
// function playScale(rootNote, scaleType, ascending=true) {
//   let scale = makeScale(rootNote, scaleType);
//   let display = [];
//   scale.forEach(note => {
//     display.push(note.name);
//   });
//   console.log(`Playing ${scaleType} scale on ${rootNote.name} -> ${display}`);
//   playNotes(scale, 200, ascending);
// }

/** Wrapper function for playNotes() to make playing a scale more intuitive.
 * @param {Note} rootNote - Note to build the scale on.
 * @param {number} scaleType - An index to select from [
    "Major (Ionian)",
    "Natural Minor (Aeolian)",
    "Harmonic Minor",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
  ]. Must match values in getScaleMap().
 * @param {boolean} ascending - Play the scale in ascending or descending order.
 * @returns {string} A string describing the scale type.
 */
 export function playScale(rootNote, scaleType, ascending=true) {
  let scaleMap = getScaleMap(scaleType);
  if (scaleMap == undefined) {console.error(`invalid scale type: ${scaleType}`); return;} // guard condition
  let scale = makeScale(rootNote, scaleMap);

  if ( DEMO ) {
    // let display = scale.map((note) => (note.name))
    let display = []; // Used to console.log the scale.
    scale.forEach(note => {
      display.push(note.name);
    });
    console.log(`Playing ${scaleMap[0]} scale on ${rootNote.name} -> ${display}`);
  }
  playNotes(scale, 1020, ascending, false); // Set delay between notes here.
  return scaleMap[0];
  // return scaleType;
}