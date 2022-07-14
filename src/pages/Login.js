import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Logo from "../img/Logo.PNG";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NavbarSimple from "../components/NavbarSimple";

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
    <>
      <NavbarSimple />
      <Container maxWidth="xs">
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
          <Typography
            variant="h4"
            component="h2"
            sx={{ marginTop: 2 }}
            textAlign="center"
          >
            Welcome to Elephant Ears
          </Typography>

          <Typography
            variant="body1"
            component="h2"
            sx={{ padding: 2 }}
            textAlign="center"
          >
            Please login to your account
          </Typography>

          <Avatar
            alt="Logo"
            src={Logo}
            sx={{
              width: 90,
              height: 90,
              objectFit: "contain",
              borderRadius: "0",
            }}
          />

          <Box
            component="form"
            onSubmit={onFormSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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

            <Typography variant="body2" textAlign="center" mt={2}>
              <Link to="/reset1" variant="body2">
                Forgot password?
              </Link>
            </Typography>
            <Typography variant="body2" textAlign="center" mt={2}>
              {"New to Elephant Ears? "}
              <Link to="/register" variant="body2">
                {"Sign Up"}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
