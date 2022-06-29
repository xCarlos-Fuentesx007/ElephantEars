import React, { Fragment, useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Gym = () => {
  const [active, setActive] = useState("");

  const ExerciseButtonGroup = () => {
    const exerciseType = [
      "Intervals",
      "Chords",
      "Scales",
      "Chord Progressions",
      "Pitch",
      "Scale Degrees",
      "Intervals in Context",
      "Melodic Dictation",
    ];

    return (
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 4,
          marginBottom: 4,
          padding: 3,
          marginX: "auto",
        }}
      >
        {exerciseType.map((type) => (
          <Grid item xs={12} md={6} key={type}>
            <Button
              variant={active === type ? "contained" : "outlined"}
              onClick={() => setActive(type)}
              sx={{ width: "90%", bgcolor: active === type ? "" : "white" }}
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
          elevation={1}
          sx={{
            padding: 5,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#E5E5E5",
            borderRadius: "25px",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ width: "70%" }}
          >
            Select an exercise type to practice at your own pace
          </Typography>
          <ExerciseButtonGroup />
          <Link to="/exercise">
            <Button
              size="large"
              variant="contained"
              onClick={() => console.log(active)}
            >
              Hit the Gym
            </Button>
          </Link>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Gym;
