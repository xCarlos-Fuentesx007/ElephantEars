import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import NavbarSimple from "../components/NavbarSimple";

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

// Checks if code is valid and returns an error from DisplayErr if it isn't
function validateCode(code) {
  // get code from database(?)
  // assign to variable dbCode
  // compare with code
    // if equal, reset password and return nothing or DisplayErr(0)
  // if not equal, return DisplayErr(1)
  // console.log('from code')
  return (code === '' || code === undefined) ? DisplayErr(0) : DisplayErr(1);
}

function Confirm() {
  const [code, setCode] = useState();
  const updateCode = () => setCode(() => (document.getElementById('code') === null) ? 0 : document.getElementById("code").value);

  const [error, setError] = useState();
  const makeError = () => setError(() => validateCode(code));

  useEffect(() => {
    makeError();
    console.log(code);
  }, [code]);

  return (
    <Container>
      <Button type="submit" onClick={() => updateCode()} fullWidth variant="contained" sx={{ my: 2 }}>
        Confirm
      </Button>
      {error}
    </Container>
  )
}

const Reset2 = () => {
  return (
    <>
      <NavbarSimple />
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

          {/* <Container>
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Confirm
            </Button>
          </Container> */}
          {Confirm()}

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

          {/* {DisplayErr(1)} */}
        </Paper>
      </Container>
    </>
  );
};

export default Reset2;
