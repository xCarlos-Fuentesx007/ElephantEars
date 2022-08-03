import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import Navbar from "../components/Navbar";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";

import correctImg from "../img/correct.svg";
import incorrectImg from "../img/incorrect.svg";

import { Howl } from "howler";
import Correct from "../audio/correct.mp3";
import Wrong from "../audio/wrong.mp3";

import {
  Intervals,
  Perfect_Pitch,
  Chords,
  Scales,
  Scale_Degrees,
  Chord_Progressions,
  Intervals_In_Context,
  Melodic_Dictation,
} from "../exercises/toneFunctions";

import { stopAll } from "../exercises/pianoSounds/pianoSounds";
export const DEMO = true; // Use for console logging answers during demo.

const sfx = {
  correct: new Howl({
    src: Correct,
  }),
  wrong: new Howl({
    src: Wrong,
  }),
};

const DisplayErr = (errorCode, correctOption) => {
  switch (errorCode) {
    case 0:
      return;
    case 1:
      return (
        <Grid container alignItems="center" gap={3}>
          <img src={correctImg} alt="" />
          <Typography
            component="h1"
            variant="body1"
            style={{ color: "#00B227" }}
          >
            Nice job!
          </Typography>
        </Grid>
      );
    case 2:
      return (
        <Grid container alignItems="center" gap={3}>
          <img src={incorrectImg} alt="" />
          <Grid item>
            <Typography component="h1" variant="body1" style={{ color: "red" }}>
              Correct Answer: {correctOption}
            </Typography>
            <Typography component="h1" variant="body1">
              Try listening again
            </Typography>
          </Grid>
        </Grid>
      );
    default:
      return (
        <Typography component="h1" variant="body1">
          Click to hear exercise again
        </Typography>
      );
  }
};

const ExitContainer = ({ onCancel }) => {
  const authCtx = useContext(AuthContext);
  const { stopCampaign } = authCtx;
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        sx={{
          marginTop: 8,
          padding: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#E5E5E5",
          borderRadius: "25px",
        }}
      >
        <Typography variant="h3" textAlign="center">
          Are you sure you want to quit?
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          gap={2}
          sx={{ marginY: 5 }}
        >
          <Grid item xs={5}>
            <Button
              variant="contained"
              color="inherit"
              sx={{ backgroundColor: "#fff" }}
              fullWidth
              onClick={onCancel}
            >
              No
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Link to="/score">
              <Button
                variant="contained"
                fullWidth
                onClick={() => stopCampaign()}
              >
                Yes
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

function getDistinctNumbers(n, max=12) {
  let distinctNumbers = [];
  for (let i = 0; i < n; i++) {
    let nextNumber = Math.floor(Math.random() * max);
    while(distinctNumbers.includes(nextNumber)) {
      nextNumber = Math.floor(Math.random() * max);
    }
    distinctNumbers.push(nextNumber);
  }
  return distinctNumbers;
}

const Exercise = () => {
  const authCtx = useContext(AuthContext);
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState([]);

  const [isExitVisible, setIsExitVisible] = useState(false);
  let navigate = useNavigate();

  const {
    answerData,
    percentage,
    percentageHandler,
    correctAnswers,
    incorrectAnswers,
    currQuestion,
    numQuestions,
    answersHandler,
    campaignRunning,
    runCampaign,
    stopCampaign,
    schedule,
    updateCampaignData,
    updateCampaignDataMulti,
  } = authCtx;

  const [active, setActive] = useState("");
  const [multiActive, setMultiActive] = useState(["", "", ""]);
  const [errorIdx, setErrorIdx] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState(false);
  const [isAnswerFalse, setIsAnswerFalse] = useState(false);
  const [isMultiAnswerTrue, setIsMultiAnswerTrue] = useState([
    false,
    false,
    false,
  ]);
  const [isMultiAnswerFalse, setIsMultiAnswerFalse] = useState([
    false,
    false,
    false,
  ]);
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  const [clickCount, set_continue] = useState(false);

  const [first_note, setFirst_note] = useState(Math.floor(Math.random() * 24));
  const [first_noteV2, setFirst_noteV2] = useState(
    Math.floor(Math.random() * 12)
  );
  const [interval, setInterval] = useState(Math.floor(Math.random() * 12) + 1);
  const [chord_type, set_chord_type] = useState(Math.floor(Math.random() * 7));
  const [scale_type, set_scale_type] = useState(Math.floor(Math.random() * 8));
  var [answer_note, set_answer_note] = useState(Math.floor(Math.random() * 36));
  const [progression_types, set_progression_types] = useState([
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ]);
  const [context_num1, set_context_num1] = useState(
    Math.floor(Math.random() * 12)
  );
  const [context_num2, set_context_num2] = useState(
    Math.floor(Math.random() * 12)
  );
  const [melodic_num, set_melodic_num] = useState(
    Math.floor(Math.random() * 12)
  );

  useEffect(() => {
    if (correctAnswers === 0 && incorrectAnswers === 0) {
      percentageHandler(0);
    } else {
      percentageHandler((currQuestion / numQuestions) * 100);
    }
  }, [
    correctAnswers,
    incorrectAnswers,
    percentageHandler,
    currQuestion,
    numQuestions,
  ]);

  const exerciseMaker = () => {
    if (answerData.name === "Intervals") {
      setFirst_note(Math.floor(Math.random() * 24));
      setInterval(Math.floor(Math.random() * 12) + 1);
      return;
    } else if (answerData.name === "Chords") {
      setFirst_note(Math.floor(Math.random() * 24));
      set_chord_type(Math.floor(Math.random() * 7));
      return;
    } else if (answerData.name === "Perfect Pitch") {
      setFirst_note(Math.floor(Math.random() * 36));
      return;
    } else if (answerData.name === "Scales") {
      setFirst_note(Math.floor(Math.random() * 24));
      set_scale_type(Math.floor(Math.random() * 8));
      return;
    } else if (answerData.name === "Scale Degrees") {
      setFirst_note(Math.floor(Math.random() * 24));
      set_answer_note(Math.floor(Math.random() * 36));
      return;
    } else if (answerData.name === "Chord Progressions") {
      setFirst_noteV2(Math.floor(Math.random() * 12));
      set_progression_types([
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
        Math.floor(Math.random() * 6),
      ]);
      return;
    } else if (answerData.name === "Intervals In Context") {
      setFirst_noteV2(Math.floor(Math.random() * 12));
      // Todo: find other places where this error occurs and create a getDistinctNotes() function to fix it.
      // let cn1 = Math.floor(Math.random() * 12);
      // let cn2 = Math.floor(Math.random() * 12);
      // while (cn1 === cn2) {
      //   cn2 = Math.floor(Math.random() * 12);
      // }
      let [cn1, cn2] = getDistinctNumbers(2);
      set_context_num1(cn1);
      set_context_num2(cn2);
      return;
    } else if (answerData.name === "Melodic Dictation") {
      setFirst_noteV2(Math.floor(Math.random() * 12));
      set_context_num1(Math.floor(Math.random() * 12));
      set_context_num2(Math.floor(Math.random() * 12));
      set_melodic_num(Math.floor(Math.random() * 12));
      return;
    }
  };

  const exerciseHandler = () => {
    if (answerData.name === "Intervals") {
      const answerValue = Intervals(first_note, interval);
      if (DEMO) console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Perfect Pitch") {
      const answerValue = Perfect_Pitch(first_note);
      if (DEMO) console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Chords") {
      const answerValue = Chords(first_note, chord_type);
      if (DEMO) console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Scales") {
      const answerValue = Scales(first_note, scale_type);
      if (DEMO) console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Scale Degrees") {
      while (
        answer_note - first_note >= 12 ||
        answer_note - first_note <= -12
      ) {
        //ensures the answer is within an octave of the starting note
        if (answer_note > first_note) {
          answer_note = answer_note - 12;
        } else {
          answer_note = answer_note + 12;
        }
      }
      const answerValue = Scale_Degrees(first_note, answer_note);
      if (DEMO) console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Chord Progressions") {
      const answerValue = Chord_Progressions(first_noteV2, progression_types);
      console.log(answerValue);
      setAnswers(answerValue);
    } else if (answerData.name === "Intervals In Context") {
      const answerValue = Intervals_In_Context(
        first_noteV2,
        context_num1,
        context_num2
      );
      console.log(answerValue);
      setAnswers(answerValue);
    } else if (answerData.name === "Melodic Dictation") {
      const answerValue = Melodic_Dictation(
        first_noteV2,
        context_num1,
        context_num2,
        melodic_num
      );
      console.log(answerValue);
      setAnswers(answerValue);
    }
    setIsSoundPlayed(true);
  };

  const AnswerButtonGroup = () => {
    const answers = answerData.answers;

    return (
      <Grid
        container
        spacing={3}
        sx={{
          padding: 3,
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {answers.map((type) => (
          <Grid item xs={4} md={3} key={type}>
            <Button
              variant={active === type ? "contained" : "outlined"}
              disabled={(clickCount ? true : false) && !(type === active)}
              onClick={() => {
                if (isSoundPlayed) {
                  setActive(type);
                  setIsAnswerFalse(false);
                  setIsAnswerTrue(false);
                }
              }}
              sx={{
                width: "100%",
                bgcolor:
                  active === type
                    ? isAnswerTrue
                      ? "green"
                      : "" || isAnswerFalse
                      ? "red"
                      : ""
                    : "white",
              }}
            >
              {type}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  const updateMultiAnswers = (index, answer) => {
    const newAnswers = [...multiActive];
    newAnswers[index] = answer;
    setMultiActive(newAnswers);
  };

  const ChordProgAnswerButtonGroup = () => {
    const answers = answerData.answers;
    return (
      <Grid
        container
        columns={14}
        spacing={3}
        sx={{
          padding: 3,
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <Typography variant="body1">Chord 1:</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" sx={{ width: "100%" }}>
            I
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1">
            This is the first chord you heard and will always be the tonic
            chord.
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1">Chord 2:</Typography>
        </Grid>
        {answers.map((type) => (
          <Grid item xs={2} key={type}>
            <Button
              variant={multiActive[0] === type ? "contained" : "outlined"}
              disabled={
                (clickCount ? true : false) && !(type === multiActive[0])
              }
              onClick={() => {
                if (isSoundPlayed) {
                  updateMultiAnswers(0, type);
                  setIsMultiAnswerFalse([false, false, false]);
                  setIsMultiAnswerTrue([false, false, false]);
                }
              }}
              sx={{
                textTransform: "none",
                width: "100%",
                bgcolor:
                  multiActive[0] === type
                    ? isMultiAnswerTrue[0]
                      ? "green"
                      : "" || isMultiAnswerFalse[0]
                      ? "red"
                      : ""
                    : "white",
              }}
            >
              {type}
            </Button>
          </Grid>
        ))}

        <Grid item xs={2}>
          <Typography variant="body1">Chord 3:</Typography>
        </Grid>
        {answers.map((type) => (
          <Grid item xs={2} key={type}>
            <Button
              variant={multiActive[1] === type ? "contained" : "outlined"}
              disabled={
                (clickCount ? true : false) && !(type === multiActive[1])
              }
              onClick={() => {
                if (isSoundPlayed) {
                  updateMultiAnswers(1, type);
                  setIsMultiAnswerFalse([false, false, false]);
                  setIsMultiAnswerTrue([false, false, false]);
                }
              }}
              sx={{
                textTransform: "none",
                width: "100%",
                bgcolor:
                  multiActive[1] === type
                    ? isMultiAnswerTrue[1]
                      ? "green"
                      : "" || isMultiAnswerFalse[1]
                      ? "red"
                      : ""
                    : "white",
              }}
            >
              {type}
            </Button>
          </Grid>
        ))}

        <Grid item xs={2}>
          <Typography variant="body1">Chord 4:</Typography>
        </Grid>
        {answers.map((type) => (
          <Grid item xs={2} key={type}>
            <Button
              variant={multiActive[2] === type ? "contained" : "outlined"}
              disabled={
                (clickCount ? true : false) && !(type === multiActive[2])
              }
              onClick={() => {
                if (isSoundPlayed) {
                  updateMultiAnswers(2, type);
                  setIsMultiAnswerFalse([false, false, false]);
                  setIsMultiAnswerTrue([false, false, false]);
                }
              }}
              sx={{
                textTransform: "none",
                width: "100%",
                bgcolor:
                  multiActive[2] === type
                    ? isMultiAnswerTrue[2]
                      ? "green"
                      : "" || isMultiAnswerFalse[2]
                      ? "red"
                      : ""
                    : "white",
              }}
            >
              {type}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  const IntervalsInContextAnswerButtonGroup = () => {
    const answers = answerData.answers;
    var answers2;

    if (answerData.name === "Intervals In Context") {
      answers2 = answerData.answers2;
    } else {
      answers2 = answers;
    }

    return (
      <Grid
        container
        columns={14}
        spacing={3}
        sx={{
          padding: 3,
          height: "50%",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid item xs={2}>
          <Typography variant="body1">Note 1:</Typography>
        </Grid>

        <Grid container item columns={12}>
          {answers.map((type) => (
            <Grid item xs={2} key={type}>
              <Button
                variant={multiActive[0] === type ? "contained" : "outlined"}
                disabled={
                  (clickCount ? true : false) && !(type === multiActive[0])
                }
                onClick={() => {
                  if (isSoundPlayed) {
                    updateMultiAnswers(0, type);
                    setIsMultiAnswerFalse([false, false, false]);
                    setIsMultiAnswerTrue([false, false, false]);
                  }
                }}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  bgcolor:
                    multiActive[0] === type
                      ? isMultiAnswerTrue[0]
                        ? "green"
                        : "" || isMultiAnswerFalse[0]
                        ? "red"
                        : ""
                      : "white",
                }}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1">Note 2:</Typography>
        </Grid>

        <Grid container item columns={12}>
          {answers.map((type) => (
            <Grid item xs={2} key={type}>
              <Button
                variant={multiActive[1] === type ? "contained" : "outlined"}
                disabled={
                  (clickCount ? true : false) && !(type === multiActive[1])
                }
                onClick={() => {
                  if (isSoundPlayed) {
                    updateMultiAnswers(1, type);
                    setIsMultiAnswerFalse([false, false, false]);
                    setIsMultiAnswerTrue([false, false, false]);
                  }
                }}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  bgcolor:
                    multiActive[1] === type
                      ? isMultiAnswerTrue[1]
                        ? "green"
                        : "" || isMultiAnswerFalse[1]
                        ? "red"
                        : ""
                      : "white",
                }}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={2}>
          {answerData.name === "Intervals In Context" ? (
            <Typography variant="body1">Interval:</Typography>
          ) : (
            <Typography variant="body1">Note 3:</Typography>
          )}
        </Grid>

        <Grid container item columns={12}>
          {answers2.map((type) => (
            <Grid item xs={2} key={type}>
              <Button
                variant={multiActive[2] === type ? "contained" : "outlined"}
                disabled={
                  (clickCount ? true : false) && !(type === multiActive[2])
                }
                onClick={() => {
                  if (isSoundPlayed) {
                    updateMultiAnswers(2, type);
                    setIsMultiAnswerFalse([false, false, false]);
                    setIsMultiAnswerTrue([false, false, false]);
                  }
                }}
                sx={{
                  textTransform: "none",
                  width: "100%",
                  bgcolor:
                    multiActive[2] === type
                      ? isMultiAnswerTrue[2]
                        ? "green"
                        : "" || isMultiAnswerFalse[2]
                        ? "red"
                        : ""
                      : "white",
                }}
              >
                {type}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Fragment>
      {!isExitVisible && (
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h3"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {campaignRunning ? "Campaign" : "Gym"}
          </Typography>
          <Paper
            elevation={2}
            sx={{
              marginTop: 4,
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "#E5E5E5",
              borderRadius: "25px",
              position: "relative",
            }}
          >
            <Typography component="h1" variant="h4">
              {answerData.name}
            </Typography>

            <IconButton
              size="large"
              sx={{ position: "absolute", top: "30px", right: "30px" }}
              onClick={() => {
                setIsExitVisible(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="red"
                className="bi bi-stop-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z" />
              </svg>
            </IconButton>
            <IconButton size="large" onClick={exerciseHandler}>
              <VolumeUpRoundedIcon sx={{ fontSize: "400%" }} />
            </IconButton>
            <Typography component="h1" variant="body1">
              Click to hear exercise again
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                width: "100%",
                height: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12}>
                {answerData.name === "Chord Progressions" ? (
                  <ChordProgAnswerButtonGroup />
                ) : answerData.name === "Intervals In Context" ? (
                  <IntervalsInContextAnswerButtonGroup />
                ) : answerData.name === "Melodic Dictation" ? (
                  <IntervalsInContextAnswerButtonGroup />
                ) : (
                  <AnswerButtonGroup />
                )}
              </Grid>
              {campaignRunning ? (
                <Grid item xs={11}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 15,
                          borderRadius: 5,
                          backgroundColor: "#C4C4C4 ",
                          "& .MuiLinearProgress-barColorPrimary": {
                            backgroundColor: "#00B227",
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography component="h1" variant="body2">
                        {percentage.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ) : null}

              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Container>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      {answerData.name === "Chord Progressions" ||
                      answerData.name === "Intervals In Context" ||
                      answerData.name === "Melodic Dictation"
                        ? DisplayErr(errorIdx, answers.join(", "))
                        : DisplayErr(errorIdx, answer)}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ paddingX: 2 }}
                    >
                      <Button
                        sx={{ margin: "0 16px" }}
                        size="large"
                        variant="contained"
                        onClick={() => {
                          setIsExitVisible(true);
                        }}
                      >
                        End Quiz
                      </Button>
                      <Button
                        size="large"
                        variant="contained"
                        // disabled={!isSoundPlayed ? true : false}
                        onClick={() => {
                          if (campaignRunning && !clickCount) {
                            schedule.dequeue();
                          }
                          if (
                            answerData.name === "Chord Progressions" ||
                            answerData.name === "Intervals In Context" ||
                            answerData.name === "Melodic Dictation"
                          ) {
                            if (clickCount === false) {
                              if (
                                answers[0] === multiActive[0] &&
                                answers[1] === multiActive[1] &&
                                answers[2] === multiActive[2]
                              ) {
                                sfx.correct.play();
                                answersHandler(
                                  correctAnswers + 1,
                                  incorrectAnswers
                                );
                                setErrorIdx(1);
                                setIsMultiAnswerTrue([true, true, true]);
                              } else {
                                sfx.wrong.play();
                                answersHandler(
                                  correctAnswers,
                                  incorrectAnswers + 1
                                );
                                setErrorIdx(2);
                                setIsMultiAnswerTrue([
                                  answers[0] === multiActive[0],
                                  answers[1] === multiActive[1],
                                  answers[2] === multiActive[2],
                                ]);
                                setIsMultiAnswerFalse([
                                  answers[0] !== multiActive[0],
                                  answers[1] !== multiActive[1],
                                  answers[2] !== multiActive[2],
                                ]);
                              }
                              setIsSoundPlayed(false);
                              set_continue(true);
                            } else {
                              if (campaignRunning) {
                                updateCampaignDataMulti(
                                  answerData.name,
                                  answers,
                                  isMultiAnswerTrue
                                );
                                if (schedule.isEmpty()) {
                                  stopCampaign();
                                  navigate("/score", { replace: true });
                                } else {
                                  runCampaign();
                                }
                              }
                              exerciseMaker();
                              set_continue(false);
                              setIsMultiAnswerTrue([false, false, false]);
                              setIsMultiAnswerFalse([false, false, false]);
                              setMultiActive([]);
                              setErrorIdx(0);
                            }
                          } else {
                            if (clickCount === false) {
                              if (answer === active) {
                                sfx.correct.play();
                                answersHandler(
                                  correctAnswers + 1,
                                  incorrectAnswers
                                );
                                setErrorIdx(1);
                                setIsAnswerTrue(true);
                              } else {
                                sfx.wrong.play();
                                answersHandler(
                                  correctAnswers,
                                  incorrectAnswers + 1
                                );
                                setErrorIdx(2);
                                setIsAnswerFalse(true);
                              }
                              setIsSoundPlayed(false);
                              set_continue(true);
                            } else {
                              if (campaignRunning) {
                                updateCampaignData(
                                  answerData.name,
                                  answer,
                                  isAnswerTrue
                                );
                                if (schedule.isEmpty()) {
                                  stopCampaign();
                                  navigate("/score", { replace: true });
                                } else {
                                  runCampaign();
                                }
                              }
                              exerciseMaker();
                              set_continue(false);
                              setIsAnswerFalse(false);
                              setIsAnswerTrue(false);
                              setActive(undefined);
                              setErrorIdx(0);
                            }
                          }
                          stopAll();
                        }}
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
      {isExitVisible && (
        <ExitContainer
          onCancel={() => {
            setIsExitVisible(false);
          }}
        />
      )}
    </Fragment>
  );
};

export default Exercise;
