import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import { Button } from 'antd';
const Products = (props) => {
    let { dispatch, products, history, match, loading } = props;
    console.log(history);
    console.log(match);
    console.log(props);
    function handleDelete(id) {
        dispatch({
            type: 'products/fetch',
            payload: id
        });
    }
    return (
        <div>
            <h2>List of Products</h2>
            <Button type="primary">Primary</Button>
            <ProductList onDelete={handleDelete} products={products} loading={loading} />
        </div>
    );
};

const mapStateToProps = state => ({loading: state.loading.global, products: state.products});
export default connect(mapStateToProps)(Products);
