import React, { Fragment, useState, useContext } from 'react';

import { AuthContext } from '../context/auth-context';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import { Note } from '../exercises/pianoSounds/pianoSounds';

const Gym = () => {
  const authCtx = useContext(AuthContext);

  const { exerciseHandler } = authCtx;

  const [active, setActive] = useState();

  const ExerciseButtonGroup = () => {
    const exerciseType = [
      'Intervals',
      'Chords',
      'Scales',
      'Chord Progressions',
      'Perfect Pitch',
      'Scale Degrees',
      'Intervals In Context',
      'Melodic Dictation',
    ];

    return (
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 4,
          marginBottom: 4,
          padding: 3,
          marginX: 'auto',
        }}
      >
        {exerciseType.map((type) => (
          <Grid item xs={12} md={6} key={type}>
            <Button
              variant={active === type ? 'contained' : 'outlined'}
              onClick={() => {
                exerciseHandler(type);
                setActive(type);
              }}
              sx={{
                width: '90%',
                bgcolor: active === type ? '' : 'white',
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
      <Container maxWidth="md">
        <Paper
          elevation={1}
          sx={{
            padding: 5,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#E5E5E5',
            borderRadius: '25px',
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ width: '70%' }}
          >
            Select an exercise type to practice at your own pace
          </Typography>
          <ExerciseButtonGroup />
          {!active && (
            <Button size="large" variant="contained" disabled>
              Hit the Gym
            </Button>
          )}
          {active && (
            <Link to="/exercise" onClick={()=>{Note.setAudioContext();}}>
              <Button size="large" variant="contained">
                Hit the Gym
              </Button>
            </Link>
          )}
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Gym;
