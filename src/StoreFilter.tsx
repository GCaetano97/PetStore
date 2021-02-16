import React, {useContext, useState } from "react";
import {
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Typography,
  } from "@material-ui/core";
import {Context} from '../src/context'

interface state {
  state: {
    user: boolean,
    username: string,
    filter: string,
    pets: Array<Object>,
    modal: boolean,
    modalMessage: string,
  },
  update: Function
}

const StoreFilter = () => {
  const state: state = useContext(Context) as unknown as state
  const [filter, setFilter] = useState(state.state.filter)

  return (
    <Grid container item direction="column" xs={2}>
      <Paper style={{ minHeight: "15vh", marginLeft: "10px" }}>
        <Typography align="center" style={{ marginTop: "5px" }}>
          Search by availability
        </Typography>
        <div style={{ marginLeft: "15px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="status"
              name="status1"
              value={filter}
              onChange={e => {
                  state.update({...state.state, filter:e.target.value}) 
                  setFilter(e.target.value)                
              }}
            >
              <FormControlLabel
                value="available"
                control={<Radio />}
                label="Available"
              />
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel value="sold" control={<Radio />} label="Sold" />
            </RadioGroup>
          </FormControl>
        </div>
      </Paper>
    </Grid>
  );
};

export default StoreFilter;
