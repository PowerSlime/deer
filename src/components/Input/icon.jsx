import Icon from "@mdi/react";
import PropTypes from "prop-types";
import React from "react";

const InputIcon = (props) => {
    return <Icon path={props.icon} size={props.size} />;
};

InputIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number,
};

InputIcon.defaultProps = {
    size: 1,
};

export default React.memo(InputIcon);
