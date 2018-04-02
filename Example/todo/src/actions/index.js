import * as types from './ActionTypes';

export function createToDo(newTodo) {
    return {
        type: types.TODO_CREATE,
        newTodo:newTodo
    }
}

export function removeToDo(id) {
    return {
        type: types.TODO_ON_REMOVE,
        id: id
    }
}

export function toggleToDo(id) {
    return {
        type: types.TODO_ON_TOGGLE,
        id: id
    }
}