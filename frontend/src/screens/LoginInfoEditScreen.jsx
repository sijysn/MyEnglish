import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import SettingsHeader from "../components/SettingsHeader";

import { USER_DETAILS_UPDATE_RESET } from "../consts/userConsts";

import { login, updateUserDetails } from "../actions/userActions";

function LoginInfoEditScreen() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetailsUpdate = useSelector((state) => state.userDetailsUpdate);
  const { loading, success, error, userProfile } = userDetailsUpdate;

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(email, password));
  };

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else setEmail(userInfo.email);
  }, [history, userInfo]);

  useEffect(() => {
    if (success && userProfile) {
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
      dispatch(login(email, password));
      history.push("/profile");
    }
  }, [dispatch, success, userProfile, history, email, password]);

  useEffect(() => {
    if (password !== confirmPassword) setMessage("Passwords do not match");
    else setMessage("");
  }, [password, confirmPassword]);

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
          <SettingsHeader to="/profile" title="ログイン情報設定" />

          {loading ? (
            <CircularProgress />
          ) : (
            <Box>
              <form onSubmit={updateHandler} className="login__form">
                <TextField
                  required
                  type="email"
                  label="メールアドレス"
                  fullWidth
                  margin="normal"
                  autoFocus
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  required
                  type="password"
                  label="パスワード"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  required
                  type="password"
                  label="確認用パスワード"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="error">{message}</Alert>}

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{
                    padding: "1rem 2rem",
                    width: "14rem",
                    margin: "2rem 2rem 0",
                  }}
                >
                  変更
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default LoginInfoEditScreen;
