import React from "react";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import LinkButton from "../components/LinkButton";

function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        pt={5}
        pb="10rem"
        maxHeight="100vh"
        style={{ overflowY: "scroll" }}
      >
        <Box pb={10}>
          <img
            src="https://res.cloudinary.com/dfw3mlaic/image/upload/v1620460832/MyEnglish/MyEnglish_aedvce.png"
            alt="Icon"
            className="home__icon"
          />

          <Typography component="h1" variant="h1" gutterBottom>
            <strong>My English</strong>
          </Typography>

          <Typography component="h2" variant="h4">
            ”自分だけ”の英単語クイズを作ろう！
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center">
          <LinkButton
            to={userInfo ? "/quizzes/folders" : "/login"}
            color="inherit"
            name="クイズ開始"
            style={{
              margin: "2rem",
            }}
          />

          <LinkButton
            to={userInfo ? "/editings/folders" : "/login"}
            color="inherit"
            name="クイズ編集"
            style={{
              margin: "2rem",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default HomeScreen;
