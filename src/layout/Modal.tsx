import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, Modal as MUIModal } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { IState } from '../types';

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
  text: {
    marginTop: '20px',
  },
}));

const Modal = () => {
  const modalState = useSelector((state: IState) => state.notificationReducer);
  const classes = useStyles();

  return (
    <MUIModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalState.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalState.modal}>
        <Paper className={classes.paper}>
          <Typography
            align="center"
            className={classes.text}
            variant="h5"
          >
            {modalState.modalMessage}
          </Typography>
        </Paper>
      </Fade>
    </MUIModal>
  );
};

export default React.memo(Modal);
