import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import QuizSettings from "../components/QuizPageScreen/QuizSettings";
import Quizzes from "../components/QuizPageScreen/Quizzes";
import QuizResults from "../components/QuizPageScreen/QuizResults";

import { setFolder } from "../actions/folderActions";
import { setQuizzes } from "../actions/quizActions";

function QuizPageScreen() {
  const history = useHistory();
  const { id } = useParams();

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [questionCount, setQuestionCount] = useState(10);
  const [score, setScore] = useState(0);
  const [wrongQuizList, setWrongQuizList] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const folderSet = useSelector((state) => state.folderSet);
  const { loading: folderLoading, error: folderError, folder } = folderSet;

  const quizSet = useSelector((state) => state.quizSet);
  const { loading: quizLoading, error: quizError, quizList } = quizSet;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) history.push("/login");
    else {
      dispatch(setFolder(id));
      dispatch(setQuizzes(id));
    }
  }, [history, userInfo, dispatch, id]);

  return (
    <Box>
      {folderLoading && quizLoading ? (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : folderError ? (
        <Alert severity="error">{folderError}</Alert>
      ) : quizError ? (
        <Alert severity="error">{quizError}</Alert>
      ) : (
        quizList &&
        folder && (
          <Box>
            {isStarted ? (
              isFinished ? (
                <QuizResults
                  questionCount={questionCount}
                  score={score}
                  wrongQuizList={wrongQuizList}
                  setIsFinished={setIsFinished}
                  setIsStarted={setIsStarted}
                  setWrongQuizList={setWrongQuizList}
                  setScore={setScore}
                />
              ) : (
                <Quizzes
                  setIsFinished={setIsFinished}
                  questionCount={questionCount}
                  setScore={setScore}
                  setWrongQuizList={setWrongQuizList}
                />
              )
            ) : (
              <QuizSettings
                setIsStarted={setIsStarted}
                questionCount={questionCount}
                setQuestionCount={setQuestionCount}
              />
            )}
          </Box>
        )
      )}
    </Box>
  );
}

export default QuizPageScreen;
