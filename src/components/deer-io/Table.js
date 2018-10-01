import React from "react";
import { Alert } from "reactstrap";

class Table extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isDesc: false
        };
    }

    orderBy(columnNumber) {
        const columns = ["title", "price", "count"];
        this.props.orderItemsByColumn(columns[columnNumber], this.state.isDesc);

        this.setState({
            isDesc: !this.state.isDesc
        });
    }

    renderTable(items) {
        return (
            <table className="table table-hover table-bordered table-responsive-xl fade show">
                <thead className="thead-dark">
                    <tr>
                        <th style={{cursor: "not-allowed"}}>#</th>
                        <th onClick={this.orderBy.bind(this, 0)}>Наименование</th>
                        <th onClick={this.orderBy.bind(this, 1)}>Цена</th>
                        <th onClick={this.orderBy.bind(this, 2)}>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from(items).map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => this.props.openModalWindow(item, index)}
                        >
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderWatingMessage() {
        return (
            <div className="alert alert-primary" role="alert">
                Получение данных с сервера.
            </div>
        );
    }

    renderErrorMessage() {
        return (
            <div className="alert alert-danger" role="alert">
                <p>Ошибка в получении данных с сервера.</p>
                <p><strong>Причина:</strong> {this.props.errorMessage}</p>
            </div>
        );
    }

    render() {
        let body;

        if (!this.props.errorMessage) {
            if (this.props.items) {
                body = this.renderTable(this.props.items);
            } else if (this.props.searchText) {
                body = (
                    <Alert color="warning">
                        <h4 className="alert-heading">Ожидайте.</h4>
                        <div>Получение данных с сервера.</div>
                    </Alert>
                );
            } else (
                body = (
                    <Alert color="secondary">
                        <h4 className="alert-heading">Ошибка!</h4>
                        <div>Поле для поиска пусто.</div>
                    </Alert>
                )
            );

            return (
                <div className="row">
                    <div className="col-xl-12">
                        {body}
                    </div>
                </div>
            );
        } else {
            body = this.renderErrorMessage(this.props.errorMessage);
        }
    }
}

export default Table;
