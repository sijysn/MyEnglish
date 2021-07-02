import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import QuizResultList from "./QuizResultList";
import LinkButton from "../LinkButton";
import ActionButton from "../ActionButton";

function QuizResults({
  questionCount,
  score,
  wrongQuizList,
  setIsStarted,
  setIsFinished,
  setWrongQuizList,
  setScore,
}) {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { folder } = folderSet;

  const quizSet = useSelector((state) => state.quizSet);
  const { quizList } = quizSet;

  const retry = () => {
    setIsStarted(false);
    setIsFinished(false);
    setWrongQuizList([]);
    setScore(0);
  };

  const keyDown = useCallback((e) => {
    if (e.keyCode === 13) retry();
  }, []);

  useEffect(() => {
    if (!userInfo) history.push("/login");
  }, [history, userInfo]);

  useEffect(() => {
    document.addEventListener("keydown", keyDown);

    return () => document.removeEventListener("keydown", keyDown);
  }, [keyDown]);

  return (
    <Container>
      <Box
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        mb="10vh"
        style={{ overflowY: "scroll" }}
      >
        <Typography component="h1" variant="h2" paragraph>
          クイズ結果
        </Typography>

        <Typography component="h2" variant="h3" paragraph>
          {folder.name}
        </Typography>

        <Typography component="h2" variant="h3" paragraph>
          {score} / {questionCount} 問正解！
        </Typography>

        <Box mt={5}>
          <QuizResultList wrongQuizList={wrongQuizList} quizList={quizList} />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          <LinkButton
            to={`/editings/folders`}
            color="inherit"
            name="クイズ編集"
            style={{
              margin: "2rem",
            }}
          />

          <ActionButton
            name="リトライ"
            TypographyVariant="h5"
            color="inherit"
            onClick={retry}
            style={{ padding: "1rem 2rem", margin: "2rem", width: "14rem" }}
          />

          <LinkButton
            to="/"
            color="inherit"
            name="トップ"
            style={{
              margin: "2rem",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default QuizResults;
