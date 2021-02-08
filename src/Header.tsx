import { Toolbar, Typography } from "@material-ui/core";
import Link from "./Link";
import React from "react";

function Header() {
  return (
    <Toolbar style={{ display: "flex", backgroundColor: '#fff'}}>
      <Link href="/" style={{ flex: 4, textDecoration: 'none', color: 'black' }}>
        <Typography>FindAPet</Typography>
      </Link>
      <Link
        href="/store"
        style={{ justifyContent: "flex-end", marginRight: "20px", textDecoration: 'none', color: 'black' }}
      >
        <Typography>Store</Typography>
      </Link>
      <Link href="/about" style={{ justifyContent: "flex-end", marginRight: "20px", textDecoration: 'none', color: 'black' }}>
        <Typography>About</Typography>
      </Link>
      <Link href="/login" style={{ textDecoration: 'none', color: 'black' }}>
        <Typography>Login</Typography>
      </Link>
    </Toolbar>
  );
}

export default Header;
