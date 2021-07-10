import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import LinkButton from "../components/LinkButton";

import { listFolders } from "../actions/folderActions";

function FolderCreateScreen() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const createFolderHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/api/folders/create/", { name: name }, config);
    dispatch(listFolders());
    setLoading(false);
    history.push("/editings/folders");
  };

  useEffect(() => {
    if (!userInfo) history.push("/login");
  }, [dispatch, history, userInfo]);

  return (
    <Container maxWidth="sm">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h3">
          フォルダ作成
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={createFolderHandler} className="login__form">
            <TextField
              required
              label="フォルダ名"
              fullWidth
              margin="normal"
              autoFocus
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: { fontSize: "1.5rem" },
              }}
              InputProps={{
                style: { fontSize: "1.5rem" },
              }}
            />

            <Box mt={10} display="flex" justifyContent="center">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{
                  padding: "1rem 2rem",
                  width: "14rem",
                  margin: "0 2rem",
                }}
              >
                <Typography component="span" variant="h5">
                  作成
                </Typography>
              </Button>

              <LinkButton
                to="/editings/folders"
                color="inherit"
                name="キャンセル"
                style={{ margin: "0 2rem" }}
              />
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
}

export default FolderCreateScreen;
