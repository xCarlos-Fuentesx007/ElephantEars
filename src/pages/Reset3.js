import React from 'react'
import { Container, Paper, Typography, TextField, Button, Grid, Alert } from '@mui/material';

const DisplayErr = (errorCode) => {

  switch (errorCode) {
    case 0:
      return
    case 1:
      return (
        <Alert severity="error">
          Error: Password does not meet complexity requirements
        </Alert>
      )
    case 2:
      return (
        <Alert severity="error">
          Error: Passwords do not match
        </Alert>
      )
    default:
      return (
        <Alert severity="error">
          An unknown error has occurred
        </Alert>
      )
  }
  
}

const Reset3 = () => {
  return (
    <Grid container spacing={5} justifyContent='center' alignItems='baseline'>
      <Grid item xs={2.5}>
        <Paper elevation={6} sx={{
          marginTop: 8,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //bgcolor: '#E5E5E5',
        }}
        >
          <Typography variant="h5" component="h1" sx={{padding: 1}}>
            Password Requirements:
          </Typography>
          <Typography variant="body1" component="b1">
            Between 8-20 characters <br/>
            At least one lower case character <br/>
            At least one upper case character <br/>
            At least one number <br/>
            At least one special symbol
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper elevation={6} sx={{
              marginTop: 8,
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              //bgcolor: '#E5E5E5',
            }}
          >
            <Typography variant="h4" component="h2" sx={{marginTop: 2}}>
              Change Password
            </Typography>

            <Typography variant="body1" component="b2" sx={{padding: 2}}>
              Enter your new password.
            </Typography>

            <Container>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                name="password"
                autoComplete="password"
                autoFocus
              />
            </Container>

            <Container>
              <TextField
                margin="normal"
                required
                fullWidth
                id="cPassword"
                label="Confirm New Password"
                name="cPassword"
                autoComplete="confirm password"
              />
            </Container>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 3 }}
            >
              Confirm
            </Button>

            {DisplayErr(1)}

          </Paper>
      </Grid>
    </Grid>
  )
}

export default Reset3;