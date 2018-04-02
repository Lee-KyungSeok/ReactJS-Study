import React from 'react'
import './TodoListTemplate.css';

// JSX 를 props 로 전달할 수 있다.
const TodoListTemplate = ({form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title">
                오늘 할 일
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                {children}
            </section>
        </main>
    )
};

export default TodoListTemplate;

/* 나중에 이렇게 들어가게 된다
<TodoListTemplate form={<div>form 내용</div>}>
    <div>children 내용</div>
</TodoListTemplate>
*/