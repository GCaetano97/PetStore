import React, { useState } from "react";
import Header from "../src/Header";
import StoreFilter from '../src/StoreFilter'
import Typography from "@material-ui/core/Typography";
import Link from "../src/Link";
import {
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import PetList from "../src/PetList";



function Store() {
  return (
    <React.Fragment>
      <Header />
      <Grid container direction="row" style={{ marginTop: "15px" }}>
        <StoreFilter />
        <Grid container item direction='column' xs={9}>
          <PetList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Store;
