
import React from 'react';
import { Todo, toggleTodo, deleteTodo } from '../store/todoSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { toast } from 'sonner';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  
  // Get the todo text content from either title or text property
  const todoContent = todo.text || todo.title || '';

  const handleToggle = () => {
    dispatch(toggleTodo(todo))
      .unwrap()
      .catch((error) => {
        toast.error(`Failed to update "${todoContent}" status`);
        console.error('Toggle todo error:', error);
      });
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
      .unwrap()
      .catch((error) => {
        toast.error(`Failed to delete "${todoContent}"`);
        console.error('Delete todo error:', error);
      });
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <Checkbox 
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={handleToggle}
        />
        <label 
          htmlFor={`todo-${todo.id}`}
          className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}
        >
          {todoContent}
        </label>
      </div>
      <Button variant="ghost" size="icon" onClick={handleDelete} className="text-gray-500 hover:text-red-500">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
