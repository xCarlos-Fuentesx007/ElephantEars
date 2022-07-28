import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";

import Navbar from "../components/Navbar";
import CircularProgressBar from "../components/CircularProgressBar";

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const { userData, getStatsData, statsData } = authCtx;

  const [intervals_data, set_intervals_data] = useState("err");
  const [chords_data, set_chords_data] = useState("err");
  const [scales_data, set_scales_data] = useState("err");
  const [pitch_data, set_pitch_data] = useState("err");
  const [chord_progression_data, set_chord_progression_data] = useState("err");
  const [scale_degree_data, set_scale_degree_data] = useState("err");
  const [IIC_data, set_IIC_data] = useState("err");
  const [melodic_dictation_data, set_melodic_dictation_data] = useState("err");

  const LoadData = async () => {
    const data = await getStatsData(userData)
    set_intervals_data(data.intervals)
    set_chords_data(data.chords)
    set_scales_data(data.scales)
    set_pitch_data(data.pitch)
    set_chord_progression_data(data.chord_progressions)
    set_scale_degree_data(data.scale_degrees)
    set_IIC_data(data.intervals_in_context)
    set_melodic_dictation_data(data.melodic_dictation)
    
    return;
  };

  const Button1 = () => {
    return (
      <Button
        variant="contained"
        onClick={() => {
          LoadData();
        }}
      >
        Pull Data
      </Button>
    );
  };

  const Button2 = () => {
    return (
      <Button
        variant="contained"
        onClick={() => {
          console.log(statsData)
        }}
      >
        s Data
      </Button>
    )
  }

  return (
    <Fragment>
      <Navbar />
      <Button1 />
      <Button2 />
      <Container>
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginTop: 4 }}
          textAlign="center"
        >
          Welcome {userData.firstname} {userData.lastname}
        </Typography>
        <Paper
          elevation={1}
          sx={{
            marginTop: 4,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#E5E5E5",
            borderRadius: "25px",
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{ marginY: 4 }}
            textAlign="center"
          >
            An overview of your progress
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            paddingX={4}
          >
            <Grid
              item
              xs={12}
              md={6}
              paddingY={8}
              sx={{
                bgcolor: "#fff",
                borderRadius: "25px",
                boxShadow: "1px 1px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h2 style={{ margin: "20px 0" }}>Lifetime Stats</h2>
              <div style={{ margin: "10px 0" }}>
                <h4>Sessions completed:</h4>
                <h6>{statsData.sessionsCompleted}</h6>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h4>Overall accuracy:</h4>
                <h6>{statsData.overallAccuracy}</h6>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h4>Total time:</h4>
                <h6>{statsData.totalTime}</h6>
              </div>
              <div style={{ margin: "10px 0" }}>
                <h4>Average time/question:</h4>
                <h6>{statsData.averageTimePerQuestion}</h6>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={intervals_data.totalAccuracy} //This will be changed to statsData.intervals.totalAccuracy
                    title="Intervals"
                    color="#6F2DBD"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={chords_data.totalAccuracy}  //also changed
                    title="Chords"
                    color="#1E96FC"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={scales_data.totalAccuracy}
                    title="Scales"
                    color="#3DDC97"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={pitch_data.totalAccuracy}
                    title="Pitch"
                    color="#DA627D"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="100"
                    title="Mastery"
                    color="#00B227"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={chord_progression_data.totalAccuracy}
                    title="Chords Progression"
                    color="#FCA17D"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={scale_degree_data.totalAccuracy}
                    title="Scale Degrees"
                    color="#00B2A8"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={IIC_data.totalAccuracy}
                    title="Intervals in Context"
                    color="#EAD637"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage={melodic_dictation_data.totalAccuracy}
                    title="Melodic Dictation"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Link to="/campaign">
                <Button fullWidth variant="contained" sx={{ my: 3 }}>
                  Campaign
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/gym">
                <Button fullWidth variant="contained" sx={{ my: 3 }}>
                  Gym
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
