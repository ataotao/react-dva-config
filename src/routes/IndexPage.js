import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { fetchData } from '../http';


function IndexPage() {
    // http调用实例
    let params = {
        tenant_id:'370763113544693760',
        brand_id:'370763114148673280'
    };
    let data = {
        tenant_id:'370763113544693760',
        brand:'雨神品牌',
        category:'刹车片',
        cm_factory:'光冈汽车',
        cm_model:'Orochi [大蛇]',
        appId:'wxd47a4e2027a28b55'
    };
    fetchData({fnName:'infoMine', params});
    fetchData({fnName:'queryFeedback', params, data});

    return (
        <div className={styles.normal}>
            <h1 className={styles.title}>Yay! Welcome to dva!</h1>
            <div className={styles.welcome} />
            <ul className={styles.list}>
                <li>
                    To get started, edit <code>src/index.js</code> and save to
                    reload.
                </li>
                <li>
                    <a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">
                        Getting Started
                    </a>
                </li>
            </ul>
        </div>
    );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
