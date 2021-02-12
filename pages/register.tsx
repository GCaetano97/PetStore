import React, { useState } from "react";
import Header from "../src/Header";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper, TextField, Button } from "@material-ui/core";
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const url = 'https://petstore.swagger.io/v2/user'

  async function handleRegisterClick() {
    const registerObject = {
      id: Math.floor(Math.random()*10000000),
      username: username,
      email: email,
      password: password,
      userStatus: 0
    };
    console.log("register clicked");
    console.log(registerObject);
    
    try{
      const res = await axios.post(url, registerObject)
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
              Welcome!
            </Typography>
            <Typography align="center">
              We'll need some information to continue
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
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
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
                  onClick={() => handleRegisterClick()}
                >
                  Register Now
                </Button>
              </div>
            </div>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default Register;
