// import {INCREMENT, DECREMENT, SET_COLOR} from "./ActionTypes"
import * as types from './ActionTypes'; // 각 상수에 모두 접근할 수 있게 된다.

export const increment = (index) => ({
    type: types.INCREMENT,
    index
});

export const decrement = (index) => ({
    type: types.DECREMENT,
    index
});

// color만 써도 동일한 의미!
export const setColor = ({index, color}) => ({
    type: types.SET_COLOR,
    color,
    index
});

export const create = (color) => ({
    type: types.CREATE,
    color
});

export const remove = () => ({
    type: types.REMOVE
});