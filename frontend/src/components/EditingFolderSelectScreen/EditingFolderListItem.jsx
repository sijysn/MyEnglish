import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import FolderIcon from "@material-ui/icons/Folder";

import FolderDeleteDialog from "./FolderDeleteDialog";

function EditingFolderListItem({ folderId, name }) {
  return (
    <ListItem divider style={{ position: "relative" }}>
      <Box width="90%" style={{ overflowX: "hidden" }}>
        <Link to={`/editings/folders/${folderId}/quizzes`}>
          <Box display="flex" alignItems="center">
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>

            <Box width="90%" style={{ overflowX: "hidden" }}>
              <ListItemText
                primary={name}
                primaryTypographyProps={{ component: "span", variant: "h4" }}
              />
            </Box>
          </Box>
        </Link>
      </Box>

      <ListItemIcon>
        <Tooltip title="編集">
          <Link to={`/editings/folders/${folderId}/edit`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
      </ListItemIcon>

      <ListItemIcon>
        <FolderDeleteDialog name={name} folderId={folderId} />
      </ListItemIcon>
    </ListItem>
  );
}

export default EditingFolderListItem;
