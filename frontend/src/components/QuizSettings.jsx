import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import LinkButton from "./LinkButton";
import ActionButton from "./ActionButton";

function QuizSettings({ setIsStarted, questionCount, setQuestionCount }) {
  const history = useHistory();

  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { folder } = folderSet;

  const quizSet = useSelector((state) => state.quizSet);
  const { quizList } = quizSet;

  const hankakuToZenkaku = (str) => {
    return str.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };

  const startQuiz = () => setIsStarted(true);

  useEffect(() => {
    if (!userInfo) history.push("/login");
  }, [history, userInfo]);

  useEffect(() => {
    if (quizList.length < 10) setQuestionCount(quizList.length);
  }, [quizList, setQuestionCount]);

  useEffect(() => {
    if (quizList.length < 3) setError("3つ以上のクイズを登録してください");
    else if (questionCount > quizList.length || questionCount <= 0)
      setError(`1から${quizList.length}までの数字を入力してください`);
    else setError("");
  }, [questionCount, quizList]);

  return (
    <Container maxWidth="sm">
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h3" paragraph>
          クイズ設定
        </Typography>
        <Typography component="div" variant="h4" paragraph>
          {folder.name}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="10rem"
        >
          <Typography component="div" variant="h4">
            {error ? (
              <Alert severity="error">
                <Typography component="p" variant="h5">
                  {error}
                </Typography>
              </Alert>
            ) : (
              `出題数: ${questionCount}`
            )}
          </Typography>
        </Box>

        <Box my={3}>
          <Grid container direction="row" justify="center" spacing={1}>
            {[10, 20, 30, quizList.length].map((number, index) => (
              <Grid item xs={3} key={index}>
                <ActionButton
                  name={number}
                  TypographyVariant="h5"
                  color="primary"
                  onClick={(e) => setQuestionCount(Number(e.target.innerText))}
                  style={{ padding: "1rem 3rem" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box mr={2}>
            <Typography component="span" variant="h5">
              最大 {quizList.length} 問
            </Typography>
          </Box>
          <TextField
            type="number"
            label="数字を入れてくださいr"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setQuestionCount(Number(hankakuToZenkaku(e.target.value)))
            }
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          {error === "3つ以上のクイズを登録してください" ? (
            <LinkButton
              to={`/editings/folders/${folder.id}/quizzes/`}
              color="inherit"
              name="クイズ編集"
              style={{
                margin: "2rem",
              }}
            />
          ) : (
            <ActionButton
              name="クイズ開始"
              TypographyVariant="h5"
              color="inherit"
              disabled={error ? true : false}
              onClick={startQuiz}
              style={{ padding: "1rem 2rem", margin: "2rem", width: "14rem" }}
            />
          )}

          <LinkButton
            to={`/quizzes/folders`}
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

export default QuizSettings;
