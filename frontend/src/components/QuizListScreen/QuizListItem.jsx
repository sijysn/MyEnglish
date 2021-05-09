import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import QuizDeleteDialog from "./QuizDeleteDialog";

function QuizListItem({ word, meaning, quizId, isActive, index }) {
  const { folderId } = useParams();
  const [isChecked, setIsChecked] = useState(isActive);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const setQuizHandler = async () => {
    const {
      data: { is_active },
    } = await axios.put("/api/quizzes/set/", { quizId: quizId }, config);
    setIsChecked(is_active);
  };

  return (
    <ListItem divider>
      <Box mr={2}>
        <ListItemText
          primary={index}
          primaryTypographyProps={{ component: "span", variant: "h5" }}
        />
      </Box>

      <Box width="30%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={word}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>
      <Box width="50%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={meaning}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>

      {/* checkboxでis_activeを切り替え */}
      <Tooltip title={isChecked ? "出題する" : "出題しない"}>
        <Checkbox
          checked={isChecked}
          onChange={setQuizHandler}
          color="primary"
        />
      </Tooltip>

      <ListItemIcon>
        <Tooltip title="編集">
          <Link to={`/editings/folders/${folderId}/quizzes/${quizId}/edit`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </ListItemIcon>

      <ListItemIcon>
        <QuizDeleteDialog word={word} meaning={meaning} quizId={quizId} />
      </ListItemIcon>
    </ListItem>
  );
}

export default QuizListItem;
