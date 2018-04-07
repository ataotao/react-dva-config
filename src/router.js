import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch } from 'dva/router';


function RouterConfig({ history, app }) {
    const IndexPage = dynamic({
        app,
        component: () => import('./routes/IndexPage')
    });
    const Products = dynamic({
        app,
        models: () => [import('./models/products')],
        component: () => import('./routes/Products')
    });
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/products" exact component={Products} />
            </Switch>
        </Router>
    );
}
export default RouterConfig;
