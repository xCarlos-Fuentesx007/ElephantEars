import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { Container, Paper, Typography, Button, Grid } from '@mui/material';

import Navbar from '../components/Navbar';
import CircularProgressBar from '../components/CircularProgressBar';

const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#E5E5E5',
            borderRadius: '25px',
          }}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{ marginTop: 4, marginBottom: 8 }}
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
                bgcolor: '#fff',
                opacity: '.8',
                borderRadius: '25px',
                boxShadow: '2px 2px 10px grey',
              }}
            >
              <h3
                style={{
                  marginTop: '20px',
                  marginBottom: '40px',
                  fontSize: '40px',
                }}
              >
                Lifetime Stats
              </h3>
              <div style={{ margin: '10px 0' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  Sessions completed:
                </h5>
                <h6>24</h6>
              </div>
              <div style={{ margin: '10px 0' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  Overall accuracy:
                </h5>
                <h6>89%</h6>
              </div>
              <div style={{ margin: '10px 0' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  Total time:
                </h5>
                <h6>4hr 34m 22s</h6>
              </div>
              <div style={{ margin: '10px 0' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: '25px' }}>
                  Average time/question:
                </h5>
                <h6>10.02s</h6>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="80"
                    title="Intervals"
                    color="#6F2DBD"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="73"
                    title="Chords"
                    color="#1E96FC"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="85"
                    title="Scales"
                    color="#006937"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="40"
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
                    percentage="42"
                    title="Chords Progression"
                    color="#FF6D33"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="25"
                    title="Scale Degrees"
                    color="#00867E"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="37"
                    title="Intervals in Context"
                    color="#FF004D"
                  />
                </Grid>
                <Grid item xs={4}>
                  <CircularProgressBar
                    percentage="13"
                    title="Melodic Dictation"
                    color="#9D70FF"
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
