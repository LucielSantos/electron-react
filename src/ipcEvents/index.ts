import Store from 'electron-store';
import ApiBuilder from '../service';
import { buildStoreEvents } from './store';
import { buildDatabaseEvents } from './database';

export const buildEvents = (store: Store, api: ApiBuilder) => {
  buildStoreEvents(store, api);
  buildDatabaseEvents();
};
