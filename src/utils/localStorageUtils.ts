import { Todo } from '../types/todo';

const LOCAL_STORAGE_KEY = 'todos';

export const loadTodos = (): Todo[] => {
    const todosJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!todosJson) return [];
    try {
        const todos = JSON.parse(todosJson);
        return todos;
    } catch (error) {
        console.error("Could not parse the todos from localStorage", error);
        return [];
    }
};

export const saveTodos = (todos: Todo[]): void => {
    try {
        const todosJson = JSON.stringify(todos);
        localStorage.setItem(LOCAL_STORAGE_KEY, todosJson);
    } catch (error) {
        console.error("Could not save the todos to localStorage", error);
    }
};
