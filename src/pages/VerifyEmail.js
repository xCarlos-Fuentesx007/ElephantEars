import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";

//import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Logo from "../img/Logo.PNG";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const { verifyEmail, error, isLoading, isLoggedIn } = authCtx;
  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = data.get("token");
    verifyEmail(token);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
        }}
      >
        <Avatar
          alt="Logo"
          src={Logo}
          variant="rounded"
          sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
        />

        {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AccountCircleRoundedIcon />
        </Avatar> */}

        <Typography component="h1" variant="h4" mt={3}>
          Verify email
        </Typography>
        <Typography component="p" variant="p">
          Please enter the verification code sent to your email to verify your
          account
        </Typography>

        <Grid
          container
          component="form"
          onSubmit={onFormSubmit}
          noValidate
          columnSpacing={3}
          sx={{ mt: 1 }}
        >
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="token"
              label="Enter Token"
              name="token"
              autoComplete="token"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
              disabled={isLoading ? true : false}
            >
              Submit
            </Button>
          </Grid>

          {error && (
            <Grid item xs={12} mt={1}>
              <Typography
                variant="body2"
                color={error.includes("Thanks for signing up.") ? "" : "red"}
                align="center"
              >
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
