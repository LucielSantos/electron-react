import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { GlobalContext } from './contexts';
import { Home } from './pages';

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
