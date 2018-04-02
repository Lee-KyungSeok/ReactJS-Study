import React, {Component} from 'react';
import PropTypes from 'prop-types'
import TodoItem from './TodoItem';

/**
 * todos: "to-do 객체들이 들어있는 배열
 * onToggle: 체크박스를 키고 끄는 함수
 * onRemove: 아이템을 삭제시키는 함수
 */

const propTypes = {
    todos: PropTypes.array,
    onToggle: PropTypes.func,
    onRemove: PropTypes.func
};

function createWarning(funcName){
    return () => console.warn(funcName + " is not defined")
}


const defaultProps = {
    todos: [],
    onToggle: createWarning('onToggle'),
    onRemove: createWarning('onRemove')
};

class TodoItemList extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.todos !== nextProps.todos;
    }


    render() {
        const todoList = this.props.todos.map(
            ({id, content, checked}) => (
             <TodoItem
                 id={id}
                 content={content}
                 checked={checked}
                 onRemove={this.props.onRemove}
                 onToggle={this.props.onToggle}
                 key={id}
             />
            )
        );
        return (
            <div>{todoList}</div>
        );
    }
}

TodoItemList.propTypes = propTypes;
TodoItemList.defaultProps = defaultProps;

export default TodoItemList;