import * as types from '../actions/ActionTypes'; // 모든 상수를 types 에 넣는다.

// 초기 상태 작성
const initialState = {
    number: 0,
    dummy: 'dummy!!',                       // 임의의 dummy
    dumbObject: { d: 0, u: 1, m: 2, b: 3 } // 임의의 dumbObject 작성함
};

// ES6 에서는 함수의 기본인자를 먼저 정의할 수 있다.
export default function counter(state = initialState, action) {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1,
                dumbObject: { ...state.dumbObject, u: 5 }
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        default:
            return state;
    }
}
