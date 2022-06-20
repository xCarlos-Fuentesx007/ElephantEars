import React, { Fragment } from 'react'
import Navbar from "../components/Navbar"
import { Container, Paper, Typography, Button, Grid } from '@mui/material';

const Settings = () => {
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >

          <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 600}}>
            General Settings
          </Typography>

          <Grid
            columns={12}
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            sx={{
              padding: 3,
            }}
          >
            <Grid item xs={4}>
              First Name
            </Grid>
            <Grid item xs={4}>
              [Name]
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={4}>
              Last Name
            </Grid>
            <Grid item xs={4}>
              [Name]
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={4}>
              Username
            </Grid>
            <Grid item xs={4}>
              [Name]
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={4}>
              Email
            </Grid>
            <Grid item xs={4}>
              [Email]
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Edit
              </Button>
            </Grid>

            <Grid item xs={4}>
              Password
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Change
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{textAlign: 'left', fontWeight: 600}}>
            Progress Settings
          </Typography>

          <Grid
            columns={12}
            container
            direction="row"
            justifyContent="center"
            spacing={3}
            sx={{
              padding: 3,
            }}
          >
            <Grid item xs={4}>
              Reset Campaign Progress
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Reset
              </Button>
            </Grid>

            <Grid item xs={4}>
              Reset Statistics
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Reset
              </Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </Fragment>
  )
}

export default Settings;