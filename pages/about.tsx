import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../src/Link";
import Header from "../src/Header";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const rectangleStyle = {
  width: "99.7vw",
  minHeight: "40vh",
  marginTop: "10px",
};

export default function About() {
  return (
    <React.Fragment>
      <Header />
      <div style={rectangleStyle}>
        <Typography variant="h4" align="center">
          {" "}
          Welcome to FindAPet
        </Typography>
        <Typography align="center" style={{ marginTop: "15px" }}>
          This is a exercise made with nextJS and TypeScript stylled with
          Material UI. The goal was to make a pet store with the help of swagger
          prebuilt API.
        </Typography>
        <Typography align="center">
          If you'd like to see more projects like this you can check the{" "}
          <Link href="https://github.com/GCaetano97">Github</Link> where this
          project is hosted!
        </Typography>
      </div>
      <Paper style={rectangleStyle} elevation={3}>
        <Grid container alignContent="center" alignItems="center" spacing={1}>
          <Grid
            item
            xs={12}
            style={{ marginBottom: "10px", marginTop: "15px" }}
          >
            <Typography variant="h4" align="center">
              Features
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center">
              Login
            </Typography>
            <Typography>
              Login is fully functional and due to the API it's possible to
              login using a dummy user and password.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center">
              Account Settings
            </Typography>
            <Typography>
              If registered, you can change the settings on the settings tab
              after you are logged.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="center">
              Store
            </Typography>
            <Typography>
              The store where you can purchase the pet you want. This option is
              just for the logged user and works with dummy session as well. The
              quantity can be selected increasing or decreasing one.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
