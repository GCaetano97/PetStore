import React, { useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Context } from '../src/context';
import Link from '../src/Link';
import Header from '../src/Header';

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

function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const url = 'https://petstore.swagger.io/v2/user/login';
  const state = (useContext(Context) as unknown) as stateType;
  const router = useRouter();

  async function handleLoginClick() {
    const loginObject = {
      username,
      password,
    };
    setUsername('');
    setPassword('');

    try {
      await axios.get(url, {
        params: {
          username,
          password,
        },
      });
      state.update({
        ...state.state,
        modal: true,
        modalMessage: `Welcome ${loginObject.username}`,
      });
      setTimeout(() => {
        state.update({
          ...state.state,
          user: true,
          username: loginObject.username,
          modal: false,
          modalMessage: '',
        });
        router.push('/');
      }, 1500);
    } catch (error: unknown) {
      state.update({
        ...state.state,
        modal: true,
        modalMessage: error,
      });
      setTimeout(() => {
        state.update({ ...state.state, modal: false, modalMessage: '' });
        router.push('/');
      }, 1500);
    }
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={() => handleLoginClick()}
              >
                Login
              </Button>
              <Typography className={classes.messageStyle}>
                Not a member yet?
                <Link href="/register" color="secondary">
                  Click here to register
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
