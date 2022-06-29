import React, { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import NavWel from "../components/Nav-Welcome";
import Logo from "../img/Logo.PNG";

import { Container, Paper, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";

const Welcome = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Fragment>
      {isLoggedIn ? <Navbar /> : <NavWel />}

      <Container
        maxWidth="100%"
        sx={{
          marginTop: 5,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={Logo} className="WelcomeLogo" alt="Logo" />

        <Typography
          variant="h2"
          component="h2"
          sx={{ marginTop: 5, textAlign: "center" }}
        >
          Welcome to Elephant Ears!
        </Typography>

        <Grid
          columns={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{
            marginTop: 6,
            padding: 3,
            width: "85%",
            height: "40%",
          }}
        >
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#E5E5E5",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ fontWeight: 600, padding: 1 }}
              >
                Become a better musician
              </Typography>
              <Typography variant="body1" component="h1">
                Ever heard of the phrase “Play it by ear”? This amazing skill is
                achieved through ear training and it is in fact one of the most
                sought after skills in a person’s repertoire. A person who
                consistently trains this music skill will increase by leaps and
                bounds.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#E5E5E5",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{ fontWeight: 600, padding: 1 }}
              >
                How we do it
              </Typography>
              <Typography variant="body1" component="h2">
                We will serve you a campaign and adjust it based off of your
                needs using your performance data and inputting it into an
                advanced algorithm. The campaign will dynamically change
                automatically so you don’t have to worry about keeping up with
                your mastery of each skill.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#E5E5E5",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h5"
                component="h4"
                sx={{ fontWeight: 600, padding: 1 }}
              >
                Who we are
              </Typography>
              <Typography variant="body1" component="h3">
                Created by a team of college musicians from various backgrounds
                and skill levels to ensure you get the best user experience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Welcome;
