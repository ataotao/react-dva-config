import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
const Products = (props) => {
    // let { dispatch, products, history, match, loading } = props;
    let { dispatch, products, loading } = props;
    // console.log(history);
    // console.log(match);
    // console.log(props);
    fn();
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

const fn = () => {
    console.log(1);
};

// 绑定函数到props
const mapDispatchToProps = dispatch => ({fn: bindActionCreators(fn, dispatch)});


// 绑定state到props
const mapStateToProps = state => {
    return {loading: state.loading.global, products: state.products};
};
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
export default connect(mapStateToProps, mapDispatchToProps)(Products);
