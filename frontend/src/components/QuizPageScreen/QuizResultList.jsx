import React from "react";

import Box from "@material-ui/core/Box";

import QuizResultListItem from "./QuizResultListItem";

function QuizResultList({ wrongQuizList, quizList }) {
  return (
    <Box pt={10} maxHeight="50vh" style={{ overflowY: "scroll" }}>
      {wrongQuizList.length > 0 && (
        <QuizResultListItem
          index="#"
          word="単語"
          meaning="意味"
          mistake="間違えた回数"
        />
      )}

      {wrongQuizList.map((questionCount, index) => (
        <QuizResultListItem
          index={index + 1}
          word={quizList[questionCount].word}
          meaning={quizList[questionCount].meaning}
          mistake={quizList[questionCount].mistake}
          key={quizList[questionCount].id}
        />
      ))}
    </Box>
  );
}

export default QuizResultList;
