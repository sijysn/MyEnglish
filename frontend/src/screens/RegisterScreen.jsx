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

import { login, register } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../consts/userConsts";

function RegisterScreen() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(firstName, lastName, email, password));
  };

  useEffect(() => {
    if (userInfo) history.push("/");
  }, [userInfo, history]);

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_REGISTER_RESET });
      dispatch(login(email, password));
    }
  }, [success, dispatch, email, password]);

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
        <Typography component="h1" variant="h3">
          ユーザー登録
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={submitHandler} className="login__form">
          <TextField
            required
            label="氏"
            fullWidth
            margin="normal"
            autoFocus
            autoComplete="email"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "1.5rem" },
            }}
            InputProps={{
              style: { fontSize: "1.5rem" },
            }}
          />

          <TextField
            required
            label="名"
            fullWidth
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputLabelProps={{
              style: { fontSize: "1.5rem" },
            }}
            InputProps={{
              style: { fontSize: "1.5rem" },
            }}
          />

          <TextField
            required
            type="email"
            label="メールアドレス"
            fullWidth
            margin="normal"
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
          />

          <Box mt={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ padding: "1rem 2rem", width: "14rem" }}
            >
              <Typography component="span" variant="h5">
                登録
              </Typography>
            </Button>
          </Box>

          <Box p={3}>
            <Link to="/login">
              <Typography component="span" variant="h6">
                既にアカウントがありますか? &nbsp; ログイン
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterScreen;
