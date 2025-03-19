import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListCard from '../ListCard';
import { List } from '../../types';

describe('ListCard Component', () => {
  const mockList: List = {
    id: 'list1',
    userId: 'user123',
    title: 'Test List',
    color: '#0078D4',
    createdAt: new Date()
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders list title', () => {
    render(
      <ListCard 
        list={mockList} 
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <ListCard 
        list={mockList} 
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onSelect={mockOnSelect}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockList);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <ListCard 
        list={mockList} 
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onSelect={mockOnSelect}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockList.id);
  });
});
