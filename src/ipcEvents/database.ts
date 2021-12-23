import { TodoRepository } from '../database/repositories/todo';
import { ipcMain } from 'electron';

export const buildDatabaseEvents = () => {
  ipcMain.on('save-todo', async (_, todo) => {
    const todoRepository = new TodoRepository();

    await todoRepository.save(todo);
  });

  ipcMain.on('get-todos', async (event) => {
    const todoRepository = new TodoRepository();

    event.returnValue = await todoRepository.getAll();
  });
};
