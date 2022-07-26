import React, { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

import Navbar from "../components/Navbar";

const Campaign = () => {
  const authCtx = useContext(AuthContext);
  const { userData, getCampaignData, getStatsData } = authCtx;

  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            marginTop: 8,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#E5E5E5",
            borderRadius: "25px",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ marginTop: 2 }}
            textAlign="center"
          >
            Here are your upcoming exercises:
          </Typography>

          <Container>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                borderRadius: "25px",
                margin: "40px auto",
                maxHeight: "300px",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  margin: "15px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#C4C4C4",
                  borderRadius: "25px",
                  backgroundClip: "padding-box",
                },
              }}
            >
              <ListItem>
                <ListItemText primary="Intervals" secondary="All" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Scale Degrees" secondary="Chromatic" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Scales" secondary="All" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Intervals in Context"
                  secondary="Diatonic"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Pitch" secondary="C Sale" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Chord Progressions"
                  secondary="All Triads and Sevenths"
                />
              </ListItem>
            </List>
          </Container>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" sx={{ my: 1 }}>
              Lets Get Started!
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                getCampaignData(userData);
                getStatsData(userData);
              }}
            >
              Pull Campaign and Stats Data
            </Button>
          </Container>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Campaign;
