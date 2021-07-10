import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import EditingFolderListItem from "../components/EditingFolderSelectScreen/EditingFolderListItem";
import LinkButton from "../components/LinkButton";

import { listFolders } from "../actions/folderActions";

function EditingFolderSelectScreen() {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderList = useSelector((state) => state.folderList);
  const { loading, error, folders } = folderList;

  const folderDelete = useSelector((state) => state.folderDelete);
  const { success } = folderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (!folders) dispatch(listFolders());
  }, [history, userInfo, folders, dispatch]);

  useEffect(() => {
    if (success) dispatch(listFolders());
  }, [dispatch, success]);

  return (
    <Container maxWidth="md">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h3">
          フォルダを選択
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          folders && (
            <List
              style={{
                maxHeight: "50vh",
                width: "80%",
                margin: "0 auto",
                overflowY: "scroll",
              }}
            >
              {folders.map((folder) => (
                <EditingFolderListItem
                  folderId={folder.id}
                  name={folder.name}
                  key={folder.id}
                />
              ))}
            </List>
          )
        )}

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <LinkButton
            to="/editings/folders/create"
            color="inherit"
            name="フォルダ作成"
            style={{
              margin: "2rem",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default EditingFolderSelectScreen;
