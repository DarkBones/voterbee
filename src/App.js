import './App.css';
import NavBar from './NavBar'
import Home from './Home'
import Election from './Election';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import db from 'shared/utils/firebase'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/:electionId">
              <Election />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
