import {
  Toolbar, Typography, Menu, MenuItem,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Context } from './context';
import Link from './Link';

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
    },
  },
  link: {
    justifyContent: 'flex-end',
    marginRight: '20px',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  finalLink: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'none',
    },
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

function Header() {
  const classes = useStyles();
  const state: stateType = (useContext(Context) as unknown) as stateType;
  const [anchorEl, setAnchorEl] = useState<EventTarget | undefined>(undefined);
  const [logged, setLogged] = useState(state.state.user);
  const url = 'https://petstore.swagger.io/v2/user/logout';
  const router = useRouter();

  const handleMouseOver = (event: {target: EventTarget}) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = async () => {
    await axios.get(url);
    setLogged(false);
    state.update({ modal: true, modalMessage: 'We hope to see you soon!' });
    handleClose();
    setTimeout(() => {
      setLogged(false);
      state.update({
        ...state.state,
        username: '',
        user: false,
        modal: false,
        modalMessage: '',
      });
      router.push('/');
    }, 1500);
  };

  if (logged) {
    return (
      <Toolbar
        className={classes.toolbar}
      >
        <Link
          href="/"
          className={classes.title}
        >
          <Typography>FindAPet</Typography>
        </Link>
        <Link
          href="/store"
          className={classes.link}
        >
          <Typography>Store</Typography>
        </Link>
        <Link
          href="/about"
          className={classes.link}
        >
          <Typography>About</Typography>
        </Link>
        <Link href="/" className={classes.finalLink}>
          <span onMouseOver={handleMouseOver} onFocus={handleMouseOver}><AccountCircleIcon /></span>
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
              onClick={handleClose}
              className={classes.finalLink}
            >
              Settings
            </Link>
          </MenuItem>
          <MenuItem
            className={classes.finalLink}
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    );
  }

  return (
    <Toolbar className={classes.toolbar}>
      <Link
        href="/"
        className={classes.title}
      >
        <Typography>FindAPet</Typography>
      </Link>
      <Link
        href="/store"
        className={classes.link}
      >
        <Typography>Store</Typography>
      </Link>
      <Link
        href="/about"
        className={classes.link}
      >
        <Typography>About</Typography>
      </Link>
      <Link href="/login" className={classes.finalLink}>
        <Typography>Login</Typography>
      </Link>
    </Toolbar>
  );
}

export default Header;
