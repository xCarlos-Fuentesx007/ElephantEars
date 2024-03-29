import React, { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import {
  Container,
  Divider,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Campaign = () => {
  const authCtx = useContext(AuthContext);
  const { runCampaign, schedule, userData, statsData, getStatsData, getSchedule } = authCtx;

  useEffect(() => {
    getStatsData(userData);
    getSchedule(userData);
  }, [userData]);

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
              {schedule.exercises.map((exercise, index) => (
                <Container key={index}>
                  <ListItem>
                    <ListItemText primary={exercise} />
                  </ListItem>
                  {index !== schedule.getSize() - 1 ? <Divider /> : null}
                </Container>
              ))}
            </List>
          </Container>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/exercise">
              <Button
                type="submit"
                variant="contained"
                sx={{ my: 1 }}
                onClick={() => runCampaign()}
              >
                Lets Get Started!
              </Button>
            </Link>
          </Container>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Campaign;
