import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import NavbarSimple from "../components/NavbarSimple";

const DisplayErr = (errorCode) => {
  switch (errorCode) {
    case 0:
      return;
    case 1:
      return <Alert severity="error">Error: Emails do not match</Alert>;
    case 2:
      return <Alert severity="error">Error: Incorrect Email</Alert>;
    case 3:
      return <Alert severity="error">Error: Your email is not properly formatted</Alert>;
    default:
      return <Alert severity="error">An unknown error has occurred</Alert>;
  }
};

function Reset() {
  const [email, setEmail] = useState('');
  const update1 = () => setEmail(() => (document.getElementById('email') === null) ? '' : document.getElementById("email").value);

  const [cEmail, setCEmail] = useState('');
  const update2 = () => setCEmail(() => (document.getElementById('cEmail') === null) ? '' : document.getElementById("cEmail").value);

  const update = () => {update1(); update2()};

  const [error, setError] = useState();
  const makeError = () => setError(() => validateEmails(email, cEmail))

  useEffect(() => {
    makeError();
  }, [email, cEmail]);

  return (
    <Container>
      <Button type="submit" onClick={() => update()} fullWidth variant="contained" sx={{ my: 3 }}>
        Reset
      </Button>
      {error}
    </Container>
  )
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function validateEmails(email, cEmail) {

  // Guard condition
  if (email === '' && cEmail === '') return;

  // Are these valid email addresses?
  if (!validateEmail(email)) {
    // console.log(`${email} is not a valid email address`);
    return DisplayErr(3);
  }

  if (!validateEmail(cEmail)) {
    // console.log(`${cEmail} is not a valid email address`);
    return DisplayErr(3);
  }

  // Are the two emails equal?
  if (email !== cEmail) {
    // console.log('They are not equal');
    return DisplayErr(1);
  }

  // console.log('They are equal');
}

const Reset1 = () => {
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
          <Typography variant="h4" component="h1" sx={{ marginTop: 2 }}>
            Reset Password
          </Typography>

          <Typography variant="body1" component="h1" sx={{ padding: 2 }}>
            Enter the email address for your account and we’ll send you a
            password reset link.
          </Typography>

          {/* Textbox to enter email */}
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

          {/* Textbox to enter email again to confirm */}
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
          {Reset()}
        </Paper>
      </Container>
    </>
  );
};

export default Reset1;
