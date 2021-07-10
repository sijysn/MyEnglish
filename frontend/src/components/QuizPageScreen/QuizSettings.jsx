import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import QuestionCountSelector from "./QuestionCountSelector";

import LinkButton from "../LinkButton";
import ActionButton from "../ActionButton";

function QuizSettings({ setIsStarted, questionCount, setQuestionCount }) {
  const history = useHistory();

  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { folder } = folderSet;

  const quizSet = useSelector((state) => state.quizSet);
  const { quizList } = quizSet;

  const startQuiz = () => setIsStarted(true);

  const keyDownForStartQuiz = useCallback(
    (e) => {
      if (error || e.keyCode !== 13) return;

      setIsStarted(true);
    },
    [error, setIsStarted]
  );

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

  useEffect(() => {
    document.addEventListener("keydown", keyDownForStartQuiz);

    return () => document.removeEventListener("keydown", keyDownForStartQuiz);
  }, [keyDownForStartQuiz]);

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

        <Typography component="h2" variant="h4" paragraph>
          {folder.name}
        </Typography>

        <QuestionCountSelector
          error={error}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          quizList={quizList}
        />

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          <ActionButton
            name="クイズ開始"
            TypographyVariant="h5"
            color="inherit"
            disabled={error ? true : false}
            onClick={startQuiz}
            style={{ padding: "1rem 2rem", margin: "2rem", width: "14rem" }}
          />

          <LinkButton
            to={`/editings/folders/${folder.id}/quizzes`}
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
