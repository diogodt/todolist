import React from 'react';
import { Todo } from '../../types/todo'; 
import '../../assets/styles/TodoItem.scss';

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo }) => {
    const { id, text, description, completed } = todo;

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`} onClick={() => toggleTodo(id)}>
            <div className="todo-checkbox">
                <input type="checkbox" checked={completed} readOnly />
                <span className="checkmark"></span>
            </div>
            <div className="todo-content">
                <h4>{text}</h4>
                <p>{description}</p>
            </div>
            <button className="remove-btn" data-testid={`remove-btn-${id}`} onClick={(e) => { e.stopPropagation(); removeTodo(id); }}></button>
        </div>
    );
};

export default TodoItem;