import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Box
      display="fixed"
      top="0"
      right="0"
      left="0"
      p={2}
      borderBottom="solid 1px rgba(26, 80, 139, 0.3)"
    >
      <Container maxWidth="md">
        <Box position="relative">
          <HeaderLogo />

          <Box
            position="absolute"
            right="0"
            top="50%"
            style={{ transform: "translateY(-50%)" }}
          >
            {userInfo ? (
              <HeaderMenu />
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
