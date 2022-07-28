import { Sounds } from "./piano-wav/exportSounds";

const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
// const pathToFolder = "./piano-wav/"; // Where all samples are stored. Lowest note available: C1. Highest note available: C8.
let audioObjects = []; // Global list to keep track of all sounds currently playing
let repeatMap; // Global variable to remember most recently played.

/** Class representing a note 
 * Separating letter and octave makes for easier and more efficient function calls.
 * @typedef {Object} Note
 * @property {string} name - the full name in scientific pitch notation
 * @property {string} letter - Just the letter part of `name`.
 * @property {number} octave - Just the number part of `name`.
*/
class Note {

  static min = 2;
  static max = 4;

  /** Create a Note object from a note name. 
   * If one isn't given, a random note is generated.
   * The available range of notes you can create is C1 to C8 inclusive.
   * @param {string} noteName - Note name in scientfic pitch notation e.g. "Cs4".
   */
  constructor(noteName) {
    if (noteName === undefined) {
      this.letterIndex = getRandomInt(12); // 12 notes in western scale
      this.octave = Note.#getRandomOctave(Note.min, Note.max);
      this.letter = notes[this.letterIndex];
      this.name = this.letter + this.octave;
    }
    else {
      this.name = noteName;
      this.letter = noteName.slice(0,-1);
      this.octave = parseInt(noteName[noteName.length-1]);
      this.letterIndex = notes.indexOf(this.letter);
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
    let newAudioElement = new Audio(Sounds[this.name]);
    console.log(`play(${this.name}): newAudioElement: ${newAudioElement}`);
    audioObjects.push(newAudioElement);
    let p = newAudioElement.play() // returning a Promise
      // .then( () => {
      //   console.log(`play(${this.name}): nice!`);
      // })
      // .catch( (err) => {
      //   console.error(`play(${this.name}): uh oh \n`, err);
      // });
    return p;
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

function getRandomIntervalMap() {
  
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
  
  let i = getRandomInt(intervals.length);

  return intervals[i];
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

/** Play a scale or arpeggio in ascending or descending order.
 * @param {Array<string>} playing - A list of note names each in scientfic pitch notation.
 * @param {number} delay - Time in milliseconds between each note.
 * @param {boolean} ascending - Play the notes first to last or last to first?
 */
function playNotes(playing, delay=750, ascending=true) {

  if (ascending) {
    playing[0].play().then( playSoundRecursiveAscending(playing, 1, delay) );
  }
  else {
    let i = playing.length-1;
    playing[i].play().then( playSoundRecursiveDescending(playing, --i, delay) );
  }
}

/** Play a list of notes in order with a delay between each note. This should never be used directly, only by playNotes().
 * @private Only playNotes() should call this function.
 * @param {Array<string>} playing - A list of note names to play e.g. ['C2','E2','G2'] 
 * @param {number} i - Index to tell function to play playing[i]
 * @param {number} delay - Time in milliseconds to play between chords
 */
function playSoundRecursiveAscending(playing, i, delay=750) {

  if (playing[i] === undefined) { return; } // no more notes to play
  
  setTimeout( () =>
    {playing[i].play().then(() => { 
      playSoundRecursiveAscending(playing, ++i, delay);
    }).catch(() => {console.log('interrupted')})},
    delay
  )
}

/** Play a list of notes in reverse order with a delay between each note. This should never be used directly, only by playNotes().
 * @private Only playNotes() should call this function.
 * @param {Array<string>} playing - A list of note names to play e.g. ['C2','E2','G2'] 
 * @param {number} i - Index to tell function to play playing[i]
 * @param {number} delay - Time in milliseconds to play between chords
 */
function playSoundRecursiveDescending(playing, i, delay=750) {

  if (i < 0) { return; } // no more notes to play

  setTimeout( () =>
    {playing[i].play().then(() => {
      playSoundRecursiveDescending(playing, --i, delay);
    }).catch(() => {console.log('interrupted')})},
    delay
  )
}

/** Play the chord decided by a root note and chord map.
 * @param {Note} rootNote - A Note object to specify the root to build the chord on.
 * @param {Array<string|number>} chordMap - An array from chords[] where chordMap[0] is the chord's name and the rest of the list describes the semitones to build the chord.
 * @param {boolean} arpeggiate - Whether to play this chord as a block chord or arpeggio.
 * @param {boolean} ascending - When (boolean == true), whether to play the arpeggio in ascending or descending order.
 * @returns A Promise that resolves when the last note begins playing.
 */
 function playChord(rootNote, chordMap, arpeggiate=false, ascending=true) {

  // Make sure we have a chord to play.
  if (rootNote == undefined) {
    rootNote = new Note();
    chordMap = getRandomChordMap(); // If rootNote is undefined, chordMap would be too.
  }
  
  // Store the chord in case we want to replay it. // Todo: edit repeat() and repeatMap so first argument is name of the function to replay
  repeatMap = [rootNote, chordMap, arpeggiate, ascending];

  let playing = [rootNote];
  for (let i = 1; i < chordMap.length; i++) { // Start at 1 because chordMap[0] is the chord's name.
    let nextIndex = rootNote.letterIndex + chordMap[i];
    let note = notes[nextIndex%12] + (rootNote.octave + (nextIndex < 12 ? 0 : 1)).toString();
    playing.push(new Note(note));
  }
  let display = [];
  playing.forEach(note => {display.push(note.name)});
  console.log(`Playing ${display} ${chordMap[0]}`);
  
  // Stop any music that might already be playing.
  stopAll();
  
  // Play the chord.
  if (arpeggiate) {
    // console.log("got here")
    playNotes(playing, 750, ascending);
  }
  else {
    let p;
    playing.forEach(note => {
      p = note.play();
    });
    return p;
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
export function playRandomInterval(arpeggiate=false, ascending=true) {
  let rootNote = new Note();
  let chordMap = getRandomIntervalMap();
  playChord(rootNote, chordMap, arpeggiate, ascending);
  return chordMap[0]; // Return the interval's name
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

let displayChordSymbols;

/** Function to return a chord progression with a specific number of random chords.
 * @param {Array<string>} chordProgressionAsSymbols - List of strings where each string is a functional chord symbol e.g. 'IV' for the 4 chord.
 * @returns {Array<Array<number,string>>} newProgMap - A array of 2-tuples (number, string) to describe the chord's place in the chord progression and its quality.
 * Each number represents how many semitones up that chord's root is from the root note of the scale.
 * Each string represents a symbol to describe that chord's quality. It should only be used with getChordMapFromSymbol().
 */
 function getChordProgessionMap(chordProgressionAsSymbols) {

  const chordNames = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VII']; // uppercase = major, lowercase = minor
  const chordNameMeaning = { 
    'I': [0, 'M'],
    'ii': [2, 'm'], // "meaning" refers to the chord's relationship to the root and the chord quality
    'iii': [3, 'm'], // for example, iii -> 3 semitones up from the root and it's a minor chord
    'IV': [5, 'M'],
    'V': [7, 'M'],
    'vi': [9, 'm'],
    'VII': [11, 'M'],
  }

  // If chordProgressionAsSymbols doesn't exist, get random chord symbols to make a chord progression.
  if (chordProgressionAsSymbols === undefined || chordProgressionAsSymbols.length === 0) {
    chordProgressionAsSymbols = [];
    for (let i = 0; i < 3; i++) { // 3 is default length of chord progression
      let symbol = chordNames[getRandomInt(chordNames.length)];
      chordProgressionAsSymbols.push(symbol);
    }
  }
  
  // Make the chord progresion.
  let newProgMap = [];
  displayChordSymbols = [];
  chordProgressionAsSymbols.forEach(symbol => {
    displayChordSymbols.push(symbol);
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
 * @param {Array<Array<number,string>>} chordProgMap - An array of arrays describing chords. Should always be generated by getRandomChordProgessionMap();
 * @returns {void} void
 */
 function playChordProgression(rootNote, chordProgMap) {
  
  // Get random root note if one isn't supplied.
  if (rootNote == undefined) rootNote = new Note();
  
  // Get random chord progression if one isn't supplied.
  if (chordProgMap == undefined) chordProgMap = getChordProgessionMap();

  console.log(`${displayChordSymbols} on ${rootNote.name}`)

  // Generate the set of chords to play based on the progression and root note.
  let newChordProgression = [];
  chordProgMap.forEach(chordSymbolMap => {
    let nextNoteIndex = rootNote.letterIndex + chordSymbolMap[0]; // Calculate the next chord's root note letter name and get its index in `notes`
    let nextNote = new Note( (nextNoteIndex < 12)
      ? notes[nextNoteIndex] + rootNote.octave
      : notes[nextNoteIndex % 12] + (rootNote.octave + 1)
    )
    newChordProgression.push([nextNote, chordSymbolMap[1]]); // Add the finished chord (root note, chord map) to the chord progression
  });

  // Play the new chord progression.
  playChordProgressionWrapper(newChordProgression);
}

/** Recursive function to play a chord progression.
 * @private This should only be called by playChordProgressionWrapper().
 * @param {Array<string[]>} chordProgMap - List of arrays where each child array describes a chord e.g. ['C3','E3','G3'].
 * @param {number} i - Index of the chord in chordProgMap to play.
 * @returns void
 */
 function playChordProgressionRecursive(chordProgMap, i) {

  if (chordProgMap[i] === undefined) { return; } // no more chords to play
  
  setTimeout( () =>
    {playChordFromSymbol(chordProgMap[i][0], chordProgMap[i][1]).then(() => { 
      playChordProgressionRecursive(chordProgMap, ++i);
    }).catch(() => {console.log('interrupted')})},
    1100 // delay between chords
  )
}

/** Wrapper function for playChordProgressionRecursive().
 * @private This should only be called by playRandomChordProgression().
 * @param {Array<string[]>} chordProgMap - List of arrays where each child array describes a chord e.g. ['C3','E3','G3'].
 * @returns void
 */
function playChordProgressionWrapper(chordProgMap) {
  if (chordProgMap === undefined || chordProgMap[0] === undefined) { return; } // guard condition

  playChordFromSymbol(chordProgMap[0][0], chordProgMap[0][1]).then(() => { 
    playChordProgressionRecursive(chordProgMap, 1);
  }).catch(() => {console.log('interrupted')})
}

/** Return a scale given a starting root note and scale type
 * @param {Note} rootNote - Note object
 * @param {string} scaleType - string describing the scale type
 * return {Array<Note>} List of Notes.
 */
 function makeScale(rootNote, scaleType) {
  const scales = {
    'major' : [0,2,4,5,7,9,11,12],
    'minor' : [0,2,3,5,7,8,10,12],
  }

  let scaleMap = scales[scaleType]
  if (scaleMap == undefined) {console.error(`invalid scale type: ${scaleType}`); return;}

  let scale = []
  scaleMap.forEach(note => {
    let index = rootNote.letterIndex + note;
    let newNote = new Note(notes[index%12] + (rootNote.octave + (index<12 ? 0 : 1)));
    scale.push(newNote);
  });

  return scale;
}

/** Play a scale given a root note and scale type.
 * @param {Note} rootNote - Root of the scale.
 * @param {string} scaleType - Select either ['major', 'minor']
 * @param {boolean} ascending - Play the scale ascending or descending.
 */
function playScale(rootNote, scaleType, ascending=true) {
  let scale = makeScale(rootNote, scaleType);
  let display = [];
  scale.forEach(note => {
    display.push(note.name);
  });
  console.log(`Playing ${scaleType} scale on ${rootNote.name} -> ${display}`);
  playNotes(scale, 200, ascending);
}