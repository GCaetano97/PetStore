import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { modalSelector } from '../store/modal/modalSlice';

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

export default function TransitionsModal() {
  const { modal, modalMessage } = useSelector(modalSelector);
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modal}>
        <Paper className={classes.paper}>
          <Typography
            align="center"
            className={classes.text}
            variant="h5"
          >
            {modalMessage}
          </Typography>
        </Paper>
      </Fade>
    </Modal>
  );
}
