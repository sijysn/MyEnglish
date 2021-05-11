import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import QuizOptionButtons from "./QuizOptionButtons";
import PassButton from "./PassButton";

function Quizzes({ setIsFinished, questionCount, setScore, setWrongQuizList }) {
  const history = useHistory();

  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [shuffledQuizList, setShuffledQuizList] = useState();
  const [options, setOptions] = useState();
  const [judge, setJudge] = useState("");

  const ref = useRef([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { folder } = folderSet;

  const quizSet = useSelector((state) => state.quizSet);
  const { quizList } = quizSet;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const correctSound = new Audio(
    "https://res.cloudinary.com/dfw3mlaic/video/upload/v1620492082/MyEnglish/correct_cigmpr.mp3"
  );

  const wrongSound = new Audio(
    "https://res.cloudinary.com/dfw3mlaic/video/upload/v1620492100/MyEnglish/wrong_hizze4.mp3"
  );

  const answerWrong = async () => {
    setJudge("wrong");
    wrongSound.play();
    wrongSound.currentTime = 0;

    setWrongQuizList((prev) => [...prev, currentQuestionCount]);

    // last-answerを「不正解」にする
    // mistakeに1をたす
    await axios.put(
      "/api/quizzes/last_answer/update/",
      {
        quizId: shuffledQuizList[currentQuestionCount].id,
        lastAnswer: "不正解",
      },
      config
    );
  };

  const answerCorrectly = async () => {
    setJudge("correct");
    correctSound.play();
    correctSound.currentTime = 0;

    setScore((prev) => prev + 1);

    // last-answerを「正解」にする
    await axios.put(
      "/api/quizzes/last_answer/update/",
      {
        quizId: shuffledQuizList[currentQuestionCount].id,
        lastAnswer: "正解",
      },
      config
    );
  };

  const checkAnswer = (e) => {
    const selectedMeaning =
      e.type === "click" ? e.target.innerText : e.current.innerText;

    if (selectedMeaning === quizList[currentQuestionCount].meaning)
      answerCorrectly();
    else answerWrong();
  };

  const changeQuestion = () => {
    if (currentQuestionCount < questionCount - 1)
      setCurrentQuestionCount((prev) => prev + 1);
    else setIsFinished(true);
  };

  const shuffle = useCallback((array) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);

  const createWrongAnswerNumber = (
    currentQuestionCount,
    wrongAnswerNumber1 = ""
  ) => {
    const wrongAnswerNumber = Math.floor(Math.random() * quizList.length);
    if (
      wrongAnswerNumber === currentQuestionCount ||
      wrongAnswerNumber === wrongAnswerNumber1
    ) {
      return createWrongAnswerNumber(currentQuestionCount, wrongAnswerNumber1);
    }
    return wrongAnswerNumber;
  };

  const changeOptions = () => {
    if (shuffledQuizList) {
      const correctAnswerIndex = currentQuestionCount + 1;
      const wrongAnswerIndex1 = createWrongAnswerNumber(
        currentQuestionCount + 1
      );
      const wrongAnswerIndex2 = createWrongAnswerNumber(
        currentQuestionCount + 1,
        wrongAnswerIndex1
      );

      setOptions(
        shuffle([
          shuffledQuizList[correctAnswerIndex],
          shuffledQuizList[wrongAnswerIndex1],
          shuffledQuizList[wrongAnswerIndex2],
        ])
      );
    }
  };

  const passQuestion = (e) => {
    e.preventDefault();

    answerWrong();

    setTimeout(() => {
      setJudge("");
      changeQuestion();
      changeOptions();
    }, 1000);
  };

  const answerQuestion = (e) => {
    e.preventDefault();

    checkAnswer(e);

    setTimeout(() => {
      setJudge("");
      changeQuestion();
      changeOptions();
    }, 1000);
  };

  const keyDown = useCallback((e) => {
    if (judge) return;

    const keyCode = e.keyCode;

    switch (keyCode) {
      case 37:
      case 38:
      case 39:
        checkAnswer(
          keyCode === 37
            ? ref.current.option1
            : keyCode === 38
            ? ref.current.option2
            : ref.current.option3
        );
        break;

      case 40:
        answerWrong();
        break;

      default:
        break;
    }

    setTimeout(() => {
      setJudge("");
      changeQuestion();
      changeOptions();
    }, 1000);
  });

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else if (quizList) setShuffledQuizList(shuffle(quizList));
  }, [history, userInfo, shuffle, quizList]);

  useEffect(() => {
    if (shuffledQuizList) {
      const correctAnswerIndex = currentQuestionCount;
      const wrongAnswerIndex1 = createWrongAnswerNumber(currentQuestionCount);
      const wrongAnswerIndex2 = createWrongAnswerNumber(
        currentQuestionCount,
        wrongAnswerIndex1
      );

      setOptions(
        shuffle([
          shuffledQuizList[correctAnswerIndex],
          shuffledQuizList[wrongAnswerIndex1],
          shuffledQuizList[wrongAnswerIndex2],
        ])
      );
    }
  }, [shuffledQuizList, currentQuestionCount]);

  useEffect(() => {
    if (!shuffledQuizList) return;

    document.addEventListener("keydown", keyDown);

    return () => document.removeEventListener("keydown", keyDown);
  }, [shuffledQuizList, keyDown, ref]);

  return (
    <Container maxWidth="md">
      <Box pt={5} pb="10rem" maxHeight="100vh" style={{ overflowY: "scroll" }}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          my={3}
        >
          <Typography component="h2" variant="h4">
            {folder.name}
          </Typography>

          <Typography component="h2" variant="h4">
            {currentQuestionCount + 1} / {questionCount} 問
          </Typography>
        </Box>

        <Box textAlign="center">
          <Typography
            component="h1"
            variant="h1"
            style={{ width: "100%", overflowX: "scroll" }}
          >
            {shuffledQuizList && shuffledQuizList[currentQuestionCount].word}
          </Typography>
        </Box>

        <Box textAlign="center" mt={1} height="3rem">
          {judge === "correct" ? (
            <Typography component="span" variant="h3" color="primary">
              <Box color="#0e918c">正解!</Box>
            </Typography>
          ) : judge === "wrong" ? (
            <Typography component="span" variant="h3" color="secondary">
              残念...
            </Typography>
          ) : (
            " "
          )}
        </Box>

        <Box my={10}>
          {options && (
            <QuizOptionButtons
              options={options}
              judge={judge}
              answerQuestion={answerQuestion}
              ref={ref}
            />
          )}
        </Box>

        <Box margin="0 auto">
          <PassButton judge={judge} passQuestion={passQuestion} />
        </Box>
      </Box>
    </Container>
  );
}

export default Quizzes;
