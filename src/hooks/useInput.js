import { useCallback } from "react";

import useBinding from "./useBinding";

const filterNaN = (func, v) => {
    const result = func(v);
    return isNaN(result) ? undefined : result;
};

const typeHandlers = {
    string: (v) => `${v}`,
    number: (v) => filterNaN(parseFloat, v),
    integer: (v) => filterNaN(parseInt, v),
};

/**
 * Will return value according passed type, which by default is string
 */
const useInput = (defaultValue, options = {}) => {
    const [value, setValue] = useBinding(defaultValue);
    options.type = options.type ?? "string";

    const handleInputEvent = useCallback(
        (event) => {
            const handler = typeHandlers[options.type];
            const _value = event.target.value;
            setValue(handler ? handler(_value) : _value);
        },
        [options.type, setValue],
    );

    return [value, handleInputEvent];
};

export default useInput;
