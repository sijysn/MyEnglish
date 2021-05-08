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

function QuizCreateScreen() {
  const history = useHistory();
  const { folderId } = useParams();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const createQuizHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(
      "/api/quizzes/create/",
      { word: word, meaning: meaning, folderId: folderId },
      config
    );
    setLoading(false);
    history.push(`/editings/folders/${folderId}/quizzes`);
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

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
          クイズ作成
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={createQuizHandler} className="login__form">
            <TextField
              required
              label="単語"
              fullWidth
              margin="normal"
              autoFocus
              variant="outlined"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <TextField
              required
              label="意味"
              fullWidth
              margin="normal"
              variant="outlined"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
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
                to={`/editings/folders/${folderId}/quizzes`}
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

export default QuizCreateScreen;
