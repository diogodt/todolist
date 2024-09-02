import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import TodoItem from './TodoItem';
import { Todo } from '../../types/todo';
import { loadTodos, saveTodos } from '../../utils/localStorageUtils';
import { useAuth } from '../auth/AuthProvider';
import '../../assets/styles/TodoList.scss';

const TodoList: React.FC = () => {
    const { user } = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filter, setFilter] = useState<string>('All');
    const [description, setDescription] = useState<string>('');
    const [localStorageAvailable, setLocalStorageAvailable] = useState<boolean>(true);

    useEffect(() => {
        if (user) {
            try {
                const loadedTodos = loadTodos(user);
                setTodos(loadedTodos);
            } catch (error) {
                setLocalStorageAvailable(false);
            }
        }
    }, [user]);

    const debouncedSaveTodos = debounce((todos: Todo[]) => {
        if (user) {
            try {
                saveTodos(user, todos);
            } catch (error) {
                setLocalStorageAvailable(false);
            }
        }
    }, 500);

    useEffect(() => {
        debouncedSaveTodos(todos);
    }, [todos]);

    const handleAddTodo = (): void => {
        if (inputValue.trim() !== '' && description.trim() !== '') {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue,
                description: description,
                completed: false,
            };
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);
            if (user) {
                saveTodos(user, newTodos);
            }
            setInputValue('');
            setDescription('');
        }
    };

    const toggleTodo = (id: number): void => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const removeTodo = (id: number): void => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const saveEditTodo = (id: number, newText: string, newDescription: string): void => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText, description: newDescription, completed: false } : todo
        );
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const handleDragStart = (event: React.DragEvent<HTMLElement>, id: number) => {
        event.dataTransfer.setData("text/plain", id.toString());
    };

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLElement>, targetId: number) => {
        event.preventDefault();
        const draggedId = parseInt(event.dataTransfer.getData("text/plain"));
        const newItems = [...todos];
        const draggedItemIndex = newItems.findIndex(item => item.id === draggedId);
        const targetItemIndex = newItems.findIndex(item => item.id === targetId);

        if (draggedItemIndex !== targetItemIndex) {
            const item = newItems[draggedItemIndex];
            newItems.splice(draggedItemIndex, 1);
            newItems.splice(targetItemIndex, 0, item);
            setTodos(newItems);
            if (user) {
                saveTodos(user, newItems);
            }
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
    }).filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="todo-list">
            {!localStorageAvailable && <div>LocalStorage isn't available</div>}
            <div className='new-task'>
                <div className="input-group">
                    <label>What task do you need to do?</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Task name"
                    />
                </div>
                <div className="input-group">
                    <label>Please describe your task</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={5}
                        placeholder="Describe your task, as best as you can!"
                    />
                    <button className='description-button' onClick={handleAddTodo}>Add Task</button>
                </div>
            </div>
            <div className='sort-filter'>
                <label>Filter by Task's Title</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search todos..."
                />
                <div className='sort-cards'>
                    <button onClick={() => setFilter('All')}>Show All</button>
                    <button onClick={() => setFilter('Active')}>Show Active</button>
                    <button onClick={() => setFilter('Completed')}>Show Completed</button>
                </div>
            </div>
            <ul>
                {filteredTodos.map((todo, index) => (
                    <li
                        key={todo.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, todo.id)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, todo.id)}
                    >
                        <TodoItem
                            todo={todo}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            saveEditTodo={saveEditTodo}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;