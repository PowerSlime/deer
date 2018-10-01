import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Moment from "moment";


class ModalWindow extends React.Component {
    constructor(props) {
        super(props);

        // Don't use state because on update state object tries to re-render
        // And we're getting in infinity recursion
        //
        // But also we should render last heading and body of modal windows
        // To avoid kinda "blink" effect when we're close our modal
        //
        // One of the ways to do that, to read and write our data to kinda state object
        // but not in it.
        //
        // When we're got new heading we write it to `this.modelData.header`.
        // When modal is closed we check if we did receive no data and "render" our modal window
        // with data from `this.modalData`
        //
        // No blinky-effect and a bit of crappy code.
        // I tried :)


        this.modalData = {
            header: null,
            body: null,
            link: "#"
        };
    }

    isDataReceived() {
        if (this.props.data) {
            if (this.props.data.shopInfo && this.props.data.item) {
                return true;
            }
        }

        return false;
    }

    getHeader() {
        if (this.isDataReceived()) {
            const header = this.props.data.shopInfo.title;
            this.modalData.header = header;
        }

        return this.modalData.header;
    }

    getBody() {
        if (this.isDataReceived()) {
            const body = (
                <div>
                    <p>
                        <strong>Описание магазина:</strong> {this.props.data.shopInfo.description ? this.props.data.shopInfo.description : "Без описания"}<br />
                        <strong>Дата открытия:</strong> {Moment.unix(this.props.data.shopInfo.since).format("DD/MM/YYYY")}
                    </p>
                    <p>
                        <strong>Наименование товара:</strong> {this.props.data.item["title"]}<br />
                        <strong>Кол-во:</strong> {this.props.data.item["count"]}<br />
                        <strong>Цена:</strong> {this.props.data.item["price"]} руб
                    </p>
                </div>
            );
            this.modalData.body = body;
        }

        return this.modalData.body;
    }


    getLink() {
        if (this.isDataReceived()) {
            const link = this.props.data.shopInfo.link;
            this.modalData.link = link;
        }

        return this.modalData.link;
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.data.isOpen} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.getHeader()}</ModalHeader>
                    <ModalBody>
                        {this.getBody()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>Отмена</Button>
                        <a href={this.getLink()} target="_blank">
                            <Button color="primary">Открыть магазин</Button>
                        </a>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow;
