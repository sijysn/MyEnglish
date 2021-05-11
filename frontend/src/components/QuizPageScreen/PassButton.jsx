import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import ActionButton from "../ActionButton";

function PassButton({ judge, passQuestion }) {
  return (
    <Box textAlign="center">
      <ActionButton
        name="Pass"
        TypographyVariant="h4"
        color="default"
        disabled={judge ? true : false}
        onClick={passQuestion}
        style={{ padding: "1rem 2rem", width: "14rem" }}
      />

      <Typography
        component="span"
        variant="h5"
        color={judge ? "textSecondary" : "textPrimary"}
        style={{ display: "block" }}
      >
        ↓
      </Typography>
    </Box>
  );
}

export default PassButton;
