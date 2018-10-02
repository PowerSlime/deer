import React from "react";
import InputForm from "./InputForm";


class SearchForm extends React.Component {
    render() {
        return (
            <InputForm
                delayTimeout={2000}
                type="text"
                placeholder="Поиск... Например: proxy, mail.ru, instagram"
                onChange={this.props.onSearchTextChange}
                seamless={true}
                icon="search"
                prepend
            />
        );
    }
}


export default SearchForm;
