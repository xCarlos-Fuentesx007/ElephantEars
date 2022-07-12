import React, { Fragment, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Navbar from "../components/Navbar";
import { Container, Typography, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const authCtx = useContext(AuthContext);

  const { updateUser, userData } = authCtx;

  const [isFirstNameShown, setIsFirstNameShown] = useState(false);
  const [isLastNameShown, setIsLastNameShown] = useState(false);
  const [isUserNameShown, setIsUserNameShown] = useState(false);
  const [isEmailShown, setIsEmailShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const [firstNameValue, setFirstNameValue] = useState(userData?.firstname);
  const [lastNameValue, setLastNameValue] = useState(userData?.lastname);
  const [userNameValue, setUserNameValue] = useState(userData?.username);
  const [emailValue, setEmailValue] = useState(userData?.email);
  const [passwordValue, setPasswordValue] = useState("");

  const updateHandler = () => {
    const newData =
      passwordValue.length > 0
        ? {
            id: userData.id,
            firstname: firstNameValue,
            lastname: lastNameValue,
            username: userNameValue,
            email: emailValue,
            password: passwordValue,
            token: userData.token,
          }
        : {
            id: userData.id,
            firstname: firstNameValue,
            lastname: lastNameValue,
            username: userNameValue,
            email: emailValue,
            token: userData.token,
          };
    updateUser(newData);
    setIsFirstNameShown(false);
    setIsLastNameShown(false);
    setIsUserNameShown(false);
    setIsEmailShown(false);
    setIsPasswordShown(false);
  };

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
            {!isFirstNameShown && `[${userData.firstname}]`}
            {isFirstNameShown && (
              <TextField
                size="small"
                margin="none"
                required
                value={firstNameValue}
                onChange={(e) => {
                  setFirstNameValue(e.target.value);
                }}
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
              />
            )}
          </Grid>

          {!isFirstNameShown && (
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsFirstNameShown(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          {isFirstNameShown && (
            <>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={updateHandler}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => {
                    setIsFirstNameShown(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            Last Name
          </Grid>
          <Grid item xs={12} md={4}>
            {!isLastNameShown && `[${userData.lastname}]`}
            {isLastNameShown && (
              <TextField
                size="small"
                margin="none"
                required
                value={lastNameValue}
                onChange={(e) => {
                  setLastNameValue(e.target.value);
                }}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                autoFocus
              />
            )}
          </Grid>
          {!isLastNameShown && (
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsLastNameShown(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          {isLastNameShown && (
            <>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={updateHandler}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => {
                    setIsLastNameShown(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            Username
          </Grid>
          <Grid item xs={12} md={4}>
            {!isUserNameShown && `[${userData.username}]`}
            {isUserNameShown && (
              <TextField
                size="small"
                margin="none"
                required
                value={userNameValue}
                onChange={(e) => {
                  setUserNameValue(e.target.value);
                }}
                id="userName"
                label="Username"
                name="userName"
                autoFocus
              />
            )}
          </Grid>
          {!isUserNameShown && (
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsUserNameShown(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          {isUserNameShown && (
            <>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={updateHandler}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => {
                    setIsUserNameShown(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            Email
          </Grid>
          <Grid item xs={12} md={4}>
            {!isEmailShown && `[${userData.email}]`}
            {isEmailShown && (
              <TextField
                size="small"
                margin="none"
                required
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            )}
          </Grid>
          {!isEmailShown && (
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsEmailShown(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          {isEmailShown && (
            <>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={updateHandler}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => {
                    setIsEmailShown(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={4}>
            Password
          </Grid>
          <Grid item xs={12} md={4}>
            {isPasswordShown && (
              <TextField
                size="small"
                margin="none"
                required
                id="password"
                label="New Password"
                name="password"
                value={passwordValue}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                }}
                autoFocus
              />
            )}
          </Grid>
          {!isPasswordShown && (
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {
                  setIsPasswordShown(true);
                }}
              >
                Change
              </Button>
            </Grid>
          )}
          {isPasswordShown && (
            <>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={updateHandler}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => {
                    setIsPasswordShown(false);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
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
