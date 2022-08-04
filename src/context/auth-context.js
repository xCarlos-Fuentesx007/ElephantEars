import React, { useEffect, useState } from "react";
import Queue from "../components/Queue";

const url = process.env.REACT_APP_BACKEND_USERS_URL;
// const campaignUrl = process.env.REACT_APP_BACKEND_CAMPAIGN_URL;
const statsUrl = process.env.REACT_APP_BACKEND_STATS_URL;

const ANSWER_DATA = [
  {
    name: "Intervals",
    answers: [
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
    ],
  },
  {
    name: "Perfect Pitch",
    answers: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  },

  {
    name: "Chords",
    answers: [
      "Major",
      "Minor",
      "Diminished",
      "Augmented",
      "Dominant Seventh",
      "Major Seventh",
      "Minor Seventh",
    ],
  },

  {
    name: "Scales",
    answers: [
      "Major (Ionian)",
      "Natural Minor (Aeolian)",
      "Harmonic Minor",
      "Dorian",
      "Phrygian",
      "Lydian",
      "Mixolydian",
      "Locrian",
    ],
  },

  {
    name: "Scale Degrees",
    answers: [
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
      "7 (ti)",
    ],
  },

  {
    name: "Chord Progressions",
    answers: ["I", "ii", "iii", "IV", "V", "vi"],
  },

  {
    name: "Intervals In Context",
    answers: [
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
      "7 (ti)",
    ],
    answers2: [
      "Unison",
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
    ],
  },

  {
    name: "Melodic Dictation",
    answers: [
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
      "7 (ti)",
    ],
  },
];

const EXERCISES_MAP = new Map([
  ["Intervals", "intervals"],
  ["Chords", "chords"],
  ["Scales", "scales"],
  ["Perfect Pitch", "pitch"],
  ["Scale Degrees", "scale_degrees"],
  ["Chord Progressions", "chord_progressions"],
  ["Intervals In Context", "intervals_in_context"],
  ["Melodic Dictation", "melodic_dictation"],
]);

// const INTERVALS_MAP = new Map([
//   ["Minor 2nd", "minor2"],
//   ["Major 2nd", "major2"],
//   ["Minor 3rd", "minor3"],
//   ["Major 3rd", "major3"],
//   ["Perfect 4th", "perfect4"],
//   ["Tritone", "tritone"],
//   ["Perfect 5th", "perfect5"],
//   ["Minor 6th", "minor6"],
//   ["Major 6th", "major6"],
//   ["Minor 7th", "minor7"],
//   ["Major 7th", "major7"],
//   ["Octave", "octave"],
// ]);

// const CHORDS_MAP = new Map([
//   ["Major", "major"],
//   ["Minor", "minor"],
//   ["Diminished", "diminished"],
//   ["Augmented", "augmented"],
//   ["Dominant Seventh", "dom7"],
//   ["Major Seventh", "major7"],
//   ["Minor Seventh", "minor7"],
// ]);

// const SCALES_MAP = new Map([
//   ["Major (Ionian)", "major"],
//   ["Natural Minor (Aeolian)", "natMinor"],
//   ["Harmonic Minor", "harmMinor"],
//   ["Dorian", "dorian"],
//   ["Phrygian", "phrygian"],
//   ["Lydian", "lydian"],
//   ["Mixolydian", "mixolydian"],
//   ["Locrian", "locrian"],
// ]);

// const PITCH_MAP = new Map([
//   ["C", "c"],
//   ["C#", "csharp"],
//   ["D", "d"],
//   ["D#", "dharp"],
//   ["E", "e"],
//   ["F", "f"],
//   ["F#", "fsharp"],
//   ["G", "g"],
//   ["G#", "gsharp"],
//   ["A", "a"],
//   ["A#", "asharp"],
//   ["B", "b"],
// ]);

// // also used for Intervals in Context and Melodic Dictation
// const SCALE_DEGREES_MAP = new Map([
//   ["1 (do)", "do_1"],
//   ["Raised 1 (di)", "raised1_di"],
//   ["2 (re)", "re_2"],
//   ["Raised 2 (ri)", "raised2_ri"],
//   ["3 (mi)", "mi_3"],
//   ["4 (fa)", "fa_4"],
//   ["Raised 4 (fi)", "raised4_fi"],
//   ["5 (so)", "so_5"],
//   ["Raised 5 (si)", "raised5_si"],
//   ["6 (la)", "la_6"],
//   ["Raised 6 (li)", "raised6_li"],
//   ["7 (ti)", "ti_7"],
// ]);

// const CHORD_PROGRESSIONS_MAP = new Map([
//   ["I", "first"],
//   ["ii", "second"],
//   ["iii", "third"],
//   ["IV", "fourth"],
//   ["V", "fifth"],
//   ["vi", "sixth"],
// ]);

export const AuthContext = React.createContext({
  userData: [],
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: undefined,
  exercise: "",
  percentage: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  answerData: undefined,
  startedDate: undefined,
  campaignRunning: false,
  fromCampaign: false,
  schedule: undefined,
  currQuestion: 0,
  numQuestions: 0,
  exerciseHandler: (exerciseValue) => {},
  percentageHandler: (percentageValue) => {},
  answersHandler: (correctAnswersValue, incorrectAnswersValue) => {},
  login: (userData) => {},
  updateUser: (userData) => {},
  signup: (userData) => {},
  verifyEmail: (token) => {},
  logout: () => {},
  getStatsData: (userData) => {},
  statsData: "",
  runCampaign: () => {},
  createSchedule: () => {},
  unlockNextSet: () => {},
  scheduleComplete: () => {},
  stopCampaign: () => {},
  resetCampaign: () => {},
  updateStatsDataExercise: (exercise, correct, isMulti) => {},
  getSchedule: (userData) => (),
});

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState([]);
  const [answerData, setAnswerData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exercise, setExercise] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [startedDate, setStartedDate] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();
  const [campaignRunning, setCampaignRunning] = useState(false);
  const [fromCampaign, setFromCampaign] = useState(false);
  const [schedule, setSchedule] = useState(new Queue([]));
  const [statsData, setStatsData] = useState();
  const [currQuestion, setCurrQuestion] = useState(-1);
  const [numQuestions, setNumQuestions] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiresIn) > new Date()
    ) {
      setUserData(storedData.userData);
      setSchedule(new Queue(storedData.userData.schedule));
      setToken(storedData.token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("userData");
    }
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
    setIsLoggedIn(true);
    setUserData(responseData);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: responseData.token,
        expiresIn: expirationDate,
        userData: responseData,
      })
    );
  };

  const updateUser = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    const storedData = JSON.parse(localStorage.getItem("userData"));
    storedData.userData = {
      id: userData.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      token: userData.token,
      unlocked: userData.unlocked,
      locked: userData.locked,
      schedule: userData.schedule,
    };
    localStorage.setItem("userData", JSON.stringify(storedData));
    setUserData(storedData.userData);
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
  };

  // const getCampaignData = async (userData) => {
  //   setIsLoading(true);
  //   setError(undefined);
  //   const response = await fetch(`${campaignUrl}/all`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${userData.token}`,
  //     },
  //   });
  //   const responseData = await response.json();
  //   setIsLoading(false);
  //   if (responseData.message) {
  //     setError(responseData.message);
  //     return;
  //   }
  //   setCampaignData(responseData);
  //   return responseData;
  // };

  const getStatsData = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${statsUrl}/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
    setStatsData(responseData);
    return responseData;
  };

  const verifyEmail = async (token) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/verify-email?token=${token}`);
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.error) {
      setError(responseData.error);
      return;
    }
    setIsLoggedIn(true);
    setUserData(responseData);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: responseData.token,
        expiresIn: expirationDate,
        userData: responseData,
      })
    );
  };

  const exerciseHandler = (exerciseValue) => {
    if (!campaignRunning) {
      const date = new Date();
      setStartedDate(date);
      setPercentage(0);
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
    }
    setExercise(exerciseValue);
    ANSWER_DATA.map((item) => {
      if (item.name === exerciseValue) {
        setAnswerData(item);
      }
    });
  };

  const percentageHandler = (percentageValue) => {
    setPercentage(percentageValue);
  };

  const answersHandler = (correctAnswersValue, incorrectAnswersValue) => {
    setCorrectAnswers(correctAnswersValue);
    setIncorrectAnswers(incorrectAnswersValue);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    localStorage.removeItem("userData");
  };

  const runCampaign = () => {
    if (!campaignRunning) {
      setCurrQuestion(0);
      setNumQuestions(schedule.getSize());
    }
    if (campaignRunning) {
      setCurrQuestion(currQuestion + 1);
    }
    setCampaignRunning(true);
    exerciseHandler(schedule.peek());
  };
  
  const getSchedule = (userData) => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiresIn) > new Date()
    ) {
      console.log(storedData.userData.schedule);
      setSchedule(new Queue(storedData.userData.schedule));
    } else {
      localStorage.removeItem("userData");
    }
  }; 
  
  //creates a new schedule of exercises based on previous performance, implements algorithm
  const createSchedule = (userData, updated) => {

      var accuracies = [];

      //get accuracies of all available exercises
      userData.unlocked.forEach(exercise => {
          exercise = EXERCISES_MAP.get(exercise);
          accuracies = accuracies.concat(parseFloat(statsData[exercise].totalAccuracy));
      });

      const accuraciesCopy = accuracies;
      var p = accuracies.length;
      var index = 0;
      //setting priority of each exercise based on accuracy
      //priority is 1-n, where n is the number of available exercises
      //the higher the priority, the more it appears
      while (accuracies.length > 1) {
          var minimum = Math.min(...accuracies);
          console.log("minimum: " + minimum);
          index = accuraciesCopy.indexOf(minimum);
          statsData[EXERCISES_MAP.get(userData.unlocked[index])].priority = p;
          index = accuracies.indexOf(minimum);
          accuracies.splice(index, 1);
          p -= 1;
      }

      index = accuraciesCopy.indexOf(accuracies[0]);
      statsData[EXERCISES_MAP.get(userData.unlocked[index])].priority = p;

      var rates = [];

      //middle algorithm to determine the ratio between priority and accuracy
      var i = 0;
      userData.unlocked.forEach(exercise => {
          exercise = EXERCISES_MAP.get(exercise);
          rates = rates.concat((100 - statsData[exercise].totalAccuracy)*(statsData[exercise].priority));
      });

      //if a new set of exercises is unlocked, it will never appear unless hard set here
      if (updated) {
          rates[rates.length-1] = 60;
      }

      var totalRate = 0;

      rates.forEach(rate => {
          totalRate += rate;
      });
      var occurances = [];

      //the algorithm, determines how many of each exercise will appear in the next schedule
      rates.forEach(rate => {
          occurances = occurances.concat(Math.floor((rate / totalRate) * 10));
      });

      var exercisesLeft = 0;

      //determines lenght of next schedule
      occurances.forEach(occurance => {
          exercisesLeft += occurance;
      });

      //randomly creates the schedule based on how many exercises are needed, per the algorithm
      var scheduleBuilder = [];
      while (exercisesLeft > 0) {
          var r = Math.floor(Math.random() * (occurances.length));
          if (occurances[r] > 0) {
              scheduleBuilder = scheduleBuilder.concat(userData.unlocked[r]);
              occurances[r] -= 1;
              exercisesLeft -= 1;
          }
      }
      const newSchedule = new Queue(scheduleBuilder);
      userData.schedule = scheduleBuilder;
  };

  //if the user reaches 80% accuracy on all previous exercises, unlocks next exercise set
  const unlockNextSet = (userData) => {
    //move new exercise set from locked to unlocked
    userData.unlocked = userData.unlocked.concat(userData.locked[0]);
    userData.locked = userData.locked.slice(1);

    createSchedule(userData, true);
  };

  const scheduleComplete = (userData) => {
    var levelUp = true;
    
    userData.unlocked.forEach(exercise => {
      exercise = EXERCISES_MAP.get(exercise);

      if (statsData[exercise].totalAccuracy < 70) {
          levelUp = false;
      }
      
    });

    if (levelUp) {
        unlockNextSet(userData);
    } else {
        createSchedule(userData, false);
    }

    updateUser(userData);
  };

  const stopCampaign = () => {
    setCampaignRunning(false);
    setFromCampaign(true);
    var date = new Date();
    var finalTime = Number(
      ((date.getTime().toFixed(1) - startedDate.getTime()) / 1000).toFixed(1)
    );
    let newStatsData = statsData;
    newStatsData.sessionsCompleted++;
    newStatsData.totalAnswered =
      newStatsData.intervals.totalAnswered +
      newStatsData.chords.totalAnswered +
      newStatsData.scales.totalAnswered +
      newStatsData.pitch.totalAnswered +
      newStatsData.chord_progressions.totalAnswered +
      newStatsData.scale_degrees.totalAnswered +
      newStatsData.intervals_in_context.totalAnswered +
      newStatsData.melodic_dictation.totalAnswered;
    newStatsData.totalTime = (
      Number(newStatsData.totalTime) + finalTime
    ).toFixed(1);
    newStatsData.averageTimePerQuestion = (
      newStatsData.totalTime / newStatsData.totalAnswered
    ).toFixed(1);
    setStatsData(newStatsData);
    postStatsData();
    scheduleComplete(userData);
  };

  const postStatsData = async () => {
    setIsLoading(true);
    setError(undefined);
    await fetch(`${statsUrl}/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statsData),
    });
    setIsLoading(false);
    setStatsData(undefined);
  };

  const resetCampaign = () => {
    setNumQuestions(0);
    setCurrQuestion(0);
    setPercentage(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setFromCampaign(false);
  };

  const updateStatsDataExercise = (exercise, correct, isMulti, time) => {
    // map the exercise and answer to fit campaignData structure
    const exerciseMapped = EXERCISES_MAP.get(exercise);
    let newStatsData = statsData;
    let newStatsDataExercise = newStatsData[exerciseMapped];
    newStatsDataExercise.totalAnswered++;
    if (isMulti && correct[0] && correct[1] && correct[2]) {
      newStatsDataExercise.totalCorrect++;
    } else if (!isMulti && correct) {
      newStatsDataExercise.totalCorrect++;
    }
    newStatsDataExercise.totalAccuracy = (
      (newStatsDataExercise.totalCorrect / newStatsDataExercise.totalAnswered) *
      100
    ).toFixed(1);
    newStatsDataExercise.totalTime = (
      Number(newStatsDataExercise.totalTime) + time
    ).toFixed(1);
    newStatsDataExercise.averageTime = (
      newStatsDataExercise.totalTime / newStatsDataExercise.totalAnswered
    ).toFixed(1);
    newStatsData[exerciseMapped] = newStatsDataExercise;
    setStatsData(newStatsData);
  };

  // const updateCampaignDataMulti = (exercise, answer, correct) => {
  //   console.log(
  //     "exercise:",
  //     exercise,
  //     "\ncorrect answer:",
  //     answer,
  //     "\ncorrect:",
  //     correct
  //   );

  //   // map the exercise and answers to fit campaignData structure
  //   const exerciseMapped = EXERCISES_MAP.get(exercise);
  //   var answerMapped1 = "";
  //   var answerMapped2 = "";
  //   var answerMapped3 = "";
  //   switch (exerciseMapped) {
  //     case "chord_progressions":
  //       answerMapped1 = "ii_" + CHORD_PROGRESSIONS_MAP.get(answer[0]);
  //       answerMapped2 = "iii_" + CHORD_PROGRESSIONS_MAP.get(answer[1]);
  //       answerMapped3 = "iv_" + CHORD_PROGRESSIONS_MAP.get(answer[2]);
  //       break;
  //     case "scale_degrees":
  //       answerMapped1 = SCALE_DEGREES_MAP.get(answer[0]);
  //       answerMapped2 = SCALE_DEGREES_MAP.get(answer[1]);
  //       answerMapped3 = SCALE_DEGREES_MAP.get(answer[2]);
  //       break;
  //     case "melodic_dictation":
  //       answerMapped1 = "note1_" + SCALE_DEGREES_MAP.get(answer[0]);
  //       answerMapped2 = "note2_" + SCALE_DEGREES_MAP.get(answer[1]);
  //       answerMapped1 = "note3_" + SCALE_DEGREES_MAP.get(answer[2]);
  //       break;
  //     case "intervals_in_context":
  //       answerMapped1 = "note1_" + SCALE_DEGREES_MAP.get(answer[0]);
  //       answerMapped2 = "note2_" + SCALE_DEGREES_MAP.get(answer[1]);
  //       answerMapped3 = "interval_" + INTERVALS_MAP.get(answer[2]);
  //       break;
  //     default:
  //       answerMapped1 = "";
  //       answerMapped2 = "";
  //       answerMapped3 = "";
  //   }

  //   var newCampaignData1 = campaignData[exerciseMapped][answerMapped1];
  //   var newCampaignData2 = campaignData[exerciseMapped][answerMapped2];
  //   var newCampaignData3 = campaignData[exerciseMapped][answerMapped3];
  //   var newTime = Date.now();

  //   // newCampaignData1 updates
  //   // familiar
  //   newCampaignData1.attempts++;
  //   if (correct[0]) newCampaignData1.totalCorrect++;
  //   newCampaignData1.date = newTime;
  //   // accuracy
  //   // avgtime
  //   // totalTime

  //   // newCampaignData2 updates
  //   // familiar
  //   newCampaignData2.attempts++;
  //   if (correct[1]) newCampaignData2.totalCorrect++;
  //   newCampaignData2.date = newTime;
  //   // accuracy
  //   // avgtime
  //   // totalTime

  //   // newCampaignData3 updates
  //   // familiar
  //   newCampaignData3.attempts++;
  //   if (correct[2]) newCampaignData3.totalCorrect++;
  //   newCampaignData3.date = newTime;
  //   // accuracy
  //   // avgtime
  //   // totalTime

  //   console.log("newCampaignData:", campaignData[exerciseMapped]);
  //   console.log("newCampaignData1 for", answerMapped1 + ":", newCampaignData1);
  //   console.log("newCampaignData2 for", answerMapped2 + ":", newCampaignData2);
  //   console.log("newCampaignData3 for", answerMapped3 + ":", newCampaignData3);

  //   // TODO: update campaignData with newCampaignData 1, 2, & 3
  // };

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        isLoggedIn: isLoggedIn,
        token: token,
        percentage: percentage,
        exercise: exercise,
        answerData: answerData,
        correctAnswers: correctAnswers,
        incorrectAnswers: incorrectAnswers,
        startedDate: startedDate,
        campaignRunning: campaignRunning,
        fromCampagin: fromCampaign,
        schedule: schedule,
        currQuestion: currQuestion,
        numQuestions: numQuestions,
        answersHandler: answersHandler,
        percentageHandler: percentageHandler,
        exerciseHandler: exerciseHandler,
        login: login,
        updateUser: updateUser,
        signup: signup,
        logout: logout,
        verifyEmail: verifyEmail,
        error: error,
        isLoading: isLoading,
        getStatsData: getStatsData,
        statsData: statsData,
        runCampaign: runCampaign,
        createSchedule: createSchedule,
        unlockNextSet: unlockNextSet,
        scheduleComplete: scheduleComplete,
        stopCampaign: stopCampaign,
        resetCampaign: resetCampaign,
        updateStatsDataExercise: updateStatsDataExercise,
        getSchedule: getSchedule,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
