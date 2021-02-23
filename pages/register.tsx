import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Header from '../src/layout/Header';
import { setModal, setModalMessage } from '../src/store/modal/modalSlice';

const useStyles = makeStyles(() => createStyles({
  paperStyle: {
    borderRadius: '2%',
    minHeight: '500px',
  },
  titleStyle: {
    paddingTop: '5vh',
  },
  textFieldGroup: {
    marginTop: '5vh',
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
  warningStyle: {
    color: 'red',
  },
}));

function Register() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const url = 'https://petstore.swagger.io/v2/user';

  const handleRegisterClick = React.useCallback(async () => {
    const registerObject = {
      id: Math.floor(Math.random() * 10000000),
      username,
      email,
      password,
      userStatus: 0,
    };

    try {
      await axios.post(url, registerObject);
      dispatch(setModal(true));
      dispatch(setModalMessage('Register was successful'));
      setTimeout(() => {
        dispatch(setModalMessage(''));
        dispatch(setModal(false));
        router.push('/login');
      }, 1500);
    } catch (error: unknown) {
      dispatch(setModal(true));
      dispatch(setModalMessage('There was an error, please try again'));
      setTimeout(() => {
        dispatch(setModal(false));
        dispatch(setModalMessage(''));
        router.push('/');
      }, 1500);
    }
  }, [dispatch, email, password, router, username]);

  function handleUsernameChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setEmail(e.target.value);
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
              Welcome!
            </Typography>
            <Typography align="center">
              We&apos;ll need some information to continue
            </Typography>
            <div className={classes.textFieldGroup}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={handleUsernameChange}
              />

              <TextField
                required
                variant="outlined"
                margin="normal"
                id="email"
                label="Email"
                name="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />

              <TextField
                required
                variant="outlined"
                margin="normal"
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                value={password}
                onChange={handlePasswordChange}
              />

              <Button
                disabled={!(password && username && email)}
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={handleRegisterClick}
              >
                Register Now
              </Button>
              {!(password && username && email) && (
              <Typography variant="caption" className={classes.warningStyle}>
                *All the fields are required
              </Typography>
              )}
            </div>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Register;
