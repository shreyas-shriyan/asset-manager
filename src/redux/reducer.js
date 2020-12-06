import {
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE,
    ON_DROP,
    SAVE_ORDER,
    CANCEL_ORDER,
} from './actionTypes';

const initialState = {
    searchResultsError: '',
    searchResults: [],
    oldData: [],
    saveDialog: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                searchResultsLoading: false,
                searchResultsError: action.payload
            };
        case SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResults: action.payload,
                searchResultsError: ''
            };

        case ON_DROP:
            return {
                ...state,
                oldData: state.searchResults,
                searchResults: action.payload,
                saveDialog: true
            }

        case SAVE_ORDER:
            return {
                ...state,
                oldData: [],
                saveDialog: false
            }

        case CANCEL_ORDER:
            return {
                ...state,
                searchResults: state.oldData,
                oldData: [],
                saveDialog: false
            }

        default:
            return state;
    }
}
