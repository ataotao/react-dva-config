import qs from 'qs';
import { isEmpty } from '../utils/tools';
import { get, post } from './index';
import * as api from './api';

/**
 * 拼接带search参数的url
 * @param {*} api
 * @param {*} params
 */
const createUrl = (api, params) => {
    return isEmpty(params) ? api : api + '?' + qs.stringify(params);
};

/**
 * get
 */
export const infoMine = params => get(createUrl(api.info_mine, params));

/**
 * post
 */
export const queryFeedback = (params, data) => post(createUrl(api.query_feedback, params), data);
