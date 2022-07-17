import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Routes from './Routes'

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes />
        </Layout>
      </div>
    </Router>
  )
}

export default App
