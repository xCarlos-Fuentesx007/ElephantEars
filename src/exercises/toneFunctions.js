import * as Tone from 'tone'



function Intervals() {
    const synth = new Tone.Synth().toDestination();

    var interval = Math.floor(Math.random()*11) + 1;
    var first_note = Math.floor(Math.random()*24);
    var second_note = first_note + interval;

    synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
    synth.triggerAttackRelease(find_note(second_note), "4n", Tone.now() + .8);

}   export {Intervals};



function Chords() {
    const synth = new Tone.PolySynth().toDestination();

    var is_seventh = Math.floor(Math.random()*2);
    var first_note = Math.floor(Math.random()*24);
    var second_note, third_note, fourth_note;

    if (is_seventh === 0) {
        switch (Math.floor(Math.random()*4)) {
            //Major
            case 0:
                second_note = first_note + 4;
                third_note = first_note + 7;
                break;
            //Minor
            case 1:
                second_note = first_note + 3;
                third_note = first_note + 7;
                break;
            //Diminished
            case 2:
                second_note = first_note + 3;
                third_note = first_note + 6;
                break;
            //Augmented
            case 3:
                second_note = first_note + 4;
                third_note = first_note + 8;
                break;
            //Error
            default:
                second_note = first_note;
                third_note = first_note;
                break;
        }
        synth.triggerAttackRelease([find_note(first_note), find_note(second_note), find_note(third_note)], "4n");
    }

    if (is_seventh === 1) {
        switch (Math.floor(Math.random()*3)) {
            //Dominant
            case 0:
                second_note = first_note + 4;
                third_note = first_note + 7;
                fourth_note = first_note + 10;
                break;
            //Major
            case 1:
                second_note = first_note + 4;
                third_note = first_note + 7;
                fourth_note = first_note + 11;
                break;
            //Minor
            case 2:
                second_note = first_note + 3;
                third_note = first_note + 7;
                fourth_note = first_note + 10;
                break;
            //Error
            default:
                second_note = first_note;
                third_note = first_note;
                fourth_note = first_note;
                break;
        }
        synth.triggerAttackRelease([find_note(first_note), find_note(second_note), find_note(third_note), find_note(fourth_note)], "4n");
    }

}   export {Chords};



//////////////////////////Scales



///////////////////////////Chord Progressions



function Perfect_Pitch() {
    const synth = new Tone.Synth().toDestination();
    var first_note = Math.floor(Math.random()*36);
    synth.triggerAttackRelease(find_note(first_note), "4n", Tone.now());
}   export {Perfect_Pitch};



////////////////////////////Scale Degrees



////////////////////////////Intervals in Context



/////////////////////////////Melotic Dictation



function find_note(num) {
    const notes = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
                   "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
                   "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"];

    var str;

    try {
        str = notes[num];
    }
    catch(err) {
        str = "C3";
    }

    return str;
}