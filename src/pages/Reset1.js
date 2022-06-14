import React from 'react'
import { Container, Paper, Typography, TextField, Button, /*Alert*/ } from '@mui/material';

// const DisplayErr = (errorCode) => {

//   switch (errorCode) {
//     case 1:
//       return (
//         <Alert severity="severe">
//           Error: Emails do not match
//         </Alert>
//       )
//     case 2:
//       return (
//         <Alert severity="severe">
//           Error: Incorrect Email
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

const Reset1 = () => {
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

          <Typography variant="h4" component="h1" sx={{marginTop: 2}}>
            Reset Password
          </Typography>

          <Typography variant="body1" component="b1" sx={{padding: 2}}>
            Enter the email address for your account and we’ll send you a password reset link.
          </Typography>

          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Container>

          <Container>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cEmail"
              label="Confirm Email"
              name="cEmail"
              autoComplete="confirm email"
            />
          </Container>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 3 }}
          >
            Reset
          </Button>

        </Paper>
    </Container>
  )
}

export default Reset1;