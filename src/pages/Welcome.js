import React, { Fragment } from 'react'
import NavWel from "../components/Nav-Welcome"
import Logo from '../img/Logo.PNG'

import {Container, Paper, Typography, Grid} from '@mui/material'

const Welcome = () => {
  return (
    <Fragment>
      <NavWel />

      <Container maxWidth="100%">
        <Paper
          elevation={6}
          sx={{
            //marginTop: 8,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <img src={Logo} class="WelcomeLogo" alt="Logo" />

          <Typography component="h1" variant="h4" sx={{marginTop: 5}}>
            Welcome to Elephant Ears!
          </Typography>

          <Grid
          columns={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{
            marginTop: 7,
            padding: 3,
            width: '85%',
            height: '40%',
          }}
          >
            <Grid item xs>
              <Paper sx={{
                padding: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: '#E5E5E5',
              }}
              >
                <h3>Become a better musician</h3>
                <p>Ever heard of the phrase “Play it by ear”? This amazing skill is achieved through ear training and it is in fact one of the most sought after skills in a person’s repertoire. A person who consistently trains this music skill will increase by leaps and bounds.</p>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{
                padding: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: '#E5E5E5',
              }}
              >
                <h3>How we do it</h3>
                <p>We will serve you a campaign and adjust it based off of your needs using your performance data and inputting it into an advanced algorithm. The campaign will dynamically change automatically so you don’t have to worry about keeping up with your mastery of each skill.</p>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{
                padding: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: '#E5E5E5',
              }}
              >
                <h3>Who we are</h3>
                <p>Created by a team of college musicians from various backgrounds and skill levels to ensure you get the best user experience.</p>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  )
}

export default Welcome;