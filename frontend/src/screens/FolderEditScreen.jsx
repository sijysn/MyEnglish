import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import LinkButton from "../components/LinkButton";

import { listFolders, setFolder } from "../actions/folderActions";

function FolderEditScreen() {
  const history = useHistory();
  const { folderId } = useParams();
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { loading, error, folder } = folderSet;

  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const updateFolderHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await axios.put(
      "/api/folders/update/",
      { name: name, folderId: folderId },
      config
    );
    dispatch(listFolders(folderId));
    setUpdating(false);
    history.push("/editings/folders");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(setFolder(folderId));
    }
  }, [dispatch, history, userInfo, folderId]);

  useEffect(() => {
    if (folder) {
      setName(folder.name);
    }
  }, [folder]);

  return (
    <Container maxWidth="sm">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h2">
          クイズ編集
        </Typography>

        {loading || updating ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          folder && (
            <form onSubmit={updateFolderHandler} className="login__form">
              <TextField
                required
                label="フォルダ名"
                fullWidth
                margin="normal"
                autoFocus
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                    変更
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
          )
        )}
      </Box>
    </Container>
  );
}

export default FolderEditScreen;
