import {
  Toolbar, Typography, Menu, MenuItem,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Display, DisplayNone } from '../store/actions/notificationActions';
import { Logout } from '../store/actions/userActions';
import { IState } from '../types';
import Modal from './Modal';

const useStyles = makeStyles(() => createStyles({
  toolbar: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  title: {
    flex: 4,
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  link: {
    justifyContent: 'flex-end',
    marginRight: '20px',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  finalLink: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
}));

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.userReducer.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<EventTarget | undefined>(undefined);
  const url: string = 'https://petstore.swagger.io/v2/user/logout';
  const router = useRouter();
  const timer: React.MutableRefObject<undefined | number> = useRef(undefined);

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, [timer]);

  const handleMouseOver = React.useCallback((event: {target: EventTarget}) => {
    setAnchorEl(event.target);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  const handleLogout = React.useCallback(async () => {
    handleClose();
    await axios.get(url);
    dispatch(Display('We hope to see you soon!'));
    timer.current = window.setTimeout(() => {
      dispatch(DisplayNone());
      dispatch(Logout());
      router.push('/');
    }, 1500);
  }, [dispatch, handleClose, router]);

  if (user) {
    return (
      <>
        <Toolbar
          className={classes.toolbar}
        >
          <Link
            href="/"
          >
            <Typography className={classes.title}>FindAPet</Typography>
          </Link>
          <Link
            href="/store"
          >
            <Typography className={classes.link}>Store</Typography>
          </Link>
          <Link
            href="/about"
          >
            <Typography className={classes.link}>About</Typography>
          </Link>
          <Link href="/">
            <span
              className={classes.finalLink}
              onMouseOver={handleMouseOver}
              onFocus={handleMouseOver}
            >
              <AccountCircleIcon />
            </span>
          </Link>
          <Menu
            anchorEl={anchorEl as Element}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link
                href="/settings"
              >
                <Typography
                  onClick={handleClose}
                  className={classes.finalLink}
                >
                  Settings
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem
              className={classes.finalLink}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        <Modal />
      </>
    );
  }

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link
          href="/"
        >
          <Typography className={classes.title}>FindAPet</Typography>
        </Link>
        <Link
          href="/store"
        >
          <Typography className={classes.link}>Store</Typography>
        </Link>
        <Link
          href="/about"
        >
          <Typography className={classes.link}>About</Typography>
        </Link>
        <Link href="/login">
          <Typography className={classes.finalLink}>Login</Typography>
        </Link>
      </Toolbar>
      <Modal />
    </>
  );
}

export default React.memo(Header);
