import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <CircularProgress className={classes.root} />
  );
};

export default React.memo(Spinner);
