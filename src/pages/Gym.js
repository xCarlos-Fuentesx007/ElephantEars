import React, { Fragment, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Gym = () => {
  const [active, setActive] = useState('');

  const ExerciseButtonGroup = () => {
    const exerciseType = [
      'Intervals',
      'Chords',
      'Scales',
      'Chord Progressions',
      'Pitch',
      'Scale Degrees',
      'Intervals in Context',
      'Melodic Dictation',
    ];

    return (
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 4,
          marginBottom: 4,
          marginLeft: 2,
          padding: 3,
          height: '40%',
          width: '80%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {exerciseType.map((type) => (
          <Grid item xs={6}>
            <Button
              variant={active === type ? 'contained' : 'outlined'}
              onClick={() => setActive(type)}
              sx={{ width: '90%', bgcolor: active === type ? '' : 'white' }}
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
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            height: '65vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#e7ebf0',
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
          <Button
            size="large"
            variant="contained"
            onClick={() => console.log(active)}
          >
            Hit the Gym
          </Button>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Gym;
