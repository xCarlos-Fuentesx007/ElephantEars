import { Sounds } from "./piano-wav/exportSounds";
import Silent from "./piano-wav/silent.wav"; // Used in Note.quickPlay() hack.
import { DEMO } from "../../pages/Exercise";

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

  static min = 2;
  static max = 4;
  static notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
  static Silence = new Audio(Silent); // Used in Note.quickPlay() hack.

  /** Create a Note object from a note name. 
   * If one isn't given, a random note is generated.
   * The available range of notes you can create is C1 to C8 inclusive.
   * @param {string} noteName - Note name in scientfic pitch notation e.g. "Cs4".
   */
  constructor(noteName) {
    if (noteName === undefined) {
      this.letterIndex = getRandomInt(12); // 12 notes in western scale
      this.octave = Note.#getRandomOctave(Note.min, Note.max);
      this.letter = Note.notes[this.letterIndex];
      this.name = this.letter + this.octave;
      this.audioElement = new Audio(Sounds[this.name]);
    }
    else {
      this.name = noteName;
      this.letter = noteName.slice(0,-1);
      this.octave = parseInt(noteName[noteName.length-1]);
      this.letterIndex = Note.notes.indexOf(this.letter);
      this.audioElement = new Audio(Sounds[noteName]);
    }
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

  /** Play the note.
   * @returns {Promise} A Promise which is resolved when playback has been started, or is rejected if for any reason playback cannot be started.
   */
  play() {
    audioObjects.push(this.audioElement);
    let p = this.audioElement.play() // returning a Promise
      // .then( () => {
      //   console.log(`play(${this.name}): nice!`);
      // })
      // .catch( (err) => {
      //   console.error(`play(${this.name}): uh oh \n`, err);
      // });
    return p;
  }

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
  static quickPlay(listOfNoteObjects) {
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
    return chord[lastIndex].play(); 
  }

  /** Silence the note. */
  stop() {
    this.audioElement.pause();
  }

  /** Get the note a certain number of semitones away from the current note.
   * @param {number} semitones
   * @returns {Note} A new Note object.
   */
  nextNote(semitones) {
    let nextIndex = this.letterIndex + semitones;
    let noteName = Note.notes[nextIndex%12] + (this.octave + (nextIndex < 12 ? 0 : 1)).toString();
    return new Note(noteName);
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
 * This works by iterating through the global audioObjects list.
 */
function stopAll() {

  while (audioObjects.length > 0) {
    audioObjects.pop().pause();
  }
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
    "Phygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
  ];
  
  const scalesDictionary = {
    "Major (Ionian)" : ["Major (Ionian)",2,4,5,7,9,11,12],
    "Natural Minor (Aeolian)" : ["Natural Minor (Aeolian)",2,3,5,7,8,10,12],
    "Harmonic Minor" : ["Harmonic Minor",2,3,5,7,8,11,12],
    "Dorian" : ["Dorian",2,3,5,7,9,10,12],
    "Phygian" : ["Phygian",1,3,5,7,9,10,12],
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
 * @param {number} delay - Time in milliseconds between each note.
 * @param {boolean} ascending - Play the notes first to last or last to first?
 * @param {boolean} sustain - If (false): silence each note before playing the next one.
 */
function playNotes(playing, delay=750, ascending=true, sustain=true) {
  stopAll(); // Stop all other music before playing the scale.

  if (ascending) {
    playing[0].play().then( () => {
      if (!sustain) {setTimeout(() => {playing[0].stop()}, delay);}
      playSoundRecursiveAscending(playing, 1, delay, sustain);
    } );
  }
  else {
    let i = playing.length-1;
    playing[i].play().then( () => {
      if (!sustain) {setTimeout(() => {playing[playing.length-1].stop()}, delay);}
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
      playing[i].play()
        .then(() => {
          playSoundRecursiveAscending(playing, ++i, delay);
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
      playing[i].play()
        .then(() => {
          playSoundRecursiveDescending(playing, --i, delay);
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
 export function playChord(rootNote, chordMap, arpeggiate=false, ascending=true) {

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
    playNotes(playing, 750, ascending);
  }
  else {
    return Note.quickPlay(playing);
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
export function playInterval(rootNote, intervalMap, arpeggiate=false, ascending=true) {
  if (rootNote === undefined) {console.error(`In playInterval(): rootNote is undefined`); return;}
  if (intervalMap === undefined) {console.error(`In playInterval(): intervalMap is undefined`); return;}

  playChord(rootNote, intervalMap, arpeggiate, ascending);
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
  if ( DEMO ) {
    // let displayChordSymbols = [];
    // chordProgressionAsSymbols.forEach(symbol => {
    //   displayChordSymbols.push(symbol);
    // });
    // console.log(`${displayChordSymbols} on ${rootNote.name}`)
    console.log(`${chordProgressionAsSymbols} on ${rootNote.name}`)
  }

  // Generate the set of chords to play based on the progression and root note.
  let newChordProgression = [];
  chordProgMap.forEach(chordSymbolMap => {
    // let nextNoteIndex = rootNote.letterIndex + chordSymbolMap[0]; // Calculate the next chord's root note letter name and get its index in `notes`
    // let nextNote = new Note( (nextNoteIndex < 12)
    //   ? notes[nextNoteIndex] + rootNote.octave
    //   : notes[nextNoteIndex % 12] + (rootNote.octave + 1)
    // )
    let nextNote = rootNote.nextNote(chordSymbolMap[0]);
    newChordProgression.push([nextNote, chordSymbolMap[1]]); // Add the finished chord (root note, chord map) to the chord progression
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
    "Phygian",
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
  playNotes(scale, 500, ascending, false); // Set delay between notes here.
  return scaleMap[0];
  // return scaleType;
}