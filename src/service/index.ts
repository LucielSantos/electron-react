import axios, { AxiosInstance } from 'axios';
import { store } from '../main/main';

export default class ApiBuilder {
  serverApi: AxiosInstance;

  constructor() {
    this.build();
  }

  public build(configs?: { listenerIp: string; listenerPort: string }) {
    const listenerIp = configs?.listenerIp || store?.get('listenerIp');
    const listenerPort = configs?.listenerPort || store?.get('listenerPort');

    let newApi: AxiosInstance;

    if (listenerIp && listenerPort) {
      newApi = axios.create({
        baseURL: `${listenerIp}:${listenerPort}/`,
      });
    } else {
      newApi = axios.create();
    }

    this.serverApi = newApi;
  }
}
