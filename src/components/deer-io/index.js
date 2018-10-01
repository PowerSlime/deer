import React from "react";

import Table from "./Table";
import UserInput from "./UserInput/";
import ModalWindow from "./ModalWindow";

import styles from "./style.sass";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: null,
            modal: {
                isOpen: false
            },
            apiResponse: null,
            itemsToShow: null
        };
    }

    isErrorsInResponse() {
        if (this.state.apiResponse !== undefined) {
            if (this.state.apiResponse instanceof Object) {
                if (this.state.apiResponse.status === "error") {
                    return true;
                }
            }
        }

        return false;
    }

    getErrorMessageObject() {
        if (this.isErrorsInResponse()) {
            return this.state.apiResponse.message;
        }

        return null;
    }

    orderItemsBy(key, ascending=true) {
        let itemsToShow = this.state.itemsToShow.slice();
        itemsToShow.sort((a, b) => a[key] < b[key] ? -1 : 1);
        if (!ascending) itemsToShow.reverse();

        this.setState({
            itemsToShow: itemsToShow
        });
    }

    getShopInfo(item) {
        if (item) {
            if (item["shop_id"]) {
                return this.state.apiResponse.shops.find(shop => shop.id === item["shop_id"]);
            }
        }
    }

    openModalWindow(item) {
        this.setState({
            modal: {
                isOpen: true,
                item: item,
                shopInfo: this.getShopInfo(item)
            }
        });
    }

    closeModal() {
        this.setState({
            modal: {
                isOpen: false
            }
        });
    }

    onSearchTextChange(event) {
        const newValue = event.target.value;

        this.setState({
            searchText: newValue,
            itemsToShow: null
        });

        const url = new URL(`https://deer.powerslime.ru/?q=${newValue}`);

        fetch(url)
            .then(response => response.json())
            .then(response => {
                const sorted = response.items.slice().sort((a, b) => a["price"] - b["price"]);

                return {
                    items: sorted,
                    shops: response.shops
                };
            })
            .then(json => this.setState({
                apiResponse: json,
                // itemsToShow: json.items
            }))
            .then(() => this.filterSearchResult())
            .catch(reason => this.setState({
                fetchError: {
                    message: reason.message,
                    name: reason.name
                }
            }));
    }

    isExactlyNaN(value) {
        return value !== value;
    }

    getValue(options, key) {
        // If we have a NaN from our input
        // we must delete the same value from state
        //
        // If we didn't do that, while cleaning the input the state will be the same
        // And after fetching data or handle it we'll get always "bad" results...
        if (this.isExactlyNaN(options[key]) || options[key] === 0) {
            return options[key];
        } else {
            return options[key] || this.state[key] || null;
        }
    }

    filterSearchResult(options) {
        if (!options) {
            options = this.state;
        }

        const minPrice = this.getValue(options, "minPrice");
        const maxPrice = this.getValue(options, "maxPrice");
        const minCount = this.getValue(options, "minCount");
        const maxCount = this.getValue(options, "maxCount");

        let results;
        if (this.state.apiResponse) {
            results = this.state.apiResponse.items.slice();

            if (minPrice) results = results.filter(item => item["price"] >= minPrice);
            if (maxPrice) results = results.filter(item => item["price"] <= maxPrice);

            if (minCount) results = results.filter(item => item["count"] >= minCount);
            if (maxCount) results = results.filter(item => item["count"] <= maxCount);

        } else {
            results = null;
        }

        this.setState({
            minPrice: minPrice,
            maxPrice: maxPrice,
            minCount: minCount,
            maxCount: maxCount,
            itemsToShow: results
        });
    }

    onMinPriceFilterChange(event) {
        this.filterSearchResult({
            minPrice: parseFloat(event.target.value)
        });
    }

    onMaxPriceFilterChange(event) {
        this.filterSearchResult({
            maxPrice: parseFloat(event.target.value)
        });
    }

    onMinCountFilterChange(event) {
        this.filterSearchResult({
            minCount: parseFloat(event.target.value)
        });
    }

    onMaxCountFilterChange(event) {
        this.filterSearchResult({
            maxCount: parseFloat(event.target.value)
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <UserInput
                        onSearchTextChange={this.onSearchTextChange.bind(this)}
                        onMinPriceFilterChange={this.onMinPriceFilterChange.bind(this)}
                        onMaxPriceFilterChange={this.onMaxPriceFilterChange.bind(this)}
                        onMinCountFilterChange={this.onMinCountFilterChange.bind(this)}
                        onMaxCountFilterChange={this.onMaxCountFilterChange.bind(this)}
                    />

                    <Table
                        items={this.state.itemsToShow ? this.state.itemsToShow: null}
                        searchText={this.state.searchText}
                        errorMessage={this.getErrorMessageObject()}
                        orderItemsByColumn={this.orderItemsBy.bind(this)}
                        openModalWindow={this.openModalWindow.bind(this)}
                    />
                </div>

                <ModalWindow
                    data={this.state.modal}
                    toggle={this.closeModal.bind(this)}
                />
            </div>
        );
    }
}


export default App;
