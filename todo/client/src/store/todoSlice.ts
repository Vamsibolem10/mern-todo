
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export interface Todo {
  id: number;
  title?: string;
  text?: string;
  completed: boolean;
  userId?: number;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: 'all' | 'active' | 'completed';
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

// Updated API endpoint
const API_URL = 'http://localhost:5000/api/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json() as Promise<Todo[]>;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title: string) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      text: title,
      completed: false,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json() as Promise<Todo>;
});

// Modified to handle API errors gracefully and update UI optimistically
export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo', 
  async (todo: Todo, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: !todo.completed,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) {
        // If the API returns an error, we'll handle it but still update the UI
        console.error(`API error: Failed to toggle todo with id ${todo.id}`);
        // Return the optimistically updated todo
        return { ...todo, completed: !todo.completed };
      }
      
      return response.json() as Promise<Todo>;
    } catch (error) {
      console.error('Error toggling todo:', error);
      // Return the optimistically updated todo even on network errors
      return { ...todo, completed: !todo.completed };
    }
  }
);

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
