import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  "@global": {
    ".grow": {
      flexGrow: 1
    }
  }
});

function GlobalCss() {
  useStyles();

  return <div />;
}

export default GlobalCss;
