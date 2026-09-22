import { Container } from '@mui/material'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Container maxWidth="lg" className="app-shell">
      <Dashboard />
    </Container>
  )
}

export default App