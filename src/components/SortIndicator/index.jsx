import cn from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./styles.module.sass";

const SortIndicator = ({ isDescending, isActive, className }) => {
    return (
        <span className={cn(styles.Container, className)}>
            <div className={cn({ [styles.ArrowUp]: true, [styles.Active]: isActive && !isDescending })} />
            <div className={cn({ [styles.ArrowDown]: true, [styles.Active]: isActive && isDescending })} />
        </span>
    );
};

SortIndicator.propTypes = {
    isDescending: PropTypes.bool,
    isActive: PropTypes.bool,
    className: PropTypes.string,
};

SortIndicator.defaultProps = {
    isDescending: false,
    isActive: false,
};

export default SortIndicator;
