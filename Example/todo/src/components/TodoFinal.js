import React, {Component} from 'react';

import * as actions from '../actions';
import Form from './Form';
import TodoItemList from './TodoItemList';
import TodoListTemplate from './TodoListTemplate';

import {connect} from 'react-redux';

class TodoFinal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e){
        this.setState({
            content: e.target.value
        });
    }

    handleCreate(){
        const form = {
            id: this.props.id,
            content: this.state.content,
            checked: false
        };
        this.props.handleCreate(form);
        this.setState({
            content: ''
        })
    }

    handleKeyPress(e){
        if(e.charCode === 13){
            this.handleCreate()
        }
    }

    render() {
        return (
            <TodoListTemplate form={
                <Form content={this.state.content}
                      formOnChange={this.handleChange}
                      formOnCreate={this.handleCreate}
                      formOnKeyPress={this.handleKeyPress} />}>
                <TodoItemList
                    todos={this.props.todos}
                    onRemove={this.props.handleRemove}
                    onToggle={this.props.handleToggle}
                />
            </TodoListTemplate>
        );
    }
}

const mapStateProps = (state) => {
    return {
        id: state.todo.id,
        todos: state.todo.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleCreate: (newTodo) => {dispatch(actions.createToDo(newTodo))},
        handleRemove: (id) => {dispatch(actions.removeToDo(id))},
        handleToggle: (id) => {dispatch(actions.toggleToDo(id))},
    };
};

export default connect(mapStateProps, mapDispatchToProps)(TodoFinal);