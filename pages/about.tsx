import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Header from '../src/layout/Header';

const useStyles = makeStyles(() => createStyles({
  rectangleStyle: {
    width: '99.7vw',
    minHeight: '40vh',
    marginTop: '10px',
  },
  presetationTextStyle: {
    marginTop: '15px',
  },
  gridSpacer: {
    marginBottom: '10px',
    marginTop: '15px',
  },
  linkStyle: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
      color: 'blue',
    },
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.rectangleStyle}>
        <Typography variant="h4" align="center">
          {' '}
          Welcome to FindAPet
        </Typography>
        <Typography align="center" className={classes.presetationTextStyle}>
          This is a exercise made with nextJS and TypeScript stylled with
          Material UI. The goal was to make a pet store with the help of swagger
          prebuilt API.
        </Typography>
        <Typography align="center">
          If you&apos;d like to see more projects like this you can check the
          {' '}
          <Link href="https://github.com/GCaetano97">
            <span className={classes.linkStyle}>
              Github
            </span>
          </Link>
          {' '}
          where this
          project is hosted!
        </Typography>
      </div>
      <Paper className={classes.rectangleStyle} elevation={3}>
        <Grid container alignContent="center" alignItems="center" spacing={1}>
          <Grid
            item
            xs={12}
            className={classes.gridSpacer}
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
              Login is fully functional and due to the API it&apos;s possible to
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
    </>
  );
}
