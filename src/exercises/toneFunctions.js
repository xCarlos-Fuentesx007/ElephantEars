import * as Tone from "tone";

function Intervals(first_note, interval) {

  const synth = new Tone.Synth().toDestination();

  var second_note = first_note + interval;

  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 0.8);

  return find_interval(interval);
}
export { Intervals };

function Chords(first_note, chord_type) {

  const synth = new Tone.PolySynth().toDestination();

  var second_note, third_note, fourth_note = first_note;

  switch (chord_type) {
    //Major (Triad)
    case 0:
      second_note = first_note + 4;
      third_note = first_note + 7;
      break;
    //Minor (Triad)
    case 1:
      second_note = first_note + 3;
      third_note = first_note + 7;
      break;
    //Diminished (Triad)
    case 2:
      second_note = first_note + 3;
      third_note = first_note + 6;
      break;
    //Augmented (Triad)
    case 3:
      second_note = first_note + 4;
      third_note = first_note + 8;
      break;
    //Dominant Seventh
    case 4:
      second_note = first_note + 4;
      third_note = first_note + 7;
      fourth_note = first_note + 10;
      break;
    //Major Seventh
    case 5:
      second_note = first_note + 4;
      third_note = first_note + 7;
      fourth_note = first_note + 11;
      break;
    //Minor Seventh
    case 6:
      second_note = first_note + 3;
      third_note = first_note + 7;
      fourth_note = first_note + 10;
      break;
    default:
      second_note = first_note;
      third_note = first_note;
  }
  synth.triggerAttackRelease(
    [
      find_note(first_note),
      find_note(second_note),
      find_note(third_note),
      find_note(fourth_note),
    ], "4n"
  );

  return find_chord_type(chord_type);
}
export { Chords };

function Scales(first_note, scale_type) {

  const synth = new Tone.Synth().toDestination();
  var scale = [0, 0, 0, 0, 0, 0, 0, 0];
  var i;

  switch (scale_type) {
    //Major (Ionian)
    case 0:
      scale = [0,2,2,1,2,2,2,1]; // W W H W W W H
      break;
    //Natural Minor (Aeolian)
    case 1:
      scale = [0,2,1,2,2,1,2,2]; //W H W W H W W
      break;
    //Harmonic Minor
    case 2:
      scale = [0,2,1,2,2,1,3,1]; //W H W W H W+1/2 H
      break;
    //Dorian
    case 3:
      scale = [0,2,1,2,2,2,1,2]; //W H W W W H W
      break;
    //Phygian
    case 4:
      scale = [0,1,2,2,2,1,2,2]; //H W W W H W W
      break;
    //Lydian
    case 5:
      scale = [0,2,2,2,1,2,2,1]; //W W W H W W H
      break;
    //Mixolydian
    case 6:
      scale = [0,2,2,1,2,2,1,2]; //W W H W W H W
      break;
    //Locrian
    case 7:
      scale = [0,1,2,2,1,2,2,2]; //H W W H W W W
      break;
    //Error
    default:
      break;
  }

  for (i=1; i<8; i++) {
    scale[i] = scale[i-1] + scale[i];
  }

  for (i=0; i<8; i++) {
    synth.triggerAttackRelease(find_note(scale[i] + first_note), "4n", Tone.now() + (.8 * i));
  }

  return find_scale_type(scale_type);

}
export { Scales };

///////////////////////////Chord Progressions

function Perfect_Pitch(first_note) {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  return find_note(first_note);
}
export { Perfect_Pitch };

////////////////////////////Scale Degrees

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