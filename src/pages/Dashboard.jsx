import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material'
  
import SearchIcon from '@mui/icons-material/Search'

import { useRef, useState } from 'react'
import { getGithubProfile } from '../services/getGithubProfile.service'
import { getGithubRepositories } from '../services/getGithubRepositories.service'
import { getLanguageCount } from '../services/getLanguageCount.service'
import { getStarredRepositories } from '../services/getStarredRepositories.service'
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
import RepositoryGrid from '../components/RepositoryGrid';
import LanguageStats from '../components/LanguageStats';
import { calculateProfileScore } from '../utils/profileScore.utils'
  
export default function Dashboard() {
	const usernameRef = useRef();
	const [profile, setProfile] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [starredRepositories, setStarredRepositories] = useState([])
  const [languageCount, setLanguageCount] = useState({})
  const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

  const handleAnalyze = async (event) => {
    event?.preventDefault()
    const username = usernameRef.current?.value.trim()

    if (!username) {
      setError('Please enter a GitHub username')
      return
    }

		try {
      setError('')
				setLoading(true)
      const [profileData, repositoryData] = await Promise.all([
            getGithubProfile(username),
            getGithubRepositories(username),
          ])
      const starredRepositoryData = await getStarredRepositories(username)
      const languageData = await getLanguageCount(username, repositoryData)
      setProfile(profileData)
      setRepositories(repositoryData)
      setStarredRepositories(starredRepositoryData)
      setLanguageCount(languageData)
		}
		catch (error){
			console.error(error)
      setProfile(null)
      setRepositories([])
      setStarredRepositories([])
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
            Find your open-source footprint
          </Typography>
          <Typography className="dashboard-subtitle">
            Explore a developer profile, the projects they have built, and the languages behind their work.
          </Typography>
        </Box>
  
  
        {/* Search */}
        <Paper
          className="search-panel"
          component="form"
          onSubmit={handleAnalyze}
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
            className="search-field"
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
            type="submit"
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
              <Box id="profile">
                <ProfileHeader
                  profile={profile}
                  score={calculateProfileScore({
                    profile,
                    repositories,
                    starredRepositories,
                    languageCount,
                  })}
                />
              </Box>
              <ProfileStats
                profile={profile}
                starredRepositories={starredRepositories}
                loading={loading}
              />
              <Box id="repositories">
                <RepositoryGrid repositories={repositories} loading={loading} />
              </Box>
              <Box id="languages">
                <LanguageStats languageCount={languageCount} loading={loading} />
              </Box>
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