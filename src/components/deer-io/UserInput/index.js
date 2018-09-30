import React from "react";
import SearchForm from "./SearchForm";
import PriceFilterForm from "./PriceFilterForm";
import CountFilterForm from "./CountFilterForm";

class UserInput extends React.Component {
    render() {
        return (
            <div className="row input-container">
                <div className="col-md-4">
                    <SearchForm onSearchTextChange={this.props.onSearchTextChange}/>
                </div>
                <div className="col-md-4 ml-auto">
                    <PriceFilterForm
                        onMinPriceFilterChange={this.props.onMinPriceFilterChange}
                        onMaxPriceFilterChange={this.props.onMaxPriceFilterChange}
                    />
                </div>
                <div className="col-md-4">
                    <CountFilterForm
                        onMinCountFilterChange={this.props.onMinCountFilterChange}
                        onMaxCountFilterChange={this.props.onMaxCountFilterChange}
                    />
                </div>
            </div>
        );
    }
}


export default UserInput;