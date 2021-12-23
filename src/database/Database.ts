import { createConnection, Connection } from 'typeorm';
import path from 'path';
import { Todo } from './entity/Todo';

export default class DatabaseBuilder {
  public connection: Connection | undefined;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    this.connection = await createConnection({
      type: 'sqlite',
      database: path.join('./public', 'db.sqlite3'),
      entities: [Todo],
    });

    if (this.connection.isConnected) {
      this.connection.synchronize();
    }
  }
}
