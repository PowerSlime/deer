"use strict";
import React from "react";
import {FormGroup, Input, InputGroup} from "reactstrap";
import {DelayInput} from "react-delay-input";
import FontAwesome from "react-fontawesome";


class InputIcon extends React.Component {
    render() {
        return (
            <span className={`input-group-${this.props.position}`}>
                <span className="input-group-text">
                    <FontAwesome name={this.props.icon} className={this.props.iconClassName}/>
                </span>
            </span>
        );
    }
}


class InputForm extends React.Component {
    render() {
        const prependIcon = this.props.prepend
            ? <InputIcon position="prepend" icon={this.props.icon} iconClassName={this.props.iconClassName}/>
            : null;

        const appendIcon = this.props.append
            ? <InputIcon position="append" icon={this.props.icon} iconClassName={this.props.iconClassName}/>
            : null;

        return (
            <FormGroup>
                <InputGroup className={this.props.seamless ? "input-group-seamless" : null}>
                    {prependIcon}
                    <DelayInput
                        element={Input}
                        delayTimeout={this.props.delayTimeout}
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                    />
                    {appendIcon}
                </InputGroup>
            </FormGroup>
        );
    }
}


export default InputForm;
