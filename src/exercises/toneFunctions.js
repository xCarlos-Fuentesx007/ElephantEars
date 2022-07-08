import * as Tone from "tone";

function Intervals() {
  const synth = new Tone.Synth().toDestination();

  var interval = Math.floor(Math.random() * 12) + 1;
  var first_note = Math.floor(Math.random() * 24);
  var second_note = first_note + interval;

  synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
  synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + 0.8);
  return find_interval(interval);
}
export { Intervals };

function Chords() {
  const synth = new Tone.PolySynth().toDestination();

  var is_seventh = Math.floor(Math.random() * 2); //0 if triad, 1 if seventh
  var chordType; //Triad:   0 = Major, 1 = Minor, 2 = Diminished, 3 = Augmented
  //Seventh: 0 = Dominant Seventh, 1 = Major Seventh, 2 = Minor Seventh

  var first_note = Math.floor(Math.random() * 24);
  var second_note, third_note, fourth_note;

  let value;

  //Triad
  if (is_seventh === 0) {
    chordType = Math.floor(Math.random() * 4);
    switch (chordType) {
      //Major
      case 0:
        second_note = first_note + 4;
        third_note = first_note + 7;
        value = "Major";
        break;
      //Minor
      case 1:
        second_note = first_note + 3;
        third_note = first_note + 7;
        value = "Minor";
        break;
      //Diminished
      case 2:
        second_note = first_note + 3;
        third_note = first_note + 6;
        value = "Diminished";
        break;
      //Augmented
      case 3:
        second_note = first_note + 4;
        third_note = first_note + 8;
        value = "Augmented";
        break;
      //Error
      default:
        second_note = first_note;
        third_note = first_note;
        break;
    }
    synth.triggerAttackRelease(
      [find_note(first_note), find_note(second_note), find_note(third_note)],
      "4n"
    );
  }

  //Seventh
  if (is_seventh === 1) {
    chordType = Math.floor(Math.random() * 3);
    switch (chordType) {
      //Dominant Seventh
      case 0:
        second_note = first_note + 4;
        third_note = first_note + 7;
        fourth_note = first_note + 10;
        value = "Dominant Seventh";
        break;
      //Major Seventh
      case 1:
        second_note = first_note + 4;
        third_note = first_note + 7;
        fourth_note = first_note + 11;
        value = "Major Seventh";
        break;
      //Minor Seventh
      case 2:
        second_note = first_note + 3;
        third_note = first_note + 7;
        fourth_note = first_note + 10;
        value = "Minor Seventh";
        break;
      //Error
      default:
        second_note = first_note;
        third_note = first_note;
        fourth_note = first_note;
        break;
    }
    synth.triggerAttackRelease(
      [
        find_note(first_note),
        find_note(second_note),
        find_note(third_note),
        find_note(fourth_note),
      ],
      "4n"
    );
  }
  return value;
}
export { Chords };

//////////////////////////Scales

///////////////////////////Chord Progressions

function Perfect_Pitch() {
  const synth = new Tone.Synth().toDestination();
  var first_note = Math.floor(Math.random() * 36);
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
