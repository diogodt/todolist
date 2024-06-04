import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Todo } from '../types/todo';
import TodoItem from '../components/toDo/TodoItem';

describe('TodoItem', () => {
  const mockToggleTodo = jest.fn();
  const mockRemoveTodo = jest.fn();
  const todo: Todo = {
    id: 1,
    text: 'Test Todo',
    description: 'Test Description',
    completed: false,
  };

  test('renders the todo item', () => {
    render(<TodoItem todo={todo} toggleTodo={mockToggleTodo} removeTodo={mockRemoveTodo} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls toggleTodo when clicked', () => {
    render(<TodoItem todo={todo} toggleTodo={mockToggleTodo} removeTodo={mockRemoveTodo} />);
    
    fireEvent.click(screen.getByText('Test Todo'));
    expect(mockToggleTodo).toHaveBeenCalledWith(todo.id);
  });

  test('calls removeTodo when remove button is clicked', () => {
    render(<TodoItem todo={todo} toggleTodo={mockToggleTodo} removeTodo={mockRemoveTodo} />);
    
    const removeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(removeButton);
    expect(mockRemoveTodo).toHaveBeenCalledWith(todo.id);
  });
});