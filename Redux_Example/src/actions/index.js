// import {INCREMENT, DECREMENT, SET_COLOR} from "./ActionTypes"
import * as types from './ActionTypes'; // 각 상수에 모두 접근할 수 있게 된다.

export function increment() {
    return {
        type: types.INCREMENT
    }
}

export function decrement() {
    return {
        type: types.DECREMENT
    }
}

// color만 써도 동일한 의미!
export function setColor(color) {
    return {
        type: types.SET_COLOR,
        color: color
    }
}