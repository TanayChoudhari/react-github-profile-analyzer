import { Container } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

function App() {
  return (
    <Container maxWidth="lg" className="app-shell">
      <Dashboard />
      <Footer />
    </Container>
  )
}

export default App