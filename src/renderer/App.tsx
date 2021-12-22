import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import { GlobalContext } from './contexts';
import { Home, Config, Messages } from './pages';
import { GlobalStyle } from './styles/global';

export default function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-800 p-5">
      <GlobalContext>
        <Router>
          <Switch>
            <Route path="/config" exact component={Config} />

            <Route path="/messages" exact component={Messages} />

            <Route path="/home" exact component={Home} />

            <Redirect to="/config" />
          </Switch>
        </Router>
      </GlobalContext>

      <GlobalStyle />
    </div>
  );
}
