import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { petsSelector, setFilter } from '../store/pets/petsSlice';

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

const StoreFilter = () => {
  const dispatch = useDispatch();
  const stateFilter = useSelector(petsSelector).filter;
  const classes = useStyles();
  const [filter, setFilterStore] = useState(stateFilter);

  const handleOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value));
    setFilterStore(e.target.value);
  }, [dispatch]);

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
            onChange={handleOnChange}
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
