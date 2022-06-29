import React, { Fragment, useState } from "react";
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

import { Intervals } from "../exercises/toneFunctions";

const DisplayErr = (errorCode) => {
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
              Correct Answer: Minor 6th
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

const Exercise = () => {
  const progress = 76;

  const [active, setActive] = useState("");
  const [errorIdx, setErrorIdx] = useState(1);

  const AnswerButtonGroup = () => {
    const answers = [
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
          <Grid item xs={4} md={3}>
            <Button
              variant={active === type ? "contained" : "outlined"}
              onClick={() => setActive(type)}
              sx={{ width: "100%", bgcolor: active === type ? "" : "white" }}
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
            Interval
          </Typography>

          <IconButton
            size="large"
            sx={{ position: "absolute", top: "30px", right: "30px" }}
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
          <IconButton size="large" onClick={Intervals} /*Hard Coded*/>
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
                    value={progress}
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
                    {progress}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Container>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    {DisplayErr(errorIdx)}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ paddingX: 2 }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      onClick={() => {
                        if (errorIdx === 1) {
                          setErrorIdx(2);
                        } else {
                          setErrorIdx(1);
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
    </Fragment>
  );
};

export default Exercise;
