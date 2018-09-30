import React from "react";
import {Input} from "reactstrap";


class SearchForm extends React.Component {
    render() {
        return (
            <div className="input-group">
                <Input
                    type="text"
                    placeholder="Поиск..."
                    onChange={this.props.onSearchTextChange}
                />
            </div>
        );
    }
}


export default SearchForm;