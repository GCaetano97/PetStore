import React from "react";
import Header from "../src/Header";
import StoreFilter from "../src/StoreFilter";
import { Grid } from "@material-ui/core";
import PetList from "../src/PetList";

function Store() {
  return (
    <React.Fragment>
      <Header />
      <Grid container direction="row" style={{ marginTop: "15px" }} spacing={2}>
        <StoreFilter />
        <Grid container item direction="column" xs={9}>
          <PetList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Store;
