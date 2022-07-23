import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import NavbarSimple from "../components/NavbarSimple";

const DisplayErr = (errorCode) => {
  switch (errorCode) {
    case 0:
      return;
    case 1:
      return (
        <Alert severity="error">
          Error: Password does not meet complexity requirements
        </Alert>
      );
    case 2:
      return <Alert severity="error">Error: Passwords do not match</Alert>;
    default:
      return <Alert severity="error">An unknown error has occurred</Alert>;
  }
};

function Confirm() {
  const [password, setPassword] = useState('');
  const update1 = () => setPassword(() => (document.getElementById('password') === null) ? '' : document.getElementById("password").value);

  const [cPassword, setCPassword] = useState('');
  const update2 = () => setCPassword(() => (document.getElementById('cPassword') === null) ? '' : document.getElementById("cPassword").value);

  const update = () => {update1(); update2()};

  const [error, setError] = useState();
  const makeError = () => setError(() => validatePasswords(password, cPassword))

  useEffect(() => {
    console.log(`confirmed ${password} ${password.length}`)
    makeError();
  }, [password, cPassword]);

  return (
    <Container>
      <Button type="submit" onClick={() => update()} fullWidth variant="contained" sx={{ my: 3 }}>
        Confirm
      </Button>
      {error}
    </Container>
  )
}

function validatePassword(password) {

  // let minLen = String(password)
  //   .match(
  //     /^.{8,20}$/
  //   );

  // let maxLen = String(password)
  // .match(
  //   // /(?=.{1,20})/
  //   /^.{1,20}$/
  // );

  // let hasUpper = String(password)
  // .match(
  //   /(?=.*[A-Z])/
  // );

  // let hasLower = String(password)
  // .match(
  //   /(?=.*[a-z])/
  // );

  // let hasSpecial = String(password)
  // .match(
  //   /(?=.*[^A-Za-z0-9])/
  // );

  // let hasDigit = String(password)
  // .match(
  //   /(?=.*[0-9])/
  // );

  // if (!minLen) console.log("minLen");
  // if (!maxLen) console.log("maxLen");
  // if (!hasUpper) console.log("hasUpper");
  // if (!hasLower) console.log("hasLower");
  // if (!hasSpecial) console.log("hasSpecial");
  // if (!hasDigit) console.log("hasDigit");


  return String(password)
    .match(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/
    );
};

function validatePasswords(password, cPassword) {

  // Guard condition
  if (password === '' && cPassword === '') return;

  // Are these valid passwords?
  if (!validatePassword(password)) {
    console.log(`${password} is not a valid password`);
    return DisplayErr(1);
  }

  // Are the two passwords equal?
  if (password !== cPassword) {
    // console.log('They are not equal');
    return DisplayErr(2);
  }

  // Technically, validating cPassword is unnecessary because if password is valid and password === cPassword then cPassword must be valid
  // if (!validatePassword(cPassword)) {
  //   // console.log(`${cPassword} is not a valid password`);
  //   return DisplayErr(1);
  // }

  // console.log('They are equal');
}

const Reset3 = () => {
  return (
    <>
      <NavbarSimple />
      <Container>
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={5}
            lg={4}
            sx={{ textAlign: "center", marginTop: 6 }}
          >
            <Typography variant="h5" component="h1" sx={{ padding: 1 }}>
              Password Requirements:
            </Typography>
            <Typography variant="body1" component="h1">
              Between 8-20 characters <br />
              At least one lower case character <br />
              At least one upper case character <br />
              At least one number <br />
              At least one special symbol
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Paper
              elevation={6}
              sx={{
                marginTop: 6,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component="h2" sx={{ marginTop: 2 }}>
                Change Password
              </Typography>

              <Typography variant="body1" component="h2" sx={{ padding: 2 }}>
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

              {/* <Container>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ my: 3 }}
                >
                  Confirm
                </Button>
              </Container> */}
              {Confirm()}

              {/* <Container> {DisplayErr(1)}</Container> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Reset3;
