import * as ActionTypes from './ActionTypes';

const initialState = {
    currencyData: {},
    error: null,
    loading: false
};

export default function detailReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_GRAPH_DATA_LOADING:
            return { ...state, loading: true };
        case ActionTypes.GET_GRAPH_DATA_SUCCESS:
            return { ...state, loading: false, currencyData: action.payload };
        case ActionTypes.GET_GRAPH_DATA_ERROR:
            return { ...state, loading: false, error: action.payload };
        case ActionTypes.GET_GRAPH_RESET_DATA:
            return { ...state, currencyData: {} };
        default:
            return state;
    }
}