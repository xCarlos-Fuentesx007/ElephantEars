import React from 'react';

import Button from '@mui/material/Button';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const AnswerFeedback = (props) => {
  // hard-coded data
  const correctAnswer = props.correctAnswer;
  const chosenAnswer = props.chosenAnswer;

  if (chosenAnswer === correctAnswer) {
    // correct answer
    return (
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item>
          <CheckBoxOutlinedIcon sx={{ color: '#00B227', fontSize: '500%' }} />
        </Grid>
        <Grid item container xs={6} direction="column">
          <Grid item>
            <Typography variant="h4" sx={{ color: '#00B227' }}>
              Nice job!
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained">
            Continue
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    // wrong answer
    return (
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item>
          <CancelOutlinedIcon sx={{ color: 'red', fontSize: '500%' }} />
        </Grid>
        <Grid item container xs={6} direction="column">
          <Grid item>
            <Typography variant="h5" sx={{ color: 'red' }}>
              Correct Answer: {correctAnswer}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body">Try listening again.</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained">
            Continue
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default AnswerFeedback;
