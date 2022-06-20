import React from 'react'
import { Container, Paper, Typography, TextField, Button, Alert, Link } from '@mui/material';
//import { Link } from 'react-router-dom';

const DisplayErr = (errorCode) => {

  switch (errorCode) {
    case 0:
      return
    case 1:
      return (
        <Alert severity="error">
          Error: Incorrect Code
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

const Reset2 = () => {
  return (
    <Container maxWidth="xs">
      <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            //bgcolor: '#E5E5E5',
          }}
        >

          <Typography variant="body1" component="b1" align="center" sx={{padding: 2}}>
            An email has been sent. Enter the included code below to reset your password.
          </Typography>

          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              autoComplete="code"
              autoFocus
              sx={{mt:5, mb:5}}
            />
          </Container>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
          >
            Confirm
          </Button>

          <Typography variant="body2" component="b1" align="center" sx={{padding: 2}}>
            If you did not receieve an email, click <Link href="/reset2" variant="body2">here</Link> to send another.
          </Typography>

          {DisplayErr(1)}

        </Paper>
    </Container>
  )
}

export default Reset2;