import cn from "classnames";
import { get } from "lodash-es";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "reactstrap";

import SortIndicator from "../SortIndicator";
import styles from "./styles.module.sass";

const DataTable = ({ headers, items, sortBy, onSortByChange, onRowClick }) => {
    const [sort, setSort] = useState(sortBy);
    const sortedItems = [...items].sort((current, next) => {
        const currentValue = get(current, sort.value);
        const nextValue = get(next, sort.value);

        if (sort.isDesc) {
            return currentValue < nextValue ? 1 : -1;
        } else {
            return currentValue > nextValue ? 1 : -1;
        }
    });

    const handleSortClick = useCallback(
        (value) => {
            if (value !== sort.value) {
                return setSort({ value, isDesc: false });
            }

            if (!sort.isDesc) {
                return setSort({ value, isDesc: true });
            } else {
                return setSort({ value: "", isDesc: false });
            }
        },
        [setSort, sort.isDesc, sort.value],
    );

    const handleRowClick = useCallback((item, index) => onRowClick?.(item, index), [onRowClick]);

    useEffect(() => onSortByChange(sort), [onSortByChange, sort]);

    return (
        <React.Fragment>
            <div>Всего найдено: {items.length}</div>
            <Table bordered responsive className="fade show">
                <thead className="thead-dark">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.value}
                                width={header.width}
                                className={cn({ [styles.ClickableHeader]: header.sortable })}
                                onClick={() => handleSortClick(header.value)}
                            >
                                <span>{header.text}</span>
                                {header.sortable ? (
                                    <SortIndicator
                                        className={styles.SortIndicator}
                                        isActive={sort.value === header.value}
                                        isDescending={sort.isDesc}
                                    />
                                ) : null}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.map((item, index) => (
                        <tr
                            key={item.id}
                            className={cn({ [styles.ClickableRow]: onRowClick })}
                            onClick={() => handleRowClick(item, index)}
                        >
                            {headers.map((header) => (
                                <td key={header.value}>{get(item, header.value)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

DataTable.propTypes = {
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
            width: PropTypes.string,
        }),
    ),
    items: PropTypes.arrayOf(PropTypes.object),
    sortBy: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isDesc: PropTypes.bool,
    }),
    showTotalCount: PropTypes.bool,
    onSortByChange: PropTypes.func,
    onRowClick: PropTypes.func,
};

DataTable.defaultProps = {
    headers: [],
    items: [],
    sortBy: {
        value: "",
        isDesc: false,
    },
    showTotalCount: false,
    onSortByChange: () => undefined,
    onRowClick: undefined,
};

export default DataTable;
