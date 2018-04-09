import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

const getPOSTAPI = (postId) => (
    axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}`)
);

const GET_POST_PENDING = 'post/GET_POST_PENDING';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

export const getPost = (postId) => async (dispatch) => {
    dispatch({ type: GET_POST_PENDING });
    try {
        const response = await getPOSTAPI(postId);
        dispatch({ type: GET_POST_SUCCESS, payload: response});
        return response;
    } catch (error) {
        dispatch({ type: GET_POST_FAILURE, payload: error })
    }
};

const initialState = {
    fetching: false,
    error: false,
    title: '',
    body: ''
};

export default handleActions({
    [GET_POST_PENDING]: (state) => ({
        ...state,
        fetching: true,
        error: false
    }),
    [GET_POST_SUCCESS]: (state, {payload: {data}}) => ({
        ...state,
        fetching: false,
        title: data.title,
        body: data.body
    }),
    [GET_POST_FAILURE]: (state) => ({
        ...state,
        fetching: false,
        error: true
    })
}, initialState)