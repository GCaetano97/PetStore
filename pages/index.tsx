import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import Header from '../src/layout/Header';

const useStyles = makeStyles(() => createStyles({
  heroStyle: {
    minHeight: '93vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1554079501-1e3155dc26da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=978&q=80)',
    backgroundSize: 'cover',
  },
  heroTextStyle: {
    marginTop: '20vh',
    marginLeft: '15vh',
  },
  heroButtonStyle: {
    backgroundColor: '#c4811c',
    fontSize: '22px',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#da9023',
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.heroStyle}>
        <br />
        <div className={classes.heroTextStyle}>
          <Typography variant="h3">More than a friend</Typography>
          <Typography variant="h4">
            We know what
            {' '}
            <Link href="/store">
              <Button
                variant="contained"
                size="large"
                className={classes.heroButtonStyle}
              >
                you need
              </Button>
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
