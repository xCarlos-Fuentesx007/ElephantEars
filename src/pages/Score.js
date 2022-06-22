import React from 'react'
import { Container, Paper, Typography, Button, Grid, IconButton } from '@mui/material';
import Facebook from "../img/Facebook.png";
import Instagram from "../img/Instagram.png";
import Twitter from "../img/Twitter.png";

const Score = () => {
  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
        }}
      >

        <Typography variant="h4" sx={{fontWeight:600}}>
          Final Score:
        </Typography>

        <Typography variant="b1" sx={{padding:5}}>
          Put graph here
        </Typography>

        <Typography variant="b1" sx={{padding:1}}>
          Total Correct: 14/14
        </Typography>
        <Typography variant="b1" sx={{padding:1}}>
          Time Spent: 1m 47s
        </Typography>
        <Typography variant="b1" sx={{padding:1}}>
          Avg Time/Question: 7.64s
        </Typography>
        
        <Button
          variant="contained"
          href="/dashboard"
          sx={{margin:3, width:"45%"}}
        >
          Home
        </Button>

        <Grid
          columns={12}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs="auto">
            Share your results: 
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Facebook">
              <img src={Facebook} alt=""></img>
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Twitter">
              <img src={Twitter} alt=""></img>
            </IconButton>
          </Grid>
          <Grid item xs="auto">
            <IconButton aria-label="Instagram">
              <img src={Instagram} alt=""></img>
            </IconButton>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  )
}

export default Score;