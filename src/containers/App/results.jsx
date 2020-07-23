import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useSWR from "swr";

import DataTable from "../../components/DataTable";
import { axiosFetcher } from "../../utils/axios";

dayjs.extend(customParseFormat);

const HEADERS = [
    {
        text: "#",
        value: "id",
        sortable: true,
        width: "5%",
    },
    {
        text: "Наименование",
        value: "title",
        sortable: true,
        width: "65%",
    },
    {
        text: "Цена",
        value: "price",
        sortable: true,
        width: "15%",
    },
    {
        text: "Количество",
        value: "count",
        sortable: true,
        width: "15%",
    },
];

const AppResults = ({ params }) => {
    const search = params.search;

    const [modal, setModal] = useState(false);
    const toggle = useCallback(() => setModal(!modal), [modal]);
    const [selected, setSelected] = useState(null);

    const request = useMemo(() => ({ params: { q: search } }), [search]);
    const { data, error } = useSWR(search ? ["/", request] : null, axiosFetcher);

    const minPrice = params.price.min;
    const maxPrice = params.price.max;
    const minCount = params.count.min;
    const maxCount = params.count.max;

    const items = useMemo(
        () =>
            data?.items
                ?.map((_, index) => ({ ..._, id: index + 1 })) // Add id's
                .filter((item) => {
                    const moreThanMinPrice = minPrice !== undefined ? item.price > minPrice : true;
                    const lessThanMaxPrice = maxPrice !== undefined ? item.price < maxPrice : true;
                    const moreThanMinCount = minCount !== undefined ? item.count > minCount : true;
                    const lessThanMaxCount = maxCount !== undefined ? item.count < maxCount : true;

                    return moreThanMinPrice && lessThanMaxPrice && moreThanMinCount && lessThanMaxCount;
                }),
        [data?.items, maxCount, maxPrice, minCount, minPrice],
    );

    const selectedShop = useMemo(() => {
        if (!selected) {
            return null;
        }

        return data?.shops?.find((shop) => shop.id === selected.shop_id);
    }, [data?.shops, selected]);

    const handleRowClick = useCallback((item) => {
        setSelected(item);
        setModal(true);
    }, []);

    useEffect(() => {
        setModal(!!selected);
    }, [selected]);

    if (!search) {
        return (
            <Alert color="secondary">
                <h4 className="alert-heading">Ошибка!</h4>
                <div>Поле для поиска пусто.</div>
            </Alert>
        );
    } else if (error) {
        return (
            <Alert color="danger">
                <h4 className="alert-heading">Ошибка!</h4>
                <div>
                    <p>Ошибка в получении данных с сервера.</p>
                    <p>
                        <strong>Причина:</strong> {error}
                    </p>
                </div>
            </Alert>
        );
    } else if (!data) {
        return (
            <Alert color="warning">
                <h4 className="alert-heading">Ожидайте.</h4>
                <div>Получение данных с сервера.</div>
            </Alert>
        );
    }

    return (
        <React.Fragment>
            <DataTable
                headers={HEADERS}
                items={items}
                sortBy={{ value: "price" }}
                showTotalCount
                onRowClick={handleRowClick}
            />

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{selectedShop?.title}</ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <strong>Описание магазина:</strong> {selectedShop?.description || "Без описания"}
                            <br />
                            <strong>Дата открытия:</strong> {dayjs.unix(selectedShop?.since).format("DD/MM/YYYY")}
                        </div>
                        <br />
                        <div>
                            <strong>Наименование товара:</strong> {selected?.title}
                            <br />
                            <strong>Кол-во:</strong> {selected?.count}
                            <br />
                            <strong>Цена:</strong> {selected?.price} руб
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Отмена
                    </Button>
                    <a href={selectedShop?.link || "#"} target="_blank" rel="noreferrer">
                        <Button color="primary">Открыть магазин</Button>
                    </a>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

AppResults.propTypes = {
    params: PropTypes.shape({
        search: PropTypes.string,
        price: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
        }),
        count: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
        }),
    }),
};

export default AppResults;
