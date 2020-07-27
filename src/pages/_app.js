import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import React from "react";

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
