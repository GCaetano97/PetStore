import React, { useState, useContext } from "react";
import Header from "../src/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link";
import { Paper, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Context } from "../src/context";
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "https://petstore.swagger.io/v2/user/login";
  const state: state = (useContext(Context) as unknown) as state;
  const router = useRouter();

  async function handleLoginClick() {
    const loginObject = {
      username,
      password,
    };
    setUsername("");
    setPassword("");

    try {
      await axios.get(url, {
        params: {
          username: username,
          password: password,
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
          modalMessage: "",
        });
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ borderRadius: "2%", minHeight: "500px" }}>
          <Box my={4}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{ paddingTop: "5vh" }}
            >
              Login
            </Typography>
            <div style={{ marginTop: "7vh" }}>
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
                  style={{
                    margin: "0 auto",
                    borderRadius: "3%",
                    width: "21vh",
                    marginTop: "15px",
                  }}
                  onClick={() => handleLoginClick()}
                >
                  Login
                </Button>
                <Typography style={{ margin: "0 auto", marginTop: "2vh" }}>
                  Not a member yet?
                  <Link href="/register" color="secondary">
                    Click here to register
                  </Link>
                </Typography>
              </div>
            </div>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Login;
