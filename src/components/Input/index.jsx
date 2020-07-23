import PropTypes from "prop-types";
import React from "react";
import { Input as ReactStrapInput, InputGroupAddon, InputGroupText } from "reactstrap";

import InputIcon from "./icon";

const Icon = ({ icon, position, shouldRender }) => {
    if (!(icon && position && shouldRender)) {
        return null;
    }

    return (
        <InputGroupAddon addonType={position}>
            <InputGroupText>
                <InputIcon icon={icon} />
            </InputGroupText>
        </InputGroupAddon>
    );
};

Icon.propTypes = {
    icon: PropTypes.string,
    position: PropTypes.oneOf(["prepend", "append"]),
    shouldRender: PropTypes.bool,
};

Icon.defaultProps = {
    shouldRender: true,
};

const Input = (props) => {
    const icon = props.icon;
    const position = props.iconPosition;

    return (
        <React.Fragment>
            <Icon icon={icon} position={position} shouldRender={position === "prepend"} />
            <ReactStrapInput
                value={props.value}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
            />
            <Icon icon={icon} position={position} shouldRender={position === "append"} />
        </React.Fragment>
    );
};

Input.propTypes = {
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(["prepend", "append"]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
};

Input.defaultProps = {
    icon: "",
    iconPosition: "prepend",
    onChange: () => undefined,
    type: "text",
    value: "",
};

export default Input;
