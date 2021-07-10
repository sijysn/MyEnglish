import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function SettingsHeader({ url, title, urlText = "戻る" }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={2}>
        <Link to={url}>
          <Typography component="h1" variant="h5" color="primary">
            {urlText}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={8}>
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default SettingsHeader;
