import React from "react";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function ActionButton({
  name,
  TypographyVariant,
  color,
  disabled,
  onClick,
  style,
}) {
  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <Typography
        component="span"
        variant={TypographyVariant}
        style={{ overflowX: "scroll" }}
      >
        {name}
      </Typography>
    </Button>
  );
}

export default ActionButton;
