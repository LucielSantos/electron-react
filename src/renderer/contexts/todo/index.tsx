import { createContext, useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/todo';

interface TodoPropsContext {
  todos: Todo[];
  addTodo(title: string): void;
  removeTodo(index: number): void;
}

const DEFAULT_VALUE: TodoPropsContext = {
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
};

const TodoContext = createContext<TodoPropsContext>(DEFAULT_VALUE);

const TodoContextProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<TodoPropsContext['todos']>(
    window.electron.store.get('todos') || DEFAULT_VALUE.todos
  );

  const addTodo = useCallback<TodoPropsContext['addTodo']>((title) => {
    setTodos((prev) => {
      const newValue = [{ title }, ...prev];

      window.electron.saveTodos(newValue);

      return newValue;
    });
  }, []);

  const removeTodo = useCallback<TodoPropsContext['removeTodo']>(
    (removeIndex) => {
      setTodos((prev) => {
        const newValue = prev.filter((_todo, index) => removeIndex !== index);

        window.electron.saveTodos(newValue);

        return newValue;
      });
    },
    []
  );

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoContextProvider };
