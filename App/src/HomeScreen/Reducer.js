import * as ActionTypes from './ActionTypes';

const initialState = {
    currencies: [],
    loading: false,
    error: null,
    newFetched: [],
    isPullToRefresh: false,
    isPaginating: false
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_CRYPTO_SUCCESS:
            if (action.extra.isPullToRefresh) {
                return { ...state, currencies: action.payload, newFetched: action.payload, loading: false, isPullToRefresh: false, isPaginating: false };
            }
            return { ...state, currencies: [...state.currencies, ...action.payload], newFetched: action.payload, loading: false, isPullToRefresh: false, isPaginating: false };
        case ActionTypes.GET_CRYPTO_LOADING:
            const { isPullToRefresh, isPaginating } = action.extra;
            if (isPullToRefresh) {
                return { ...state, isPullToRefresh };
            } else if (isPaginating) {
                return { ...state, isPaginating };
            }
            return { ...state, loading: true };
        case ActionTypes.GET_CRYPTO_ERROR:
            return { ...state, currencies: [], loading: false, error: action.payload, isPullToRefresh: false, isPaginating: false };
        default:
            return state;
    }
}