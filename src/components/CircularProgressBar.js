import React from "react";
import { Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ percentage, title, color }) => {
  return (
    <>
      <div style={{ height: 90, width: 90, margin: "auto" }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={12}
          styles={buildStyles({
            textColor: color,
            pathColor: color,
          })}
        />
      </div>
      <Typography variant="body1" component="h1" textAlign="center" my={1}>
        {title}
      </Typography>
    </>
  );
};

export default CircularProgressBar;
