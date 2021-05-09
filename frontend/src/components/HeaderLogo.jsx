import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function HeaderLogo() {
  return (
    <Box alignItems="center" display="flex">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dfw3mlaic/image/upload/v1620460832/MyEnglish/MyEnglish_aedvce.png"
          alt="Icon"
          className="header__icon"
        />
      </Link>
      <Link to="/">
        <Typography
          component="span"
          variant="h4"
          style={{ verticalAlign: "8px" }}
        >
          My English
        </Typography>
      </Link>
    </Box>
  );
}

export default HeaderLogo;
