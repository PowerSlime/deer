import React from "react";
import {Input} from "reactstrap";


class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <Input
                    type="number"
                    placeholder="Мин. кол-во"
                    onChange={this.props.onMinCountFilterChange}
                />
                <Input
                    type="number"
                    placeholder="Макс. кол-во"
                    onChange={this.props.onMaxCountFilterChange}
                />
            </div>
        );
    }
}


export default SearchForm;