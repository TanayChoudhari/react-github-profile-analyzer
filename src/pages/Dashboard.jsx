import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material'
  
import SearchIcon from '@mui/icons-material/Search'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

import { useRef, useState } from 'react'
import { getGithubProfile } from '../services/getGithubProfile.service'
import { getGithubRepositories } from '../services/getGithubRepositories.service'
import { getLanguageCount } from '../services/getLanguageCount.service'
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import RepositoryGrid from '../components/RepositoryGrid';
import LanguageStats from '../components/LanguageStats';
  
export default function Dashboard({ theme, onToggleTheme }) {
	const usernameRef = useRef();
	const [profile, setProfile] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [languageCount, setLanguageCount] = useState({})
  const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleAnalyze = async () => {
		try {
			const username = usernameRef.current.value;
			if(username){
        setError('')
				setLoading(true)
        const [profileData, repositoryData] = await Promise.all([
            getGithubProfile(username),
            getGithubRepositories(username),
          ])
        const languageData = await getLanguageCount(username, repositoryData)
        setProfile(profileData)
        setRepositories(repositoryData)
        setLanguageCount(languageData)
			}
		}
		catch (error){
			console.error(error)
      setProfile(null)
      setRepositories([])
      setLanguageCount({})
      setError(error.message)
		}
		finally{
			setLoading(false)
		}
	}

    return (
      <Box className="dashboard" sx={{ py: { xs: 4, md: 7 } }}>
  
        {/* Header */}
        <Box className="dashboard-intro" sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Button
            className="theme-toggle"
            variant="outlined"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </Button>
          <Typography className="dashboard-kicker">
            OPEN SOURCE / PROFILE INTELLIGENCE
          </Typography>
          <Typography
            className="dashboard-title"
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
          >
            GitHub Profile Evaluator
          </Typography>
        </Box>
  
  
        {/* Search */}
        <Paper
          className="search-panel"
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            display: 'flex',
            gap: 2,
            maxWidth: 760,
            mx: 'auto',
            mb: 5,
          }}
        >
          <TextField
            fullWidth
            label="GitHub Username"
			      inputRef={usernameRef}
            placeholder="e.g. octocat"
          />
  
          <Button
            className="analyze-button"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ px: 4 }}
			      onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? 'Evaluating...' : 'Evaluate profile'}
          </Button>
  
        </Paper>

        {error && (
          <Alert severity="error" sx={{ maxWidth: 760, mx: 'auto', mb: 5 }}>
            {error}
          </Alert>
        )}
  
  
        {/* Profile */}
        <Box className="results-area">
          {profile ? (
            <Box sx={{ mb: 3 }}>
              <ProfileHeader profile={profile} />
              <ProfileStats profile={profile} />
              <RepositoryGrid repositories={repositories} loading={loading} />
              <LanguageStats languageCount={languageCount} loading={loading} />
            </Box>

          ) : (
            <Box className="empty-state">
              <Typography className="empty-state-mark">@</Typography>
              <Typography variant="h5">Your next profile starts here</Typography>
              <Typography color="text.secondary">
                Search a GitHub username to surface the essentials.
              </Typography>
            </Box>
          )}
		      
        </Box>
  
      </Box>
    )
  }