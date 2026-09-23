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
import { getGithubProfile } from '../services/getUserDetailByUsername.service'
import ProfileHeader from '../components/ProfileHeader';
import ProfileStats from '../components/ProfileStats';
  
export default function Dashboard() {
	const usernameRef = useRef();
	const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleAnalyze = async () => {
		try {
			const username = usernameRef.current.value;
			if(username){
        setError('')
				setLoading(true)
			  const data = await getGithubProfile(username)
				setProfile(data)
			}
		}
		catch (error){
			console.error(error)
      setProfile(null)
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