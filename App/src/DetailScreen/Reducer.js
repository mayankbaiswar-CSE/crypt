import * as ActionTypes from './ActionTypes';

const initialState = {
    currency: {},
    error: null,
    loading: false
};

export default function detailReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_CRYPTO_DETAILS_LOADING:
            return { ...state, loading: true };
        case ActionTypes.GET_CRYPTO_DETAILS_SUCCESS:
            return { ...state, loading: false, currency: action.payload };
        case ActionTypes.GET_CRYPTO_DETAILS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}