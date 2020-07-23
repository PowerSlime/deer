import Head from "next/head";
import React from "react";

import NavigationBar from "../components/NavigationBar";

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Head>
                <title>DeerIO Enchanted</title>
            </Head>
            <div>
                <NavigationBar />
                <div className="container">{children}</div>
            </div>
        </React.Fragment>
    );
};

export default DefaultLayout;
