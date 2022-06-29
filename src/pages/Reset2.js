import React from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

const DisplayErr = (errorCode) => {
  switch (errorCode) {
    case 0:
      return;
    case 1:
      return <Alert severity="error">Error: Incorrect Code</Alert>;
    default:
      return <Alert severity="error">An unknown error has occurred</Alert>;
  }
};

const Reset2 = () => {
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
        <Typography
          variant="body1"
          component="h1"
          align="center"
          sx={{ padding: 2 }}
        >
          An email has been sent. Enter the included code below to reset your
          password.
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
            sx={{ my: 3 }}
          />
        </Container>

        <Container>
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Confirm
          </Button>
        </Container>

        <Typography
          variant="body2"
          component="h1"
          align="center"
          sx={{ padding: 2 }}
        >
          If you did not receieve an email, click{" "}
          <Link to="/reset1" variant="body2">
            here
          </Link>{" "}
          to send another.
        </Typography>

        {DisplayErr(1)}
      </Paper>
    </Container>
  );
};

export default Reset2;
