// var x = document.getElementById("myAudio"); 

// function playAudio() { 
//   x.play(); 
// } 

// function pauseAudio() { 
//   x.pause(); 
// } 

// function play() {
//   var audio = document.getElementById("audio");
//   audio.play();
// }

// function playLocal(noteName) {
//   var audio = document.getElementById(noteName);
//   let p = audio.play();
//   p.then(() => {
//     console.log("Played");
//   }).catch(() => {
//     console.log("Not played");
//   });
// }

const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];
const pathToFolder = "./piano-wav/"; // Where all samples are stored. Lowest note available: C1. Highest note available: C8.
let audioObjects = []; // Global list to keep track of all sounds currently playing

/** Class representing a note 
 * Separating letter and octave makes for easier and efficient function calls.
 * @typedef Note
 * @property {string} name - the full name in scientific pitch notation
 * @property {string} letter - Just the letter part of `name`.
 * @property {number} octave - Just the number part of `name`.
*/
class Note {

  /** Create Note object from note's name.
   * @param {string} noteName - string form of a note e.g. 'Cs4'
   */
  constructor(noteName) {
    if (noteName === undefined) { // if no noteName is specified, generate a random one
      let noteArray = getRandomRootArray();
      this.name = noteArray[0];
      this.letter = noteArray[1];
      this.octave = noteArray[2];
    }
    else {
      this.name = noteName;
      this.letter = noteName.slice(0,-1);
      this.octave = parseInt(noteName[noteName.length-1]);
    }
  }

  changeNote(noteName) {
    this.name = noteName;
    this.letter = noteName.slice(0,-1);
    this.octave = parseInt(noteName[noteName.length-1]);
  }

  /** Play the note.
   * @returns {Promise} A Promise which is resolved when playback has been started, or is rejected if for any reason playback cannot be started.
   */
  play() {
    console.log(this.name)
    let path = pathToFolder + this.name + ".wav";
    let audio = new Audio(path);
    let p = audio.play(); 
    audioObjects.push(audio);
    return p;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// new playSound
function playSound(noteName) {
  if (noteName === undefined) return;
  let note = new Note(noteName);
  return note.play();
}

// old playSound
// function playSound(noteName) {
//   if (noteName === undefined) return;
//   let pathToFolder = "./piano-wav/"; // Lowest note available: C1. Highest note available: C8.
//   let path = pathToFolder + noteName + ".wav";
//   let audio = new Audio(path);
//   let p = audio.play(); 
//   audioObjects.push(audio);
//   return p;
// }

/** Pause and delete all Notes currently playing.
 * This works by iterating through the global audioObjects list.
 */
function stopAll() {

  while (audioObjects.length > 0) {
    // let a = audioObjects.pop();
    // console.log(`pausing ${a}`);
    // a.pause();
    audioObjects.pop().pause();
  }
}

// Todo: Convert html to this?
document.getElementById('stopButton').addEventListener('click', () => {
  // document.querySelectorAll('audio').forEach(el => el.stop());
  stopAll();
});

// Todo: delete this function. It's no longer necessary.
function playRandomNote() {
  let notes = ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'];
  var noteLetter = getRandomInt(12);
  var noteNumber = getRandomInt(7) + 1;
  var noteName = notes[noteLetter] + noteNumber.toString();
  console.log(`Playing ${noteName}`);
  playSound(noteName);
}

// Todo: delete this function. It's no longer necessary.
function getRandomRoot() {
  // let noteLetterIndex = getRandomInt(12);
  let majorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  let noteLetterIndex = getRandomInt(8);
  let noteOctave = getRandomInt(5) + 1; // min: 2, max: 6
  let rootNoteName = majorScale[noteLetterIndex] + noteOctave.toString();
  // let rootNoteName = notes[noteLetterIndex] + noteOctave.toString();
  // return [rootNoteName, majorScale[noteLetterIndex], noteOctave];
  return rootNoteName;
}

/** Select a random root note and return it as an array so the octave and letter portion can be used independently.
 * @param {number} min - Lowest octave bound (must be an integer)
 * @param {number} max - Highest octave bound (must be an integer)
 * @returns An array describing the root note with the format: [{string} full combined name, {string} just the letter, {number} just the octave].
 * For example, 'Cs6' would be described as ['Cs6', 'Cs', 6].
 */
function getRandomRootArray(min=2, max=7) {
  let noteLetterIndex = getRandomInt(12); // 12 notes in western scale
  let noteOctave = getRandomInt(max-min) + min; // min: 2, max: 7
  let rootNoteName = notes[noteLetterIndex] + noteOctave.toString();
  // console.log(rootNoteName, notes[noteLetterIndex], noteOctave)
  return [rootNoteName, notes[noteLetterIndex], noteOctave];
}

function getRandomIntervalMap() {
  
  const intervals = [
    ['minor second',1],
    ['major second', 2],
    ['minor third', 3],
    ['major third', 4],
    ['perfect fourth', 5],
    ['tritone', 6],
    ['perfect fifth', 7],
    ['minor sixth', 8],
    ['major sixth', 9],
    ['minor seventh', 10],
    ['major seventh', 11],
    ['octave', 12]
  ]
  
  let i = getRandomInt(intervals.length);

  return intervals[i];
}

// Todo: delete this function. It's no longer necessary.
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

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
    playSound(playing[0]).then( playSoundRecursiveAscending(playing, 1, delay) );
    console.log('delay', delay)
  }
  else {
    let i = playing.length-1;
    playSound(playing[i]).then( playSoundRecursiveDescending(playing, --i, delay) );
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
    {playSound(playing[i]).then(() => { 
      playSoundRecursiveAscending(playing, ++i, delay);     console.log('delay', delay)
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
    {playSound(playing[i]).then(() => {
      playSoundRecursiveDescending(playing, --i, delay);
    }).catch(() => {console.log('interrupted')})},
    delay
  )
}

var repeatMap;

function playChord(rootNoteArray, chordMap, arpeggiate=false, ascending=true) {

  // let rootNote = getRandomRootArray();
  // let rootNoteName = rootNote[0]+rootNote[1];
  // let noteLetterIndex = notes.indexOf(rootNote[0]);
  // let rootNoteOctave = rootNote[1];
  // console.log(rootNoteName, rootNoteOctave);

  // Specify the root note and its properties.
  if (rootNoteArray == undefined || rootNoteArray.length < 3) {
    rootNoteArray = getRandomRootArray();
  }

  let rootNoteName, rootNoteLetter, rootNoteOctave;
  [rootNoteName, rootNoteLetter, rootNoteOctave] = rootNoteArray;
  // console.log(`Root note name: ${rootNoteName}`)
  let noteLetterIndex = notes.indexOf(rootNoteLetter);
  
  // Store the chord in case we want to replay it.
  repeatMap = [rootNoteArray, chordMap, arpeggiate, ascending];

  // Build the chord we're going to play.
  let playing = [rootNoteName];
  for (let i = 1; i < chordMap.length; i++) {
    let notesIndex = noteLetterIndex + chordMap[i];
    let note = (notesIndex > 11) ? notes[notesIndex%12] + (rootNoteOctave + 1).toString() : notes[notesIndex] + (rootNoteOctave).toString();
    playing.push(note);
  }
  console.log(`Playing ${playing} ${chordMap[0]}`);

  // Stop any music that might already be playing.
  stopAll();
  
  // Play the chord.
  if (arpeggiate) {
    playNotes(playing, 750, ascending);
  }
  else {
    let p;
    playing.forEach(note => {
      p = playSound(note);
    });
    return p;
  }
}

function repeat() {
  playChord(...repeatMap);
}

function getRandomKey(obj) {
  let keys = Object.keys(obj);
  let i = getRandomInt(keys.length);
  return keys[i];
};

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

  // Explanations from this video: https://www.youtube.com/watch?v=aMLdWrZqwLg
  // C, major
  // Cm or C-, minor
  // Cdim or C°, diminished triad
  // Caug or C+ or C(#5), augmented triad
  // Csus4, suspended 4th triad
  // Csus2, suspended 2nd triad
  // Csus, referring to Csus4
  // C7, dominant 7th chord
  // Cm7, minor triad with dominant 7th
  // Cmaj7 or C△7 or C△, major 7th chord (△ means major in jazz)
  // CmM7, minor triad with major 7th
  // Cdim7 or C°7, minor triad with diminished 7th (same as major 6th) -> stack of minor thirds
  // C⊘7 or Cm7(b5), half diminished 7th aka minor triad with flat 5 and dominant 7th

  // Upper Chord Extensions
  // Cadd9, C chord plus 9th scale degree
  // C9, "Stack up" to the 9th so include the 7th aka C7(add9)
  // C11, "stack up" to 11th aka [1,3,5,b7,9,11]
  // Cadd11, C triad plus add 11th scale degree
  // C13, stack up to 13th aka [1,3,5,b7,9,11,13] (but usually the third or fifth is omitted because this chord is so dense already)

  // omit (or sometimes 'no')
  // C7sus4 (omit5), normal C7sus4 but remove the fifth

  // Upper chord extension alterations (sharps and flats)
  // [1,3,5,b7,9,11,b13] isn't labeled E(b13) because this could be confused with Eb13. It's labeled E11(b13)
  // Cmaj9, stack Cmaj7 and add a 9th

  // Power chords
  // C5, [1,5] but usually [1,5,8]

  // 6th chord
  // C6, [1,3,5,6]
  // Cm6, [1,b3,5,6] you still add the 6th from the MAJOR scale even though this is a minor chord
  // Cm(b6) or Cm(add b6), [1,b3,5,b6]
  // C^{6}_{9} or C(add 6)(add 9), [1,3,5,6,9]

  // Altered chords -> not one specific chord but a family of possible altered chords
  // Calt -> C7 with either a flat or sharp 5. And/or we can add a flat/sharp 9. So:
    // [1,3,b5,b7]
    // [1,3,#5,b7]
    // [1,3,b5,b7,b9]
    // [1,3,#5,b7,#9]

  // Slash chords -> play left side as normal chord but play right side as lowest note
  // C/E, CEG or [3,5,8]
    // note: this is an inversion because C major chord already includes E
  // G/A, actually A11 chord but you're only playing [1,b7,9,13]
}

function playRandomChord(rootArr) {
  let chordMap = getChordMapFromSymbol();
  playChord(rootArr, chordMap);
}

function playChordFromSymbol(rootArr, chordSymbol) {
  let chordMap = getChordMapFromSymbol(chordSymbol);
  return playChord(rootArr, chordMap);
}

let chordProgressionAsSymbols = []; // Todo: ugly global variable just for demonstration purposes. Delete later.

// Todo: Swap out this function for a function that returns the specific chord progressions we want to teach
/** Function to return a chord progression with a specific number of random chords.
 * @param {number} length - Desired length of the chord progression
 * @returns {Array<Array<number,string>>} newProgMap - An {length}-array of 2-tuples (number, string) to describe the chord's place in the chord progression.
 * Each number represents how many semitones up that chord's root is from the root note of the scale.
 * Each string represents a symbol to describe that chord's quality. It should only be used with getChordMapFromSymbol().
 */
function getRandomChordProgessionMap(length=3) {

  let chordNames = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'VII']; // uppercase = major, lowercase = minor
  let chordNameMeaning = { 
    'I': [0, 'M'],
    'ii': [2, 'm'], // "meaning" refers to the chord's relationship to the root and the chord quality
    'iii': [3, 'm'], // for example, iii -> 3 semitones up from the root and it's a minor chord
    'IV': [5, 'M'],
    'V': [7, 'M'],
    'vi': [9, 'm'],
    'VII': [11, 'M'],
  }

  // Get random chord symbols to make a random chord progression
  let newProgMap = []
  chordProgressionAsSymbols = [];
  for (let i = 0; i < length; i++) {
    let symbol = chordNames[getRandomInt(chordNames.length)];
    chordProgressionAsSymbols.push(symbol);
    newProgMap.push(chordNameMeaning[symbol])
  }

  return newProgMap;
}

/** Play a chord progression given it's root note and a chord progression map.
 * @param {Array<string, string, number} rootArr - 3-tuple to describe the root note.
 * @param {Array<Array<number,string>>} chordProgMap - An array of arrays describing chords. Should always be generated by getRandomChordProgessionMap();
 * @returns {void} void
 */
function playRandomChordProgression(rootArr, chordProgMap) {
  
  // Get random root note if one isn't supplied.
  if (rootArr == undefined) rootArr = getRandomRootArray(2,6);
  
  // Get random chord progression if one isn't supplied.
  if (chordProgMap == undefined) chordProgMap = getRandomChordProgessionMap();

  // Todo: just for demonstrationg, delete later.
  console.log(`${chordProgressionAsSymbols} on ${rootArr[0]}`)

  // Generate the set of chords to play based on the progression and root note.
  let newChordProgression = [];
  chordProgMap.forEach(chordSymbolMap => {
    let nextNoteIndex = (notes.indexOf(rootArr[1]) + chordSymbolMap[0]); // Calculate the next root note letter name and get its index in `notes`
    let nextNoteArr = (nextNoteIndex < 12) 
      ? [notes[nextNoteIndex] + rootArr[2], notes[nextNoteIndex], rootArr[2]] 
      : [notes[nextNoteIndex % 12] + (rootArr[2] + 1), notes[nextNoteIndex % 12], rootArr[2] + 1]; // Get the new root's octave and create the root array
    // console.log('nextNoteArr', nextNoteArr)
    newChordProgression.push([nextNoteArr, chordSymbolMap[1]]); // Add the finished chord (root note, chord map) to the chord progression
  });

  // Play the new chord progression.
  playChordProgressionWrapper(newChordProgression);

  // Todo: How do you build a chord off a ii chord when all the chord logic assumes the first note is the root?

  // I IV V -> 0 5 7
  // ii V I -> 3 7 0

  // generate random root note and look for root chord by doing [].find('I'). 
  // use mod arithmetic go around notes array to get other notes
  // build specific chords on each based on chord symbol (use a big switch case in some buildChord(symbol) function)
}

/** Recursive function to play a chord progression. This should only be called by playChordProgressionWrapper().
 * @private
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

/** Wrapper function for playChordProgressionRecursive(). This should only be called by playRandomChordProgression().
 * @private
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
 */
function makeScale(rootNote, scaleType) {
  let scales = {
    'major' : [0,2,4,5,7,9,11,12],
    'minor' : [0,2,3,5,7,8,10,12],
  }

  let scaleMap = scales[scaleType]
  if (scaleMap == undefined) {console.error(`invalid scale type: ${scaleType}`); return;}
  let rootNoteIndex = notes.indexOf(rootNote.letter);

  let scale = []
  scaleMap.forEach(note => {
    let index = rootNoteIndex + note;
    scale.push(notes[index%12] + (rootNote.octave + (index<12 ? 0 : 1)))
  });

  console.log('scale', scale)
  return scale;
}

let e = new Note('E3');
let eMinorScale = makeScale(e, 'minor');

// Todo: Convert html to this?
document.getElementById('playScaleAscending').addEventListener('click', () => {
  playNotes(eMinorScale, 200);
});

document.getElementById('playScaleDescending').addEventListener('click', () => {
  playNotes(eMinorScale, 200, false);
});