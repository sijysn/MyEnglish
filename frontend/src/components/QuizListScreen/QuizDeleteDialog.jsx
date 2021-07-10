import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Backdrop from "@material-ui/core/Backdrop";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteQuiz } from "../../actions/quizActions";

import { QUIZ_DELETE_RESET } from "../../consts/quizConsts";

function QuizDeleteDialog({ word, meaning, quizId }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [backdropIsOpen, setBackdropIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const quizDelete = useSelector((state) => state.quizDelete);
  const { success } = quizDelete;

  const dispatch = useDispatch();

  const openDialog = () => setDialogIsOpen(true);
  const closeDialog = () => setDialogIsOpen(false);

  const deleteHandler = async () => {
    setLoading(true);
    setBackdropIsOpen(true);
    dispatch(deleteQuiz(quizId));
  };

  const cancelHandler = () => {
    setBackdropIsOpen(false);
    setLoading(false);
    setDialogIsOpen(false);
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: QUIZ_DELETE_RESET });
      setDialogIsOpen(false);
      setLoading(false);
    }
  }, [dispatch, success]);

  return (
    <Box color="inherit">
      <Tooltip title="削除">
        <IconButton onClick={openDialog}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {loading ? (
        <Backdrop open={backdropIsOpen} style={{ zIndex: 1 }}>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Box textAlign="center">
              <CircularProgress
                style={{ backgroundColor: "transparent", color: "#fff" }}
              />
            </Box>

            <Button
              onClick={cancelHandler}
              variant="contained"
              style={{
                color: "#f50057",
                margin: "5rem auto 0",
                padding: "1rem 2rem",
              }}
            >
              <Typography component="span" variant="h5">
                キャンセル
              </Typography>
            </Button>
          </Box>
        </Backdrop>
      ) : (
        <Dialog open={dialogIsOpen} onClose={closeDialog}>
          <DialogTitle style={{ color: "#f50057" }}>
            本当に削除しますか？
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              削除されたデータは二度と戻りません。
              <br />
              <br />
              {"  "}単語： {word}
              <br />
              {"  "}意味： {meaning}
              <br />
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closeDialog} color="primary">
              キャンセル
            </Button>
            <Button onClick={deleteHandler} color="secondary">
              削除
            </Button>
          </DialogActions>{" "}
        </Dialog>
      )}
    </Box>
  );
}

export default QuizDeleteDialog;
