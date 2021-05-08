import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

function EmailAddressSettingScreen() {
  const history = useHistory();

  const [email, setEmail] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userProfile } = userDetails;

  const dispatch = useDispatch();

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(updateUserDetails());
  //   dispatch(login(email, password));
  // };

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push("/login");
  //   } else {
  //     dispatch(getUserDetails());
  //   }
  // }, [history, userInfo, dispatch]);

  return (
    <Box>
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
    </Box>
  );
}

export default EmailAddressSettingScreen;
