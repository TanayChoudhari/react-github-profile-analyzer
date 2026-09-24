import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState(() => (
    localStorage.getItem('profile-analyzer-theme') || 'dark'
  ))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('profile-analyzer-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Container maxWidth="lg" className="app-shell">
      <Dashboard theme={theme} onToggleTheme={toggleTheme} />
      <Footer />
    </Container>
  )
}

export default App