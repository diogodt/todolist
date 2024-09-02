import React, { useState } from 'react';
import { Todo } from '../../types/todo'; 
import '../../assets/styles/TodoItem.scss';

interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    saveEditTodo: (id: number, newText: string, newDescription: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo, saveEditTodo }) => {
    const { id, text, description, completed } = todo;
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);
    const [newDescription, setNewDescription] = useState(description);

    const handleSave = () => {
        if (newText.trim() && newDescription.trim()) {
            saveEditTodo(id, newText, newDescription);
            setIsEditing(false);
        }
    };

    return (
        <div
            className={`todo-item ${completed && !isEditing ? 'completed' : ''}`}
            onClick={!isEditing ? () => toggleTodo(id) : undefined}
        >
            {!isEditing ? (
                <div className="todo-checkbox">
                    <input type="checkbox" checked={completed && !isEditing} readOnly />
                    <span className="checkmark"></span>
                </div> 
            ) : null}
            <div className={`todo-content ${isEditing ? 'editing-task' : ''}`}>
                {isEditing ? (
                    <>
                        <input 
                            type="text" 
                            value={newText} 
                            onChange={(e) => setNewText(e.target.value)} 
                            className="edit-input"
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="edit-input"
                        />
                        <button className="save-btn" onClick={(e) => { e.stopPropagation(); handleSave(); }}>Salvar Alterações</button>
                    </>
                ) : (
                    <>
                        <h4>{text}</h4>
                        <p>{description}</p>
                    </>
                )}
            </div>
            {!isEditing && (
                <>
                    <button className="edit-btn" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}></button>
                    <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeTodo(id); }}></button>
                </>
            )}
        </div>
    );
};

export default TodoItem;