import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import Header from '../src/layout/Header';
import { setUser, setUsername } from '../src/store/user/userSlice';
import { setModal, setModalMessage } from '../src/store/modal/modalSlice';

const useStyles = makeStyles(() => createStyles({
  paperStyle: {
    borderRadius: '2%',
    minHeight: '500px',
  },
  titleStyle: {
    paddingTop: '7vh',
  },
  textFieldGroup: {
    marginTop: '8vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonStyle: {
    margin: '0 auto',
    borderRadius: '3%',
    width: '21vh',
    marginTop: '15px',
  },
  messageStyle: {
    margin: '0 auto',
    marginTop: '2vh',
  },
  linkStyle: {
    textDecoration: 'underline',
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
  },
}));

function Login() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const url = 'https://petstore.swagger.io/v2/user/login';
  const router = useRouter();

  const handleLoginClick = React.useCallback(async () => {
    const loginObject = {
      username,
      password,
    };
    setUsernameState('');
    setPassword('');

    try {
      await axios.get(url, {
        params: {
          username,
          password,
        },
      });
      dispatch(setModal(true));
      dispatch(setModalMessage(`Welcome ${loginObject.username}`));
      setTimeout(() => {
        dispatch(setUser(true));
        dispatch(setUsername(loginObject.username));
        dispatch(setModalMessage(''));
        dispatch(setModal(false));
        router.push('/');
      }, 1500);
    } catch (error: unknown) {
      dispatch(setModal(true));
      dispatch(setModalMessage('There was an error, please try again'));

      setTimeout(() => {
        dispatch(setModalMessage(''));
        dispatch(setModal(false));
        router.push('/');
      }, 1500);
    }
  }, [dispatch, password, router, username]);

  function handleUsernameChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setUsernameState(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paperStyle}>
          <Box my={4}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              className={classes.titleStyle}
            >
              Login
            </Typography>
            <div className={classes.textFieldGroup}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                autoFocus
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                value={password}
                onChange={handlePasswordChange}
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Typography className={classes.messageStyle}>
                Not a member yet?
                <Link href="/register">
                  <span className={classes.linkStyle}> Click here to register</span>
                </Link>
              </Typography>
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
