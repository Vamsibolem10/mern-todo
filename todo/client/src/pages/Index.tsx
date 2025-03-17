
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import TodoInput from '@/components/TodoInput';
import TodoFilter from '@/components/TodoFilter';
import TodoList from '@/components/TodoList';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const { todos } = useSelector((state: RootState) => state.todos);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-lg mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-500">
            {todos.length} {todos.length === 1 ? 'task' : 'tasks'} in total
          </p>
        </div>

        <TodoInput />
        <TodoFilter />
        <Separator className="my-4" />
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
