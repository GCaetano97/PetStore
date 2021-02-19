import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Context } from './context';

const useStyles = makeStyles((theme: Theme) => createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: '150px',
    minWidth: '300px',
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

export default function TransitionsModal() {
  const classes = useStyles();
  const state = useContext(Context) as unknown as stateType;

  const handleClose = () => {
    state.update({ ...state.state, modal: false });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={state.state.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={state.state.modal}>
        <Paper className={classes.paper}>
          <Typography
            align="center"
            style={{ marginTop: '20px' }}
            variant="h5"
          >
            {state.state.modalMessage}
          </Typography>
        </Paper>
      </Fade>
    </Modal>
  );
}
