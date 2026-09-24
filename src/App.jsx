import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState(() => (
    localStorage.getItem('profile-analyzer-theme') || 'light'
  ))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('profile-analyzer-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <Container maxWidth={false} className="app-shell">
      <Box component="header" className="top-nav">
        <Box className="brand-mark">
          <Box className="brand-mark-icon">GH</Box>
          <Box component="span">Profile analyzer</Box>
        </Box>
        <Box component="nav" className="product-nav" aria-label="Primary navigation">
          <a className="product-nav-link active" href="#profile">Profile</a>
          <a className="product-nav-link" href="#repositories">Repositories</a>
          <a className="product-nav-link" href="#languages">Languages</a>
        </Box>
        <Box className="nav-tools">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </button>
          <a className="nav-action" href="https://github.com" target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </Box>
      </Box>
      <Dashboard />
      <Footer />
    </Container>
  )
}

export default App