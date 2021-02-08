import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../src/Link";
import Header from "../src/Header";
import { Button } from "@material-ui/core";

export default function Index() {
  return (
    <React.Fragment>
      <Header />

      <div
        style={{
          minHeight: "93vh",
          backgroundImage: `url(https://images.unsplash.com/photo-1554079501-1e3155dc26da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=978&q=80)`,
          backgroundSize: "cover",
        }}
      >
         <br/>
        <div style={{marginTop: '20vh', marginLeft: '15vh'}}>
          <Typography variant="h3">More than a friend</Typography>
          <Typography variant="h4">
            We know what{" "}
            <Link href='/store' style={{textDecoration: 'none'}}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "rgba(166, 107, 18,.8)",
                fontSize: "22px",
              }}
            >
              you need
            </Button>
            </Link>
          </Typography>
        </div>
        
      </div>
    </React.Fragment>
  );
}
