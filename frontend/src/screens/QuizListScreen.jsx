import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import QuizListItem from "../components/QuizListScreen/QuizListItem";
import LinkButton from "../components/LinkButton";

import { setFolder } from "../actions/folderActions";
import { getAllQuizzes } from "../actions/quizActions";

function QuizListScreen() {
  const history = useHistory();
  const { folderId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { loading: folderLoading, error: folderError, folder } = folderSet;

  const allQuizzes = useSelector((state) => state.allQuizzes);
  const { loading: quizLoading, error: quizError, quizList } = allQuizzes;

  const quizDelete = useSelector((state) => state.quizDelete);
  const { success } = quizDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else {
      dispatch(setFolder(folderId));
      dispatch(getAllQuizzes(folderId));
    }
  }, [history, userInfo, dispatch, folderId]);

  useEffect(() => {
    if (success) {
      dispatch(getAllQuizzes(folderId));
    }
  }, [dispatch, success, folderId]);

  return (
    <Container maxWidth="md">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Box>
          <Typography component="h1" variant="h4" paragraph>
            クイズ一覧
          </Typography>

          {folderLoading && quizLoading ? (
            <CircularProgress />
          ) : folderError ? (
            <Alert severity="error">{folderError}</Alert>
          ) : quizError ? (
            <Alert severity="error">{quizError}</Alert>
          ) : (
            quizList &&
            folder && (
              <Box>
                <Typography component="h1" variant="h4" paragraph>
                  {folder.name}
                </Typography>

                <Typography component="h1" variant="h4" paragraph>
                  {quizList.length}問
                </Typography>

                <List
                  style={{
                    maxHeight: "50vh",
                    width: "100%",
                    margin: "0 auto",
                    overflowY: "scroll",
                  }}
                >
                  {quizList.map((quiz, index) => (
                    <QuizListItem
                      key={quiz.id}
                      word={quiz.word}
                      meaning={quiz.meaning}
                      quizId={quiz.id}
                      isActive={quiz.is_active}
                      index={index + 1}
                    />
                  ))}
                </List>
              </Box>
            )
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <LinkButton
            to={`/editings/folders/${folderId}/create`}
            color="inherit"
            name="クイズ作成"
            style={{
              margin: "2rem",
            }}
          />

          <LinkButton
            to={`/editings/folders`}
            color="inherit"
            name="戻る"
            style={{
              margin: "2rem",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default QuizListScreen;
