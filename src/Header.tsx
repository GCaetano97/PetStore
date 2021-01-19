import { Toolbar, Typography } from "@material-ui/core";
import Link from "./Link";
import React from "react";

function Header() {
  return (
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography>FindAPet</Typography>
      <Link href="/about">
        <Typography>About</Typography>
      </Link>
    </Toolbar>
  );
}

export default Header;
