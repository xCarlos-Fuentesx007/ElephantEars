import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const DisplayErr = (errorCode) => {
  switch (errorCode) {
    case 0:
      return;
    case 1:
      return <Alert severity="error">Error: Emails do not match</Alert>;
    case 2:
      return <Alert severity="error">Error: Incorrect Email</Alert>;
    default:
      return <Alert severity="error">An unknown error has occurred</Alert>;
  }
};

const Reset1 = () => {
  return (
    <Container maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#E5E5E5",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ marginTop: 2 }}>
          Reset Password
        </Typography>

        <Typography variant="body1" component="h1" sx={{ padding: 2 }}>
          Enter the email address for your account and we’ll send you a password
          reset link.
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
        <Container>
          <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
            Reset
          </Button>
        </Container>
        {DisplayErr(1)}
      </Paper>
    </Container>
  );
};

export default Reset1;
