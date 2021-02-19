import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useSWR from 'swr';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../src/Header';
import fetcher from '../src/fetcher';
import { Context } from '../src/context';
import Spinner from '../src/Spinner';

const useStyles = makeStyles(() => createStyles({
  paperStyle: {
    borderRadius: '2%',
    minHeight: '500px',
  },
  boxStyle: {
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
    marginBottom: '5px',
  },
  warningStyle: {
    marginBottom: '20px',
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

interface userObjectType {
  username: string,
  firstName?: string,
  lastName?: string,
  email: string,
  password: string,
  phone?: string,
  id?: string,
  userStatus: number,
}

type Props = {
  children: React.ReactNode
}

function SettingsLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default function About() {
  const classes = useStyles();
  const router = useRouter();
  const state = (useContext(Context) as unknown) as stateType;
  const { data, error } = useSWR(
    `https://petstore.swagger.io/v2/user/${state.state.username}`,
    fetcher,
  );
  const url = `https://petstore.swagger.io/v2/user/${state.state.username}`;
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [userStatus, setUserStatus] = useState(0);

  useEffect(() => {
    if (data) {
      setUsername(data.username ? data.username : '');
      setFirstName(data.firstName ? data.firstName : '');
      setLastName(data.lastName ? data.lastName : '');
      setEmail(data.email ? data.email : '');
      setPassword(data.password ? data.password : '');
      setPhone(data.phone ? data.phone : '');
      setId(data.id ? data.id : '');
      setUserStatus(data.userStatus ? data.userStatus : '');
    }
  }, [data]);

  const handleSubmitClick = async () => {
    const userObject: userObjectType = {
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      id,
      userStatus,
    };

    if (userObject.firstName === '') {
      delete userObject.firstName;
    }

    if (userObject.lastName === '') {
      delete userObject.lastName;
    }

    if (userObject.phone === '') {
      delete userObject.phone;
    }

    if (userObject.userStatus !== 0) {
      userObject.userStatus = 0;
    }

    try {
      await axios.put(url, userObject);
      state.update({
        ...state.state,
        modal: true,
        modalMessage: 'Changes saved',
      });
      setTimeout(() => {
        state.update({ ...state.state, modal: false, modalMessage: '' });
        router.push('/');
      }, 1500);
    } catch (error2: unknown) {
      state.update({
        ...state.state,
        modal: true,
        modalMessage: error2,
      });
      setTimeout(() => {
        state.update({ ...state.state, modal: false, modalMessage: '' });
        router.push('/');
      }, 1500);
    }
  };
  if (error) {
    return (
      <SettingsLayout>
        <Container>
          <Typography>
            The session logged is just a dummy one, please create a account for
            the settings menu
          </Typography>
        </Container>
      </SettingsLayout>
    );
  }

  if (!data) {
    return <SettingsLayout><Spinner /></SettingsLayout>;
  }

  return (
    <SettingsLayout>
      <Container maxWidth="sm">
        <Paper elevation={3} className={classes.paperStyle}>
          <Box my={4}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              className={classes.boxStyle}
            >
              Settings
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
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <TextField
                variant="outlined"
                margin="normal"
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
                onClick={() => handleSubmitClick()}
              >
                Submit
              </Button>
              <Typography className={classes.warningStyle} variant="caption">
                Leaving textfields blank makes them lose their data
              </Typography>
            </div>
          </Box>
        </Paper>
      </Container>
    </SettingsLayout>
  );
}
