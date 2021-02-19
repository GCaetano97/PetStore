import React, { useContext, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from '@material-ui/core';
import { Context } from './context';

const useStyles = makeStyles(() => createStyles({
  paper: {
    minHeight: '15vh',
    marginLeft: '10px',
  },
  searchText: {
    marginTop: '5px',
  },
  radioForm: {
    marginLeft: '15px',
  },
}));

interface stateType {
  state: {
    user: boolean;
    username: string;
    filter: string;
    pets: Array<Object>;
    modal: boolean;
    modalMessage: string;
  };
  update: Function;
}

const StoreFilter = () => {
  const classes = useStyles();
  const state = (useContext(Context) as unknown) as stateType;
  const [filter, setFilter] = useState(state.state.filter);

  return (
    <Grid container item direction="column" xs={2}>
      <Paper className={classes.paper}>
        <Typography align="center" className={classes.searchText}>
          Search by availability
        </Typography>
        <FormControl component="fieldset" className={classes.radioForm}>
          <RadioGroup
            aria-label="status"
            name="status1"
            value={filter}
            onChange={(e) => {
              state.update({ ...state.state, filter: e.target.value });
              setFilter(e.target.value);
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
      </Paper>
    </Grid>
  );
};

export default StoreFilter;
