import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";

function QuizFolderListItem({ name }) {
  return (
    <ListItem divider>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>

      <ListItemText
        primary={name}
        primaryTypographyProps={{ component: "span", variant: "h4" }}
      />
    </ListItem>
  );
}

export default QuizFolderListItem;
