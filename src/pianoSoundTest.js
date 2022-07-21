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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Lowest note available: C1
// Highest note available: C8

let audioObjects = [];

function playSound(noteName) {
  if (noteName === undefined) return;
  let pathToFolder = "./piano-wav/";
  let path = pathToFolder + noteName + ".wav";
  let audio = new Audio(path);
  let p = audio.play(); 
  audioObjects.push(audio);
  return p;
}

function stopAll() {

  while (audioObjects.length > 0) {
    // let a = audioObjects.pop();
    // console.log(`pausing ${a}`);
    // a.pause();
    audioObjects.pop().pause();
  }
}

document.getElementById('stopButton').addEventListener('click', () => {
  // document.querySelectorAll('audio').forEach(el => el.stop());
  stopAll();
});

function playRandomNote() {
  let notes = ['A', 'As', 'B', 'C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs'];
  var noteLetter = getRandomInt(12);
  var noteNumber = getRandomInt(7) + 1;
  var noteName = notes[noteLetter] + noteNumber.toString();
  console.log(`Playing ${noteName}`);
  playSound(noteName);
}

let notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B'];

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

function getRandomRootArray() {
  let noteLetterIndex = getRandomInt(12);
  let noteOctave = getRandomInt(5) + 2; // min: 2, max: 7
  let rootNoteName = notes[noteLetterIndex] + noteOctave.toString();
  // return [notes[noteLetterIndex], noteOctave];
  // let arr = [rootNoteName, notes[noteLetterIndex], noteOctave];
  // console.log(`returning types ${typeof arr[0]} ${typeof arr[1]} ${typeof arr[2]}`);
  // return arr;
  return [rootNoteName, notes[noteLetterIndex], noteOctave];
}

function getRandomIntervalMap() {
  
  let intervals = [
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
  
  let chords = [
    ['major',4,7], // major
    ['major 7th',4,7,11], // major 7th
    ['minor',3,7], // minor
    ['minor 7th',3,7,10], // minor 7th
    ['diminished',3,6], // half diminished
    ['augmented',4,8], // augmented
  ]
  
  let i = getRandomInt(chords.length);

  return chords[i];
}

// Todo: rename this to playArpeggio?
function playSoundRecursiveWrapper(playing, ascending=true) {

  if (ascending) {
    playSound(playing[0]).then( playSoundRecursiveAscending(playing, 1) );
  }
  else {
    let i = playing.length-1;
    playSound(playing[i]).then( playSoundRecursiveDescending(playing, --i) );
  }
}

function playSoundRecursiveAscending(playing, i) {

  if (playing[i] === undefined) { return; } // no more notes to play
  
  setTimeout( () =>
    {playSound(playing[i]).then(() => { 
      playSoundRecursive(playing, ++i);
    }).catch(() => {console.log('interrupted')})},
    750 // delay between notes
  )
}

function playSoundRecursiveDescending(playing, i) {

  if (i < 0) { return; } // no more notes to play

  setTimeout( () =>
    {playSound(playing[i]).then(() => {
      playSoundRecursiveDescending(playing, --i);
    }).catch(() => {console.log('interrupted')})},
    750 // delay between notes
  )
}

// Todo: delete this function. It's no longer necessary.
function playSoundRecursive(playing, i, ascending=true) {
  // if (i > 0) sleep(750); // delay between notes

  if (ascending) {
    if (playing[i] === undefined) { return; } // no more notes to play
    
    setTimeout( () =>
      {playSound(playing[i]).then(() => { 
        playSoundRecursive(playing, ++i);
      }).catch(() => {console.log('interrupted')})},
      750
    )
    
  }
  else { // descending
    let j = playing.length - 1 - i; 
    if (playing[j] === undefined) { return; } // no more notes to play
    
    // playSound(playing[j]).then(() => {
    //   playSoundRecursive(playing, ++i, false);
    // }).catch(() => {console.log('interrupted')})

    setTimeout( () =>
      {playSound(playing[j]).then(() => {
        playSoundRecursive(playing, ++i, false);
      }).catch(() => {console.log('interrupted')})},
      750
    )
  }
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
    playSoundRecursiveWrapper(playing, ascending);
  }
  else {
    playing.forEach(note => {
      playSound(note);
    });
  }
}

function repeat() {
  playChord(...repeatMap);
}