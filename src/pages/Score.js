import React, { useEffect, useState } from "react";
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
    color: "#3479FF",
    icon: <ThumbUpIcon sx={{ color: "#00B227" }} />,
    message: "Keep practicing!",
  },
  {
    id: 1,
    color: "#00B227",
    icon: <CheckCircleIcon sx={{ color: "#00B227" }} />,
    message: "Good job!",
  },
];

const ScoreContainer = ({ onExit }) => {
  const [percentage, setPercentage] = useState(100);
  const [activeData, setActiveData] = useState(data[0]);

  useEffect(() => {
    if (percentage === 100) {
      setActiveData(data[0]);
    } else if (percentage < 60) {
      setActiveData(data[1]);
    } else {
      setActiveData(data[2]);
    }
  }, [percentage]);
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
            text={`${percentage}%`}
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
          Total Correct: 14/14
        </Typography>
        <Typography variant="b1" sx={{ padding: 1 }}>
          Time Spent: 1m 47s
        </Typography>
        <Typography variant="b1" sx={{ padding: 1 }}>
          Avg Time/Question: 7.64s
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
            <Link to="/">
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
