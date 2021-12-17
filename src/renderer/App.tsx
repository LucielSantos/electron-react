import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { GlobalContext } from './contexts';
import { Home } from './pages';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
    };
  }
}

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-800 p-5">
      <GlobalContext>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </GlobalContext>
    </div>
  );
}
