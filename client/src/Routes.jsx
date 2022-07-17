import {
  Route,
  Routes as Switch,
} from 'react-router-dom'
import Home from './components/Home'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
    </Switch>
  )
}

export default Routes
