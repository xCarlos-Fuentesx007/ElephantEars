import React, { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Navbar from "../components/Navbar";
import { Container, Paper, Typography, Button, Grid } from "@mui/material";

const Settings = () => {
  const authCtx = useContext(AuthContext);
  const userData = authCtx.userData;
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
        <Typography variant="h5" sx={{ textAlign: "left", fontWeight: 600 }}>
          General Settings
        </Typography>

        <Grid
          columns={12}
          container
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            padding: 3,
          }}
        >
          <Grid item xs={12} md={4}>
            First Name
          </Grid>
          <Grid item xs={12} md={4}>
            [{userData.firstname}]
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit" fullWidth variant="contained">
              Edit
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            Last Name
          </Grid>
          <Grid item xs={12} md={4}>
            [{userData.lastname}]
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit" fullWidth variant="contained">
              Edit
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            Username
          </Grid>
          <Grid item xs={12} md={4}>
            [{userData.username}]
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit" fullWidth variant="contained">
              Edit
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            Email
          </Grid>
          <Grid item xs={12} md={4}>
            [{userData.email}]
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit" fullWidth variant="contained">
              Edit
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            Password
          </Grid>
          <Grid item xs={12} md={4}>
            <Button type="submit" fullWidth variant="contained">
              Change
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ textAlign: "left", fontWeight: 600 }}>
          Main Category Name
        </Typography>

        <Grid
          columns={12}
          container
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            padding: 3,
          }}
        >
          <Grid item xs={8}>
            Setting
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained">
              Button
            </Button>
          </Grid>
          <Grid item xs={8}>
            Setting
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained">
              Button
            </Button>
          </Grid>

          <Grid item xs={8}>
            Setting
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained">
              Button
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ textAlign: "left", fontWeight: 600 }}>
          Progress
        </Typography>

        <Grid
          columns={12}
          container
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{
            padding: 3,
          }}
        >
          <Grid item xs={8}>
            Reset Campaign Progress
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained">
              Reset
            </Button>
          </Grid>

          <Grid item xs={8}>
            Reset Progress
          </Grid>
          <Grid item xs={4}>
            <Button type="submit" fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Settings;
