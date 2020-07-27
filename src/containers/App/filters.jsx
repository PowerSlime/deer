import { mdiMagnify } from "@mdi/js";
import cn from "classnames";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { Button, Col, Form, InputGroup, Row } from "reactstrap";

import Input from "../../components/Input";
import useInput from "../../hooks/useInput";
import styles from "./styles.module.sass";

const AppFilters = ({ params, onSubmit, ...rest }) => {
    const [search, setSearch] = useInput(params.search);
    const [minPrice, setMinPrice] = useInput(params.price.min, { type: "number" });
    const [maxPrice, setMaxPrice] = useInput(params.price.max, { type: "number" });
    const [minCount, setMinCount] = useInput(params.count.min, { type: "integer" });
    const [maxCount, setMaxCount] = useInput(params.count.max, { type: "integer" });

    const submitHandler = useCallback(
        (event) => {
            event.preventDefault();

            const data = {
                search,
                price: {
                    min: minPrice,
                    max: maxPrice,
                },
                count: {
                    min: minCount,
                    max: maxCount,
                },
            };

            onSubmit?.(data);
        },
        [search, minPrice, maxPrice, minCount, maxCount, onSubmit],
    );

    return (
        <Form onSubmit={submitHandler} {...rest}>
            <Row>
                <Col md={4}>
                    <InputGroup className={cn("input-group-seamless", styles.InputGroup)}>
                        <Input
                            value={search}
                            onChange={setSearch}
                            icon={mdiMagnify}
                            iconPosition={"prepend"}
                            placeholder="Поиск... Например: proxy, mail.ru, instagram"
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <InputGroup className={styles.InputGroup}>
                        <Input value={minPrice} type="number" placeholder="Мин. цена" onChange={setMinPrice} />
                        <Input value={maxPrice} type="number" placeholder="Макс. цена" onChange={setMaxPrice} />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <InputGroup className={styles.InputGroup}>
                        <Input value={minCount} type="number" placeholder="Мин. кол-во" onChange={setMinCount} />
                        <Input value={maxCount} type="number" placeholder="Макс. кол-во" onChange={setMaxCount} />
                    </InputGroup>
                </Col>
                <Col md={2}>
                    <Button type="submit" block color="primary" className={styles.InputGroup}>
                        Поиск
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

AppFilters.propTypes = {
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
    onSubmit: PropTypes.func,
};

AppFilters.defaultProps = {
    onSubmit: () => undefined,
};

export default AppFilters;
