import React from "react";
import config from "config";

import { TwitterButton, TwitterLogo } from "./styles";

export default () => (
  <TwitterButton href={`${config.host}/connect/twitter`} target="_blank">
    <p>Log In</p> <TwitterLogo className="fa fa-twitter" />
  </TwitterButton>
);
