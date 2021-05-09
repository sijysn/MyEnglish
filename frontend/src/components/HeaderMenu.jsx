import React, { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Logout from "./Logout";

function HeaderMenu() {
  const [anchorEl, setAnchorEl] = useState("");

  const clickHandler = (e) => setAnchorEl(e.currentTarget);
  const closeHandler = () => setAnchorEl("");

  return (
    <Box>
      <Button color="inherit" onClick={clickHandler}>
        <Typography component="span" variant="h5" color="inherit">
          メニュー
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeHandler}
      >
        <MenuItem onClick={closeHandler}>
          <Link to="/profile">
            <Typography component="span" variant="h5" color="primary">
              プロフィール設定
            </Typography>
          </Link>
        </MenuItem>

        <MenuItem onClick={closeHandler}>
          <Logout />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default HeaderMenu;
