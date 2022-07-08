import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from "../context/auth-context";

import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Facebook from "../img/Facebook.png";
import Instagram from "../img/Instagram.png";
import Twitter from "../img/Twitter.png";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    color: "#FFCE31",
    icon: <StarIcon sx={{ color: "#FFCE31" }} />,
    message: "Perfection!",
  },

  {
    id: 2,
    color: "#00B227",
    icon: <CheckCircleIcon sx={{ color: "#00B227" }} />,
    message: "Good job!",
  },
  {
    id: 3,
    color: "#3479FF",
    icon: <ThumbUpIcon sx={{ color: "#00B227" }} />,
    message: "Keep practicing!",
  },
];

const ScoreContainer = ({ onExit }) => {
  const authCtx = useContext(AuthContext);

  const { percentage, correctAnswers, incorrectAnswers, startedDate } = authCtx;

  const [activeData, setActiveData] = useState(data[0]);
  const [timeSpent, setTimeSpent] = useState();
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState();

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Days";
  }

  useEffect(() => {
    const date = new Date();
    const totalTime = date.getTime() - startedDate.getTime();
    setTimeSpent(msToTime(totalTime));
    if (correctAnswers === 0 && incorrectAnswers === 0) {
      setTimeSpentPerQuestion(msToTime(totalTime));
    } else {
      setTimeSpentPerQuestion(
        msToTime(totalTime / (correctAnswers + incorrectAnswers))
      );
    }

    if (percentage === 100) {
      setActiveData(data[0]);
    } else if (percentage >= 80) {
      setActiveData(data[1]);
    } else {
      setActiveData(data[2]);
    }
  }, [percentage, startedDate, correctAnswers, incorrectAnswers]);
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#E5E5E5",
          borderRadius: "25px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Final Score:
        </Typography>

        <div
          style={{ height: 100, width: 100, margin: "auto", marginTop: "20px" }}
        >
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(1)}%`}
            strokeWidth={12}
            styles={buildStyles({
              textColor: "#111",
              pathColor: activeData.color,
            })}
          />
        </div>
        <Grid container alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="body1" component="h1" textAlign="center" my={1}>
            {activeData.message}
          </Typography>
          {activeData.icon}
        </Grid>

        <Typography variant="b1" sx={{ padding: 1 }}>
          Total Correct: {correctAnswers}/{correctAnswers + incorrectAnswers}
        </Typography>
        <Typography variant="b1" sx={{ padding: 1 }}>
          Time Spent: {timeSpent}
        </Typography>
        <Typography variant="b1" sx={{ padding: 1 }}>
          Avg Time/Question: {timeSpentPerQuestion}
        </Typography>

        <Button
          variant="contained"
          sx={{ margin: 3, width: "45%" }}
          onClick={onExit}
        >
          Exit
        </Button>

        <Grid
          columns={12}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs="auto">
            Share your results:
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Facebook">
              <img src={Facebook} alt=""></img>
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Twitter">
              <img src={Twitter} alt=""></img>
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Instagram">
              <img src={Instagram} alt=""></img>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
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
            <Link to="/gym">
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

const Score = () => {
  const [isExitVisible, setIsExitVisible] = useState(false);

  return (
    <>
      {!isExitVisible && (
        <ScoreContainer
          onExit={() => {
            setIsExitVisible(true);
          }}
        />
      )}
      {isExitVisible && (
        <ExitContainer
          onCancel={() => {
            setIsExitVisible(false);
          }}
        />
      )}
    </>
  );
};

export default Score;
