import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../components/toDo/TodoList';
import { loadTodos, saveTodos } from '../utils/localStorageUtils';

jest.mock('../utils/localStorageUtils');

describe('TodoList', () => {
  beforeEach(() => {
    (loadTodos as jest.Mock).mockImplementation(() => []);
    (saveTodos as jest.Mock).mockImplementation(() => {});
    
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem(key: string) {
          return store[key] || null;
        },
        setItem(key: string, value: string) {
          store[key] = value;
        },
        clear() {
          store = {};
        },
        removeItem(key: string) {
          delete store[key];
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  test('renders without crashing and displays initial elements', () => {
    render(<TodoList />);
    
    expect(screen.getByPlaceholderText('Task name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe your task, as best as you can!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search todos...')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByText('Show All')).toBeInTheDocument();
    expect(screen.getByText('Show Active')).toBeInTheDocument();
    expect(screen.getByText('Show Completed')).toBeInTheDocument();
  });

  test('adds a new todo item', () => {
    render(<TodoList />);
    
    fireEvent.change(screen.getByPlaceholderText('Task name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Describe your task, as best as you can!'), { target: { value: 'Task Description' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('Task Description')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    fireEvent.change(screen.getByPlaceholderText('Task name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Describe your task, as best as you can!'), { target: { value: 'Task Description' } });
    fireEvent.click(screen.getByText('Add Task'));
    
    const todoItem = screen.getByText('New Task');
    expect(todoItem).not.toHaveClass('completed');
    
    const checkbox = todoItem.closest('.todo-item')?.querySelector('input[type="checkbox"]');
    if (checkbox) {
      fireEvent.click(checkbox);
    }
    
    expect(todoItem.closest('.todo-item')).toHaveClass('completed');
  });
});
