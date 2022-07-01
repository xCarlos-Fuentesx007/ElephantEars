import React from "react";
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

              <Container>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ my: 3 }}
                >
                  Confirm
                </Button>
              </Container>

              <Container> {DisplayErr(1)}</Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Reset3;
