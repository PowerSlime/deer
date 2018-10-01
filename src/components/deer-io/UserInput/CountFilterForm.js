import React from "react";
import {Input} from "reactstrap";
import {DelayInput} from "react-delay-input";

class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <DelayInput
                    element={Input}
                    delayTimeout={1000}
                    type="number"
                    placeholder="Мин. кол-во"
                    onChange={this.props.onMinCountFilterChange}
                />
                <DelayInput
                    element={Input}
                    delayTimeout={1000}
                    type="number"
                    placeholder="Макс. кол-во"
                    onChange={this.props.onMaxCountFilterChange}
                />
            </div>
        );
    }
}


export default SearchForm;
