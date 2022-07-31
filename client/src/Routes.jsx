import {
  Route,
  Routes as Switch,
} from 'react-router-dom'
import Home from './components/Home'
import Election from './components/Election'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:electionId" element={<Election />} />
    </Switch>
  )
}

export default Routes
