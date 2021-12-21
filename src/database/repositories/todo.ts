import { Todo } from '../entity/Todo';
import { Repository } from 'typeorm';
import { database } from '../../main/main';

export class TodoRepository {
  private repository: Repository<Todo>;

  constructor() {
    this.repository = database.connection?.getRepository(
      Todo
    ) as Repository<Todo>;
  }

  public save(todo: { title: string }) {
    return this.repository.save(todo);
  }

  public getAll() {
    return this.repository.find();
  }
}
