import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Logout from "./Logout";

function Header() {
  const [anchorEl, setAnchorEl] = useState("");

  const clickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl("");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Box
      display="fixed"
      top="0"
      right="0"
      left="0"
      p={2}
      boxShadow="0 1px 1px 0 rgba(26, 80, 139, 0.3)"
    >
      <Container maxWidth="md">
        <Box position="relative">
          <Box alignItems="center" display="flex">
            <Link to="/">
              <img
                src="/images/MyEnglish.png"
                alt="Icon"
                className="header__icon"
              />
            </Link>
            <Link to="/">
              <Typography
                component="span"
                variant="h4"
                style={{ verticalAlign: "8px" }}
              >
                My English
              </Typography>
            </Link>
          </Box>

          <Box
            position="absolute"
            right="0"
            top="50%"
            style={{ transform: "translateY(-50%)" }}
          >
            {userInfo ? (
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
            ) : (
              <Link to="/login" color="inherit" style={{ padding: "1rem" }}>
                <Typography component="span" variant="h5" color="inherit">
                  ログイン
                </Typography>
              </Link>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
