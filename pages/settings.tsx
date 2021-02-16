import React, { useContext, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Header from "../src/Header";
import useSWR from "swr";
import fetcher from "../src/fetcher";
import { Context } from "../src/context";
import axios from "axios";
import { useRouter } from "next/router";

interface state {
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

export default function About() {
  const router = useRouter();
  const state: state = (useContext(Context) as unknown) as state;
  const { data, error } = useSWR(
    `https://petstore.swagger.io/v2/user/${state.state.username}`,
    fetcher,
  );
  const url = `https://petstore.swagger.io/v2/user/${state.state.username}`;
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    if (data) {
      setUsername(data.username ? data.username : "");
      setFirstName(data.firstName ? data.firstName : "");
      setLastName(data.lastName ? data.lastName : "");
      setEmail(data.email ? data.email : "");
      setPassword(data.password ? data.password : "");
      setPhone(data.phone ? data.phone : "");
      setId(data.id ? data.id : "");
      setUserStatus(data.userStatus ? data.userStatus : "");
    }
  }, [data]);

  const handleSubmitClick = async () => {
    const userObject = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      id: id,
      userStatus: userStatus,
    };

    if (userObject.firstName == false) {
      delete userObject.firstName;
    }

    if (userObject.lastName == false) {
      delete userObject.lastName;
    }

    if (userObject.phone == false) {
      delete userObject.phone;
    }

    if (userObject.userStatus === "") {
      userObject.userStatus = 0;
    }
    console.log(userObject);
    try {
      await axios.put(url, userObject);
      state.update({
        ...state.state,
        modal: true,
        modalMessage: "Changes saved",
      });
      setTimeout(() => {
        state.update({ ...state.state, modal: false, modalMessage: "" });
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
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
    return <SettingsLayout>Loadingggggggggggggggggggggggg</SettingsLayout>;
  }

  return (
    <SettingsLayout>
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ borderRadius: "2%", minHeight: "500px" }}>
          <Box my={4}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{ paddingTop: "5vh" }}
            >
              Settings
            </Typography>
            <div style={{ marginTop: "5vh" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: "16px",
                }}
              >
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
                  style={{
                    margin: "0 auto",
                    borderRadius: "3%",
                    width: "21vh",
                    marginTop: "15px",
                    marginBottom: "5px",
                  }}
                  onClick={() => handleSubmitClick()}
                >
                  Submit
                </Button>
                <Typography style={{ marginBottom: "20px" }} variant="caption">
                  Leaving textfields blank makes them lose their data
                </Typography>
              </div>
            </div>
          </Box>
        </Paper>
      </Container>
    </SettingsLayout>
  );
}

function SettingsLayout(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  );
}
