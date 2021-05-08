import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function LinkButton({ to, color, style, name }) {
  return (
    <Box style={style}>
      <Link to={to} color={color} style={{ display: "block" }}>
        <Button
          variant="outlined"
          color={color}
          style={{ padding: "1rem 2rem", width: "14rem" }}
        >
          <Typography component="span" variant="h5">
            {name}
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}

export default LinkButton;
