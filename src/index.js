"use strict";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components";

require("bootstrap/dist/css/bootstrap.min.css");
require("shards-ui/dist/css/shards.min.css");
require("shards-ui/dist/js/shards.min");
require("font-awesome/css/font-awesome.min.css");

ReactDOM.render(<App />, document.getElementById("root"));
