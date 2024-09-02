import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Todo } from '../../types/todo';
import { loadTodos, saveTodos } from '../../utils/localStorageUtils';
import { useAuth } from '../auth/AuthProvider';

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    editTodo: (id: number, newText: string, newDescription: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        if (user) {
            const loadedTodos = loadTodos(user);
            setTodos(loadedTodos);
        }
    }, [user]);

    const addTodo = (todo: Todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const removeTodo = (id: number) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const toggleTodo = (id: number) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    const editTodo = (id: number, newText: string, newDescription: string) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText, description: newDescription } : todo
        );
        setTodos(newTodos);
        if (user) {
            saveTodos(user, newTodos);
        }
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo, editTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos must be used within a TodoProvider");
    }
    return context;
};