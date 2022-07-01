import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Progress on identifying: Major 3rd     Last Month",
    },
  },
};

const data = {
  labels: ["3/05/22", "3/12/22", "3/19/22", "3/26/22", "4/02/22", "12/02/22"],
  datasets: [
    {
      label: "First dataset",
      data: [22, 54, 60, 60, 73, 89],
      borderColor: "#6A3D9A",
    },
  ],
};

const ProgressChart = () => {
  return (
    <Grid sx={{ minWidth: "500px" }}>
      <Line data={data} options={options} style={{ width: "100%" }} />
    </Grid>
  );
};

export default ProgressChart;
