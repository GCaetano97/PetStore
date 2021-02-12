import { Toolbar, Typography, Menu, MenuItem } from "@material-ui/core";
import Link from "./Link";
import React, { useContext, useState } from "react";
import { Context } from "./context";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import { useRouter } from 'next/router'

function Header() {
  const state = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null)
  const [logged, setLogged] = useState(state.state.user)
  const url = 'https://petstore.swagger.io/v2/user/logout'
  const router = useRouter()
  console.log(state, 'state no header')
  const handleMouseOver = (e) => {setAnchorEl(e.currentTarget)}

  const handleClose = () => {setAnchorEl(null)}

  const handleLogout = async () => {
    const res = await axios.get(url)
    setLogged(false)
    state.update({...state.state, username: '', user: false})
    handleClose()
    router.push('/')
  }

  if (logged) {
    return (
      <Toolbar style={{ display: "flex", backgroundColor: "#fff" }}>
        <Link
          href="/"
          style={{ flex: 4, textDecoration: "none", color: "black" }}
        >
          <Typography>FindAPet</Typography>
        </Link>
        <Link
          href="/store"
          style={{
            justifyContent: "flex-end",
            marginRight: "20px",
            textDecoration: "none",
            color: "black",
          }}
        >
          <Typography>Store</Typography>
        </Link>
        <Link
          href="/about"
          style={{
            justifyContent: "flex-end",
            marginRight: "20px",
            textDecoration: "none",
            color: "black",
          }}
        >
          <Typography>About</Typography>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
          <AccountCircleIcon onMouseOver={handleMouseOver} />
        </Link>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
          <MenuItem onClick={handleClose} >
            <Link href="/settings" style={{textDecoration: 'none', color: 'black'}}>
              Settings
            </Link>
          </MenuItem>
          <MenuItem onClick={() => handleLogout()} >Logout</MenuItem>
        </Menu>
      </Toolbar>
    );
  }

  return (
    <Toolbar style={{ display: "flex", backgroundColor: "#fff" }}>
      <Link
        href="/"
        style={{ flex: 4, textDecoration: "none", color: "black" }}
      >
        <Typography>FindAPet</Typography>
      </Link>
      <Link
        href="/store"
        style={{
          justifyContent: "flex-end",
          marginRight: "20px",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Typography>Store</Typography>
      </Link>
      <Link
        href="/about"
        style={{
          justifyContent: "flex-end",
          marginRight: "20px",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Typography>About</Typography>
      </Link>
      <Link href="/login" style={{ textDecoration: "none", color: "black" }}>
        <Typography>Login</Typography>
      </Link>
    </Toolbar>
  );
}

export default Header;
