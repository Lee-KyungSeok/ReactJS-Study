import React, {Component} from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import './TodoItem.css'

const propTypes = {
    content: PropTypes.string,
    checked: PropTypes.bool,
    id: PropTypes.number,
    onToggle: PropTypes.func,
    onRemove: PropTypes.func
};

function createWarning(funcName){
    return () => console.warn(funcName + " is not defined")
}

const defaultProps = {
    id : -1,
    content: '',
    checked: false,
    onToggle: createWarning('onToggle'),
    onRemove: createWarning('onRemove')
};

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleRemove(e){
        e.stopPropagation();
        this.props.onRemove(this.props.id)
    }

    handleToggle(){
        this.props.onToggle(this.props.id)
    }

    render() {
        console.log("출력되나??" + this.props.id)
        return (
            <div className="todo-item" onClick={this.handleToggle}>
                <div className="remove" onClick={this.handleRemove}>×</div>
                <div className={`todo-text ${this.props.checked ? ' checked' : ''}`}>
                    <div>{this.props.content}</div>
                </div>
                {
                    this.props.checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

TodoItem.propTypes = propTypes;
TodoItem.defaultProps = defaultProps;

export default TodoItem;