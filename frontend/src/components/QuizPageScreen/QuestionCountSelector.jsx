import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import ActionButton from "../ActionButton";

import hankakuToZenkaku from "../../utils/hankakuToZenkaku";

function QuestionCountSelector({
  error,
  questionCount,
  setQuestionCount,
  quizList,
}) {
  return (
    <Box>
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
    </Box>
  );
}

export default QuestionCountSelector;
