import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products, loading }) => {
    const render = (text, record) => {
        return (
            <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
                <Button>Delete</Button>
            </Popconfirm>
        );
    };
    const columns = [{ title: 'Name', dataIndex: 'name' }, { title: 'Actions', render }];
    return <Table dataSource={products} columns={columns} rowKey="id" loading={loading} />;
};

ProductList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

export default ProductList;
