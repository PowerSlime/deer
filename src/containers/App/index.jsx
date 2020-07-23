import React, { useState } from "react";

import AppFilters from "./filters";
import AppResults from "./results";
import styles from "./styles.module.sass";

const App = () => {
    const [params, setParams] = useState({
        search: "",
        price: {
            min: undefined,
            max: undefined,
        },
        count: {
            min: undefined,
            max: undefined,
        },
    });

    return (
        <React.Fragment>
            <AppFilters className={styles.Filters} params={params} onSubmit={setParams} />
            <AppResults params={params} />
        </React.Fragment>
    );
};

export default App;
