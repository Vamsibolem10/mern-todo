
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchTodos } from '../store/todoSlice';
import { RootState } from '../store/store';
import TodoItem from './TodoItem';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, status, error, filter } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <Card className="shadow-sm">
      {todos.length > 0 && (
        <div className="p-4 pb-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {completedCount} of {todos.length} tasks completed
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
        </div>
      )}
      
      {filteredTodos.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          {todos.length === 0 ? 'No tasks yet' : 'No tasks match your filter'}
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default TodoList;
