import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Alert from "@material-ui/lab/Alert";

import SettingsHeader from "../components/SettingsHeader";

import { USER_DETAILS_UPDATE_RESET } from "../consts/userConsts";
import { genderIdentities } from "../consts/genderConsts";

import { getUserDetails, updateUserDetails } from "../actions/userActions";

function UserInfoEditScreen() {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genderIdentity, setGenderIdentity] = useState("");
  const [inputGenderIdentity, setInputGenderIdentity] = useState("");
  const [profession, setProfession] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userDetailsUpdate = useSelector((state) => state.userDetailsUpdate);
  const { loading: updating, success, userProfile } = userDetailsUpdate;

  const dispatch = useDispatch();

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserDetails(
        "",
        "",
        firstName,
        lastName,
        genderIdentity,
        birthDate,
        profession
      )
    );
  };

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (!user) dispatch(getUserDetails());
    else {
      setFirstName(user.first_name ? user.first_name : "");
      setLastName(user.last_name ? user.last_name : "");
      setBirthDate(user.birth_date ? user.birth_date : "");
      setGenderIdentity(user.gender_identity ? user.gender_identity : "未回答");
      setProfession(user.profession ? user.profession : "");
    }
  }, [history, userInfo, user, dispatch]);

  useEffect(() => {
    if (success && userProfile) {
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
      history.push("/profile");
    }
  }, [dispatch, success, history, userProfile]);

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
          <SettingsHeader to="/profile" title="ユーザー情報設定" />

          {loading || updating ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box>
              <form onSubmit={updateHandler} className="login__form">
                <TextField
                  required
                  label="氏"
                  fullWidth
                  margin="normal"
                  autoFocus
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  required
                  label="名"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <TextField
                  type="date"
                  label="生年月日"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: "1.5rem" },
                  }}
                  InputProps={{
                    style: { fontSize: "1.5rem" },
                  }}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />

                <Autocomplete
                  fullWidth
                  options={genderIdentities}
                  value={genderIdentity}
                  onChange={(e, newValue) => setGenderIdentity(newValue)}
                  inputValue={inputGenderIdentity}
                  onInputChange={(e, newInputValue) =>
                    setInputGenderIdentity(newInputValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="性別"
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />

                <TextField
                  label="職業"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />

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

export default UserInfoEditScreen;
