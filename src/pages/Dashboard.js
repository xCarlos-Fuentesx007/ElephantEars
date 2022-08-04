import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

import Navbar from "../components/Navbar";
import CircularProgressBar from "../components/CircularProgressBar";
import { useEffect } from "react";

//getting the stats base url form the env files
const statsUrl = process.env.REACT_APP_BACKEND_STATS_URL;

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const [statsData, setStatsData] = useState();
  const { userData } = authCtx;

  const token = userData.token;

  //variable to find the mastery progress value by using the fetched data
  const masteryValue =
    ((statsData?.intervals?.totalAccuracy +
      statsData?.chords?.totalAccuracy +
      statsData?.scales?.totalAccuracy +
      statsData?.pitch?.totalAccuracy +
      statsData?.chord_progressions?.totalAccuracy +
      statsData?.scale_degrees?.totalAccuracy +
      statsData?.intervals_in_context?.totalAccuracy +
      statsData?.melodic_dictation?.totalAccuracy) /
      800) *
    100;

  //fetching stats data when the component loads or when the token is changed

  useEffect(() => {
    const fetchStatsData = async () => {
      const response = await fetch(`${statsUrl}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setStatsData(data);
    };
    if (token) {
      fetchStatsData();
    }
  }, [token]);

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

          {/* showing spinner if stats data is being fetched */}
          {!statsData && (
            <Container
              sx={{
                height: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Container>
          )}
          {statsData && (
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
                  <h6>{statsData?.sessionsCompleted}</h6>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <h4>Overall accuracy:</h4>
                  <h6>{masteryValue.toFixed(1) + "%"}</h6>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <h4>Total time:</h4>
                  <h6>
                    {statsData?.totalTime === null
                      ? "-"
                      : statsData?.totalTime + " seconds"}
                  </h6>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <h4>Average time/question:</h4>
                  <h6>
                    {statsData?.averageTimePerQuestion === null
                      ? "-"
                      : statsData?.averageTimePerQuestion + " seconds"}
                  </h6>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.intervals?.totalAccuracy} //This will be changed to statsData.intervals.totalAccuracy
                      title="Intervals"
                      color="#6F2DBD"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.chords?.totalAccuracy} //also changed
                      title="Chords"
                      color="#1E96FC"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.scales?.totalAccuracy}
                      title="Scales"
                      color="#00B227"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.pitch?.totalAccuracy}
                      title="Pitch"
                      color="#DA627D"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={masteryValue.toFixed(1)}
                      title="Overall"
                      color="#111"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.chord_progressions?.totalAccuracy}
                      title="Chords Progression"
                      color="#FCA17D"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.scale_degrees?.totalAccuracy}
                      title="Scale Degrees"
                      color="#00B2A8"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={
                        statsData?.intervals_in_context?.totalAccuracy
                      }
                      title="Intervals in Context"
                      color="#EAD637"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CircularProgressBar
                      percentage={statsData?.melodic_dictation?.totalAccuracy}
                      title="Melodic Dictation"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
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
