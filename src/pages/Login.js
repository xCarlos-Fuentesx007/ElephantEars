import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth-context";

//import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Logo from "../img/Logo.PNG";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const { login, error, isLoading, isLoggedIn } = authCtx;

  const onFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({ email: data.get("email"), password: data.get("password") });
  };

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      navigate("/");
    }
  }, [isLoggedIn, isLoading, navigate]);

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
        {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <AccountCircleRoundedIcon />
        </Avatar> */}

        <Avatar
          alt="Logo"
          src={Logo}
          variant="rounded"
          sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
        />

        <Typography component="h1" variant="h4">
          Sign in
        </Typography>

        <Box component="form" onSubmit={onFormSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
            disabled={isLoading ? true : false}
          >
            Sign In
          </Button>
          {error && (
            <Typography variant="body2" color="red">
              {error}
            </Typography>
          )}

          <Grid container mt={1}>
            <Grid item xs>
              <Link href="/reset1" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                {"New to Elephant Ears? "}
                <Link href="/register" variant="body2">
                  {"Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
