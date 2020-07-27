import { useEffect, useState } from "react";

const useBinding = (value) => {
    const [state, setState] = useState(value);
    useEffect(() => {
        setState(value);
    }, [value, setState]);
    return [state, setState];
};

export default useBinding;
