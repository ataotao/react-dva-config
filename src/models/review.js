import { request } from '../services';

export default {
    namespace: 'review',

    state: {},

    effects: {
        *fetchList({ payload }, { call, put }) {
            payload = yield call(request, { fnName: 'standardmodel_review', params: payload });
            yield put({ type: 'savelist', payload });
        }
    },

    reducers: {
        savelist(state, action) {
            return { ...state, list: {...action.payload} };
        }
    },
    
    subscriptions: {

    }
};
