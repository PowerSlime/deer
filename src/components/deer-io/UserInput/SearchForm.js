import React from "react";
import {Input} from "reactstrap";
import {DelayInput} from "react-delay-input";


class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <DelayInput
                    element={Input}
                    delayTimeout={2000}
                    type="text"
                    placeholder="Поиск..."
                    onChange={this.props.onSearchTextChange}
                />
            </div>
        );
    }
}


export default SearchForm;
