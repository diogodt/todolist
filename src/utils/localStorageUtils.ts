import { Todo } from '../types/todo';

const LOCAL_STORAGE_KEY = 'todos';

export const loadTodos = (username: string): Todo[] => {
    const todosJson = localStorage.getItem(`todos_${username}`);
    if (!todosJson) return [];
    try {
        const todos = JSON.parse(todosJson);
        return todos;
    } catch (error) {
        console.error("Could not parse the todos from localStorage", error);
        return [];
    }
};

export const saveTodos = (username: string, todos: Todo[]): void => {
    try {
        const todosJson = JSON.stringify(todos);
        localStorage.setItem(`todos_${username}`, todosJson);
    } catch (error) {
        console.error("Could not save the todos to localStorage", error);
    }
};
