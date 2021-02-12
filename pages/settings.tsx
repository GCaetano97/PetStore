import React, { useContext, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Link from "../src/Link";
import Header from "../src/Header";
import useSWR from "swr";
import fetcher from "../src/fetcher";
import { Context } from "../src/context";

export default function About() {
    const state = useContext(Context);
    const { data, error } = useSWR(
        `https://petstore.swagger.io/v2/user/${state.state.username}`,
        fetcher
      );
      console.log(data);
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  let firstTime = true

  useEffect(() => {
    
  },[])

  const handleSubmitClick = () => {
      console.log('submit')
  }
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
                    marginBottom: '20px'
                  }}
                  onClick={() => handleSubmitClick()}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Paper>
      </Container>
    </SettingsLayout>
  );
}

function SettingsLayout(props) {
  return (
    <React.Fragment>
      <Header />
      {props.children}
    </React.Fragment>
  );
}

/*
  if (data && !error) {
      setUsername(data.username? data.username : '')
      setFirstName(data.firsName? data.firsName : '')
      setLastName(data.lastName? data.lastName : '')
      setEmail(data.email? data.email : '')
      setPassword(data.password? data.password : '')
      setPhone(data.phone? data.phone : '') 
    if(data.username){
      setUsername(data.username)
    }
  }
*/