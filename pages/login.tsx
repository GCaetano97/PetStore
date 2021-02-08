import React, { useState } from "react";
import Header from "../src/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link";
import { Paper, TextField, Button } from "@material-ui/core";
import axios from 'axios'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const url = 'http://virtserver.swaggerhub.com/GCaetano978/PetstoreTest/1.0.0/user/login'


  async function handleLoginClick() {
    const loginObject = {
      username,
      password
    }
    console.log('login clicked')
    console.log(loginObject)
    setUsername('')
    setPassword('')

    try{
      const res = await axios.get(url, {
        params: {
          username: username,
          password: password
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
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
                  onChange={e => setUsername(e.target.value)}
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
                  onChange={e => setPassword(e.target.value)}
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
