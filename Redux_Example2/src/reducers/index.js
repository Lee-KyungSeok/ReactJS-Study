import {Map, List} from 'immutable';
import * as types from '../actions/ActionTypes';

const initialState = Map({
    counters: List([
        Map({
            color: 'black',
            number: 0
        })
    ])
});

function counter (state = initialState, action) {
    // 레퍼런스 생성
    const counters = state.get('counters');

    switch (action.type) {
        // 카운터를 새로 추가
        case types.CREATE:
            return state.set( 'counters', counters.push(Map({
                    color: action.color,
                    number:0
                })));
        // 마지막 카운터를 제거
        case types.REMOVE:
            return state.set('counters', counters.pop());
        // 특정 index 번째 카운터를 1만큼 증가
        case types.INCREMENT:
            return state.set('counters', counters.update(
                action.index,
                (counter) => counter.set('number', counter.get('number') +1)
            ));
        // 특정 index 번째 카운터를 1만큼 감소
        case types.DECREMENT:
            return state.set('counters', counters.update(
                action.index,
                (counter) => counter.set('number', counter.get('number') -1)
            ));
        // 특정 index 번째 카운터의 색상을 변경
        case types.SET_COLOR:
            return state.set('counters', counters.update(
                action.index,
                counter => counter.set('color', action.color)
            ));
        default:
            return state;
    }
}
export default counter;