import { BrowserWindow } from 'electron';
import express from 'express';
import ip from 'ip';

export default class ExpressServerBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;

    const expressApp = express();

    expressApp.use(express.json());

    expressApp.get('/endpoint', (_, res) => {
      this.sendToRenderer('test-config');

      return res.json({ message: 'success', ip: ip.address() });
    });

    expressApp.post('/receive-message', (req, res) => {
      const { name, text } = req.body;

      this.sendToRenderer('receive-message', { name, text });

      return res.status(200).send();
    });

    expressApp.listen(3333, () => {
      console.log('Express app is running');
    });
  }

  private sendToRenderer(chanel: string, ...args: any[]) {
    this.mainWindow?.webContents.send(chanel, ...args);
  }
}
