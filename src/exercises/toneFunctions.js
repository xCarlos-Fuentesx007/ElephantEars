import * as Tone from "tone";
import { DEMO } from "../pages/Exercise.js";
import {Note, playInterval, getIntervalMap, getChordMap, playChord, getScaleMap, playScale, getRandomKey, getChordProgessionMap, playChordProgression} from "./pianoSounds/pianoSounds.js";
// import {playRandomNote} from "./pianoSounds/pianoSounds.js";


function Intervals(first_note, interval) {
  // console.log(`first_note: ${first_note}, interval: ${interval}`);

  let noteName = Note.notes[first_note%12] + (Math.trunc(first_note/12) + 2);
  // console.log('noteName', noteName)
  let rootNote = new Note(noteName);
  let intervalMap = getIntervalMap(interval);

  // const synth = new Tone.Synth().toDestination();

  // var second_note = first_note + interval;

  // synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  // synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 0.8);

  // return find_interval(interval);

  let intervalName = playInterval(rootNote, intervalMap, true);
  return intervalName;
}
export { Intervals };


function Chords(first_note, chord_type) {
  // const synth = new Tone.PolySynth().toDestination();
  // var chord = make_chord(first_note, chord_type);
  // synth.triggerAttackRelease(chord, "4n", Tone.now());
  // return find_chord_type(chord_type);

  let rootNote = Note.numberToNote(first_note);
  let chordMap = getChordMap(chord_type);
  playChord(rootNote, chordMap);
  
  return chordMap[0] // returning the name
}
export { Chords };

function Scales(first_note, scale_type) {

  let rootNote = Note.numberToNote(first_note);
  let scaleType = playScale(rootNote, scale_type);
  // console.log(`Scales is returning playScale(rootNote, scale_type): ${scaleType}`);

  return scaleType;

  // const synth = new Tone.Synth().toDestination();
  // var scale = [0, 0, 0, 0, 0, 0, 0, 0];
  // var i;

  // switch (scale_type) {
  //   //Major (Ionian)
  //   case 0:
  //     scale = [0,2,2,1,2,2,2,1]; // W W H W W W H
  //     break;
  //   //Natural Minor (Aeolian)
  //   case 1:
  //     scale = [0,2,1,2,2,1,2,2]; //W H W W H W W
  //     break;
  //   //Harmonic Minor
  //   case 2:
  //     scale = [0,2,1,2,2,1,3,1]; //W H W W H W+1/2 H
  //     break;
  //   //Dorian
  //   case 3:
  //     scale = [0,2,1,2,2,2,1,2]; //W H W W W H W
  //     break;
  //   //Phygian
  //   case 4:
  //     scale = [0,1,2,2,2,1,2,2]; //H W W W H W W
  //     break;
  //   //Lydian
  //   case 5:
  //     scale = [0,2,2,2,1,2,2,1]; //W W W H W W H
  //     break;
  //   //Mixolydian
  //   case 6:
  //     scale = [0,2,2,1,2,2,1,2]; //W W H W W H W
  //     break;
  //   //Locrian
  //   case 7:
  //     scale = [0,1,2,2,1,2,2,2]; //H W W H W W W
  //     break;
  //   //Error
  //   default:
  //     break;
  // }

  // for (i=1; i<8; i++) {
  //   scale[i] = scale[i-1] + scale[i];
  // }

  // for (i=0; i<8; i++) {
  //   synth.triggerAttackRelease(find_note(scale[i] + first_note), "4n", Tone.now() + (.8 * i));
  // }

  // let st = find_scale_type(scale_type);
  // console.log(`Scales is returning find_scale_type(scale_type): ${st}`);
  // return st;
  // return find_scale_type(scale_type);

}
export { Scales };

///////////////////////////Chord Progressions

function Perfect_Pitch(first_note) {
  
  const nameDictionary = {
    "C3" : "C3", 
    "C#3" : "Cs3", 
    "D3" : "D3", 
    "D#3" : "Ds3", 
    "E3" : "E3", 
    "F3" : "F3", 
    "F#3" : "Fs3", 
    "G3" : "G3", 
    "G#3" : "Gs3", 
    "A3" : "A3", 
    "A#3" : "As3", 
    "B3" : "B3", 
    "C4" : "C4", 
    "C#4" : "Cs4", 
    "D4" : "D4", 
    "D#4" : "Ds4", 
    "E4" : "E4", 
    "F4" : "F4", 
    "F#4" : "Fs4", 
    "G4" : "G4", 
    "G#4" : "Gs4", 
    "A4" : "A4", 
    "A#4" : "As4", 
    "B4" : "B4", 
    "C5" : "C5", 
    "C#5" : "Cs5", 
    "D5" : "D5", 
    "D#5" : "Ds5", 
    "E5" : "E5", 
    "F5" : "F5", 
    "F#5" : "Fs5", 
    "G5" : "G5", 
    "G#5" : "Gs5", 
    "A5" : "A5", 
    "A#5" : "As5", 
    "B5" : "B5",   
  }

  let key = find_pitch(first_note%12);
  let noteName = nameDictionary[key];
  let note = new Note(noteName);
  note.play();
  return key;

  // const synth = new Tone.Synth().toDestination();
  // synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  // return find_pitch(first_note);
}
export { Perfect_Pitch };

function Scale_Degrees(first_note, answer_note) {

  let rootNote = Note.numberToNote(first_note);
  let answerNote = Note.numberToNote(answer_note);

  let chordProgressionAsSymbols = ['I', 'III', 'V', 'I']; // Play the I, III, V, and I chord. 
  // let chordProgressionMap = getChordProgessionMap(chordProgressionAsSymbols);
  let delay = 1100;
  playChordProgression(rootNote, chordProgressionAsSymbols, delay);
  setTimeout( () => {answerNote.play()}, delay * (chordProgressionAsSymbols.length + .8)); // Wait until the chords are done playing to play the answer note.

  // // Make the I, III, and V chord.
  // var chords1 = make_chord(first_note, 0);
  // var chords2 = make_chord(first_note + 4, 0);
  // var chords3 = make_chord(first_note + 7, 0);
  
  // // Play the I, III, V, and I chord. Then play the answer note.
  // const synth = new Tone.PolySynth().toDestination();
  // synth.triggerAttackRelease(chords1, "4n", Tone.now());
  // synth.triggerAttackRelease(chords2, "4n", Tone.now() + 0.8);
  // synth.triggerAttackRelease(chords3, "4n", Tone.now() + 1.6);
  // synth.triggerAttackRelease(chords1, "4n", Tone.now() + 2.4);
  // synth.triggerAttackRelease(find_note(answer_note), "4n", Tone.now() + 4);

  return find_scale_degree(first_note, answer_note);
}
export { Scale_Degrees };

////////////////////////////Intervals in Context

/////////////////////////////Melotic Dictation

//Finds note name using number (0 = middle C)
function find_note(num) {
  const notes = [
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
  ];

  var str;

  try {
    str = notes[num];
  } catch (err) {
    str = "C3";
  }

  return str;
}

function find_pitch(num) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  return notes[num % 12];

}

//Finds interval name using number of semitones
function find_interval(interval) {
  const values = [
    "Minor 2nd",
    "Major 2nd",
    "Minor 3rd",
    "Major 3rd",
    "Perfect 4th",
    "Tritone",
    "Perfect 5th",
    "Minor 6th",
    "Major 6th",
    "Minor 7th",
    "Major 7th",
    "Octave",
  ];

  return values[interval - 1];
}

function find_chord_type(num) {
  const values = [
    "Major",
    "Minor",
    "Diminished",
    "Augmented",
    "Dominant Seventh",
    "Major Seventh",
    "Minor Seventh",
  ];

  return values[num];
}

function find_scale_type(num) {
  const vals = [
    "Major (Ionian)",
    "Natural Minor (Aeolian)",
    "Harmonic Minor",
    "Dorian",
    "Phygian",
    "Lydian",
    "Mixolydian",
    "Locrian",
  ];

  return vals[num];
}

function make_chord(first_note, chord_type) {

  switch (chord_type) {
    //Major (Triad)
    case 0:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note)];
    //Minor (Triad)
    case 1:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+7), find_note(first_note)];
    //Diminished (Triad)
    case 2:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+6), find_note(first_note)];
    //Augmented (Triad)
    case 3:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+8), find_note(first_note)];
    //Dominant Seventh
    case 4:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note+10)];
    //Major Seventh
    case 5:
      return [find_note(first_note), find_note(first_note+4), find_note(first_note+7), find_note(first_note+11)];
    //Minor Seventh
    case 6:
      return [find_note(first_note), find_note(first_note+3), find_note(first_note+7), find_note(first_note+10)];
    default:
      return [find_note(first_note), find_note(first_note), find_note(first_note), find_note(first_note)];
  }
}

function find_scale_degree(first_note, answer_note) {
  var interval = answer_note - first_note;
  while (interval < 0) {
    interval = interval + 12;
  }
  const values = [
    "1 (do)",
    "Raised 1 (di)",
    "2 (re)",
    "Raised 2 (ri)",
    "3 (mi)", 
    "4 (fa)",
    "Raised 4 (fi)",
    "5 (so)",
    "Raised 5 (si)",
    "6 (la)",
    "Raised 6 (li)",
    "7 (ti)"
  ];
  return values[interval];
}