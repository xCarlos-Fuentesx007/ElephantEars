import React, { Fragment } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

import Navbar from "../components/Navbar";
import { useState } from "react";

const Profile = () => {
  const [exercise, setExercise] = useState("Intervals");
  const handleChange = (e) => {
    setExercise(e.target.value);
  };
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginTop: 4 }}
          textAlign="center"
        >
          Account Page
        </Typography>

        <Grid
          marginY={6}
          container
          spacing={3}
          justifyContent="center"
          paddingX={4}
          sx={{ marginX: "auto" }}
          gap={3}
        >
          <Grid
            item
            xs={12}
            md={5}
            paddingY={8}
            marginX={3}
            sx={{
              bgcolor: "#E5E5E5",
              borderRadius: "25px",
              padding: "25px",
            }}
          >
            <h3 style={{ margin: "20px 0" }}>Overall Stats</h3>
            <div style={{ margin: "10px 0" }}>
              <h5>Sessions completed:</h5>
              <h6>24</h6>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>Overall accuracy:</h5>
              <h6>89%</h6>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>...</h5>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>...</h5>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Divider />
            </div>

            <h3 style={{ margin: "20px 0" }}>Campaign Stats</h3>
            <div style={{ margin: "10px 0" }}>
              <h5>Progress: 12%</h5>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>...</h5>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>...</h5>
            </div>
            <div style={{ margin: "10px 0" }}>
              <h5>...</h5>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            paddingY={8}
            marginX={3}
            sx={{
              bgcolor: "#E5E5E5",
              borderRadius: "25px",
              padding: "25px",
            }}
          >
            <div style={{ margin: "10px 0" }}>
              <FormControl fullWidth>
                <InputLabel id="exercise">Exercise</InputLabel>
                <Select
                  labelId="exercise"
                  id="exercise"
                  value={exercise}
                  label="Exercise"
                  onChange={handleChange}
                >
                  <MenuItem value="Intervals">Intervals</MenuItem>
                  <MenuItem value="Chords">Chords</MenuItem>
                  <MenuItem value="Scales">Scales</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ margin: "30px 0" }}>
              <div style={{ margin: "10px 0" }}>
                <h5>Total Answered</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Total Correct</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Total Accuracy</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Total Time</h5>
              </div>
            </div>
            <div style={{ margin: "30px 0" }}>
              <div style={{ margin: "10px 0" }}>
                <h5>Average Correct</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Average Accuracy</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Average Time</h5>
              </div>
            </div>
            <div style={{ margin: "30px 0" }}>
              <div style={{ margin: "10px 0" }}>
                <h5>Median Correct</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Median Accuracy</h5>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h5>Median Time</h5>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Profile;
