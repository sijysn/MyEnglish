import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function SettingsListItem({ title, to }) {
  return (
    <ListItem divider>
      <Box width="90%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>

      <ListItemIcon>
        <Tooltip title="変更">
          <Link to={to}>
            <ArrowForwardIosIcon />
          </Link>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  );
}

export default SettingsListItem;
