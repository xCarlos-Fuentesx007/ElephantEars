import React from 'react'
import { Container, Paper, Typography, TextField, Button, /*Alert*/ } from '@mui/material';

// const DisplayErr = (errorCode) => {

//   switch (errorCode) {
//     case 1:
//       return (
//         <Alert severity="severe">
//           Error: Incorrect Code
//         </Alert>
//       )
//     default:
//       return (
//         <Alert severity="severe">
//           An unknown error has occurred
//         </Alert>
//       )
//   }
  
// }

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
            bgcolor: '#E5E5E5',
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

          <Typography variant="body2" component="b1" align="center" sx={{padding: 2}} /*Needs button on "here" */>
            If you did not receieve an email, click here to send another.
          </Typography>

        </Paper>
    </Container>
  )
}

export default Reset2;