import React from "react";
import { hot } from "react-hot-loader";

import DeerIO from "./deer-io";
import Navbar from "./nav-bar";

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <DeerIO />
            </div>
        );
    }
}


export default hot(module)(App);