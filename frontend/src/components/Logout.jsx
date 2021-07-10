import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { logout } from "../actions/userActions";

function Logout() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box color="inherit">
      <Typography
        component="span"
        variant="h5"
        onClick={openDialog}
        color="secondary"
      >
        ログアウト
      </Typography>
      <Dialog open={isOpen} onClose={closeDialog}>
        <DialogTitle style={{ color: "#f50057" }}>
          本当にログアウトしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText>データは保存されます。</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog} color="primary">
            キャンセル
          </Button>
          <Button onClick={logoutHandler} color="secondary">
            ログアウト
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Logout;
