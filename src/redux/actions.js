import {
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE,
    ON_DROP,
    SAVE_ORDER,
    CANCEL_ORDER
} from './actionTypes';

import axios from 'axios';

export const searchResultsSuccess = (payload) => ({
    type: SEARCH_RESULTS_SUCCESS,
    payload
});

export const searchResultsFailure = (payload) => ({
    type: SEARCH_RESULTS_FAILURE,
    payload
});

export const onDrop = (payload) => ({
    type: ON_DROP,
    payload
});

export const saveOrder = (payload) => ({
    type: SAVE_ORDER,
    payload
});

export const cancelOrder = (payload) => ({
    type: CANCEL_ORDER,
    payload
});

export const getSearchResults = (data) => {
    return (dispatch) => {
        return axios({
            method: 'GET',
            url: 'https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/assets',
            data,
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => dispatch(searchResultsSuccess(res.data)))
            .catch((err) => dispatch(searchResultsFailure(err.response?.data)));
    };
};
