import React from "react";

import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function QuizResultListItem({ index, word, meaning, mistake }) {
  return (
    <ListItem divider>
      <Box mr={2}>
        <ListItemText
          primary={index}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>

      <Box width="30%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={word}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>

      <Box width="30%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={meaning}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>

      <Box width="35%" px={3} style={{ overflowX: "hidden" }}>
        <ListItemText
          primary={typeof mistake === "number" ? mistake + 1 : mistake}
          primaryTypographyProps={{ component: "span", variant: "h4" }}
        />
      </Box>
    </ListItem>
  );
}

export default QuizResultListItem;
