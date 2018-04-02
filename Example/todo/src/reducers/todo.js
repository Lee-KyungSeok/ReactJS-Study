import * as types from '../actions/ActionTypes';
import update from 'immutability-helper';

const initialState = {
    id : 0,
    todos : [
    ]
};

export default function todo(state = initialState, action) {
    switch (action.type) {
        case types.TODO_CREATE:
            return update( state, {
                id: { $set: state.id +1 },
                todos: { $push: [action.newTodo] }
            });
        case types.TODO_ON_REMOVE:
            const index1 = state.todos.findIndex(value => value.id === action.id);
            if(index1===-1){
                return state;
            } else {
                return update(state, {
                    todos: {$splice: [[index1, 1]]}
                });
            }
        case types.TODO_ON_TOGGLE:
            const index2 = state.todos.findIndex(value => value.id === action.id);
            if(index2===-1){
                return state;
            } else {
                return update(state, {
                    todos: {
                        [index2]: {
                            checked: {$set: !state.todos[index2].checked}
                        }
                    }
                });
            }
        default:
            return state;
    }
}

/**
 *  id와 state를 받아 몇번째 index 인지를 반환해주는 함수
 * @param state : state 객체
 * @param id : state 객체의 id 값
 * @returns {number}
 */
function indexCheck(state, id) {
    for (let i=0; i<state.length; i++) {
        if(id === state.todos.id){
            return i;
        }
    }
    return -1;
}