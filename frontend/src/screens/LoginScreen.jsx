import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { login } from "../actions/userActions";

function LoginScreen() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) history.push("/");
  }, [history, userInfo]);

  return (
    <Container maxWidth="sm">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <img
          src="https://res.cloudinary.com/dfw3mlaic/image/upload/v1620460832/MyEnglish/MyEnglish_aedvce.png"
          alt="Icon"
          className="login__icon"
        />
        <Typography component="h1" variant="h2">
          ログイン
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={submitHandler} className="login__form">
          <TextField
            required
            type="email"
            label="メールアドレス"
            fullWidth
            margin="normal"
            autoFocus
            autoComplete="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "1.5rem" },
            }}
            InputProps={{
              style: { fontSize: "1.5rem" },
            }}
          />

          <TextField
            required
            type="password"
            label="パスワード"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "1.5rem" },
            }}
            InputProps={{
              style: { fontSize: "1.5rem" },
            }}
            s
          />

          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ padding: "1rem 2rem", width: "14rem" }}
            >
              <Typography component="span" variant="h5">
                ログイン
              </Typography>
            </Button>
          </Box>

          <Box p={3}>
            <Link to="/register">
              <Typography component="span" variant="h6">
                アカウントがありませんか? &nbsp; 新規登録
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default LoginScreen;
