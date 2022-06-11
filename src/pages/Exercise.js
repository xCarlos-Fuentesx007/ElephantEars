import React, { Fragment, useState } from 'react';
import Navbar from '../components/Navbar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

import {Intervals} from '../exercises/toneFunctions';

const Exercise = () => {
  const progress = 76;
  const numAnswers = 4;

  const AnswerButton = () => {
    const [buttonVariant, setButtonVariant] = useState('outlined');
    const [buttonBackground, setButtonBackground] = useState({
      bgcolor: 'white',
    });
    const changeVariant = () => {
      setButtonBackground(
        buttonVariant === 'contained' ? { bgcolor: 'white' } : {}
      );
      setButtonVariant(buttonVariant === 'outlined' ? 'contained' : 'outlined');
    };
    return (
      <Button
        variant={buttonVariant}
        onClick={changeVariant}
        sx={buttonBackground}
      >
        Answer
      </Button>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 3,
            height: '75vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#e7ebf0',
          }}
        >
          <Typography component="h1" variant="h2">
            Interval
          </Typography>
          <IconButton size="large" onClick={Intervals} /*Hard Coded*/>
            <VolumeUpRoundedIcon sx={{ fontSize: '400%' }} />
          </IconButton>
          <Typography component="body1" variant="body1">
            Click to hear exercise again
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
              marginTop: 6,
              padding: 3,
              width: '80%',
              height: '40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              //bgcolor: '#fff',
              //borderRadius: 1,
              //boxShadow: 6,
            }}
          >
            {Array.from(Array(numAnswers)).map((_, index) => (
              <Grid item xs={4} md={3} key={index}>
                <AnswerButton />
              </Grid>
            ))}
            <Grid item xs={11}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography component="body2" variant="body2">
                    {progress}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Exercise;
