import { useContext, useRef } from 'react';
import { TodoContext } from 'renderer/contexts/todo';

export const Home = (): JSX.Element => {
  const { addTodo, todos } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAdd = () => {
    if (inputRef.current) {
      addTodo(inputRef.current.value);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border-2 border-gray-200 rounded p-5">
      <div className="flex">
        <input
          ref={inputRef}
          className="w-full bg-transparent border-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent py-1 px-2 rounded-full"
        />

        <button
          className="px-7 rounded-full bg-cyan-400 ml-5 hover:bg-cyan-700"
          onClick={onClickAdd}
        >
          <span className="text-gray-800 font-semibold">Adicionar</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col text-white">
        {todos.map((todo, index) => (
          <div key={index} className="flex bg-gray-600 p-2 rounded-full mt-5">
            {todo.title}
          </div>
        ))}
      </div>
    </div>
  );
};
