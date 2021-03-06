import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Header from '../src/layout/Header';
import StoreFilter from '../src/components/StoreFilter';
import PetList from '../src/components/PetList';

const useStyles = makeStyles(() => createStyles({
  gridStyle: {
    marginTop: '15px',
  },
}));

function Store() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid container direction="row" className={classes.gridStyle} spacing={2}>
        <StoreFilter />
        <Grid container item direction="column" xs={9}>
          <PetList />
        </Grid>
      </Grid>
    </>
  );
}

export default Store;
