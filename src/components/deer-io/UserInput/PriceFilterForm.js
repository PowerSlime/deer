import React from "react";
import {Input} from "reactstrap";


class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <Input
                    type="number"
                    placeholder="Мин. цена"
                    onChange={this.props.onMinPriceFilterChange}
                />
                <Input
                    type="number"
                    placeholder="Макс. цена"
                    onChange={this.props.onMaxPriceFilterChange}
                />
            </div>
        );
    }
}


export default SearchForm;