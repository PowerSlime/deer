import React from "react";
import {Input} from "reactstrap";
import {DelayInput} from "react-delay-input";


class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <DelayInput
                    element={Input} // reactstrap component
                    delayTimeout={1000}
                    type="number"
                    placeholder="Мин. цена"
                    onChange={this.props.onMinPriceFilterChange}
                />
                <DelayInput
                    element={Input}
                    delayTimeout={1000}
                    type="number"
                    placeholder="Макс. цена"
                    onChange={this.props.onMaxPriceFilterChange}
                />
            </div>
        );
    }
}


export default SearchForm;
