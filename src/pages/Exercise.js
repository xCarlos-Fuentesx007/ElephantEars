import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

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

import { Intervals, Perfect_Pitch, Chords, Scales, Scale_Degrees } from "../exercises/toneFunctions";

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
              <Button variant="contained" fullWidth>
                Yes
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

const Exercise = () => {
  const authCtx = useContext(AuthContext);
  const [answer, setAnswer] = useState();

  const [isExitVisible, setIsExitVisible] = useState(false);

  const {
    answerData,
    percentage,
    percentageHandler,
    correctAnswers,
    incorrectAnswers,
    answersHandler,
  } = authCtx;

  const [active, setActive] = useState("");
  const [errorIdx, setErrorIdx] = useState(0);
  const [isAnswerTrue, setIsAnswerTrue] = useState(false);
  const [isAnswerFalse, setIsAnswerFalse] = useState(false);
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  const [cCount, set_continue] = useState(false);
  const [correct, set_correct] = useState(0);

  const [first_note, setFirst_note] = useState(Math.floor(Math.random() * 24));
  const [interval, setInterval] = useState(Math.floor(Math.random() * 12) + 1);
  const [chord_type, set_chord_type] = useState(Math.floor(Math.random() * 7));
  const [scale_type, set_scale_type] = useState(Math.floor(Math.random() * 8));
  var [answer_note, set_answer_note] = useState(Math.floor(Math.random() * 36));

  useEffect(() => {
    if (correctAnswers === 0 && incorrectAnswers === 0) {
      percentageHandler(0);
    } else {
      percentageHandler(
        (correctAnswers / (correctAnswers + incorrectAnswers)) * 100
      );
    }
  }, [correctAnswers, incorrectAnswers, percentageHandler]);

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
    }
  }

  const exerciseHandler = () => {
    if (answerData.name === "Intervals") {
      const answerValue = Intervals(first_note, interval);
      console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Perfect Pitch") {
      const answerValue = Perfect_Pitch(first_note);
      setAnswer(answerValue);
    } else if (answerData.name === "Chords") {
      const answerValue = Chords(first_note, chord_type);
      setAnswer(answerValue);
    } else if (answerData.name === "Scales") {
      const answerValue = Scales(first_note, scale_type);
      console.log(answerValue);
      setAnswer(answerValue);
    } else if (answerData.name === "Scale Degrees") {
      while (answer_note - first_note >= 12 || answer_note - first_note <= -12) { //ensures the answer is within an octave of the starting note
        if (answer_note > first_note) {
          answer_note = answer_note - 12;
        }
        else {
          answer_note = answer_note + 12;
        }
      }
      const answerValue = Scale_Degrees(first_note, answer_note);
      console.log(answerValue);
      setAnswer(answerValue);
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
              disabled={ (cCount ? true : false) && !(type === active)}
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

  return (
    <Fragment>
      <Navbar />
      {!isExitVisible && (
        <Container maxWidth="md">
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
            <IconButton 
              size="large" 
              onClick={exerciseHandler}>
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
                <AnswerButtonGroup />
              </Grid>
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
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Container>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      {DisplayErr(errorIdx, answer)}
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
                          if (cCount === false) {
                            if (answer === active) {
                              answersHandler(
                                correctAnswers + 1,
                                incorrectAnswers
                              );
                              setErrorIdx(1);
                              setIsAnswerTrue(true);
                              set_correct(1);
                            } else {
                              answersHandler(
                                correctAnswers,
                                incorrectAnswers + 1
                              );
                              setErrorIdx(2);
                              setIsAnswerFalse(true);
                              set_correct(0);
                            }
                            setIsSoundPlayed(false);
                            set_continue(true);
                          } else {
                            exerciseMaker();
                            set_continue(false);
                            setIsAnswerFalse(false);
                            setIsAnswerTrue(false);
                            setActive(undefined);
                            setErrorIdx(0);
                          }
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
