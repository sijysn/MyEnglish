import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import SettingsListItem from "../components/ProfileSettingsScreen/SettingsListItem";
import SettingsHeader from "../components/SettingsHeader";

function ProfileSettingsScreen() {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) history.push("/login");
  }, [history, userInfo]);

  return (
    <Box>
      <Container maxWidth="sm">
        <Box
          textAlign="center"
          pt={5}
          pb="10rem"
          maxHeight="100vh"
          style={{ overflowY: "scroll" }}
        >
          <SettingsHeader to="/" title="プロフィール設定" />

          <Box mt="3rem">
            <List>
              <SettingsListItem title="ログイン情報" to="/profile/logininfo" />
              <SettingsListItem title="ユーザー情報" to="/profile/userinfo" />
            </List>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProfileSettingsScreen;
