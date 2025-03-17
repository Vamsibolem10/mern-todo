
import React from 'react';
import { useSelector } from 'react-redux';
import { setFilter } from '../store/todoSlice';
import { RootState } from '../store/store';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '../hooks/useAppDispatch';

const TodoFilter: React.FC = () => {
  const filter = useSelector((state: RootState) => state.todos.filter);
  const dispatch = useAppDispatch();

  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value as 'all' | 'active' | 'completed'));
  };

  return (
    <div className="mb-6">
      <Tabs value={filter} onValueChange={handleFilterChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TodoFilter;
