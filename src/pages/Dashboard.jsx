import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
  } from '@mui/material'
  
import SearchIcon from '@mui/icons-material/Search'

import { useRef, useState } from 'react'
import { getGithubProfile } from '../services/githubApi'
import ProfileHeader from '../components/ProfileHeader';
  
export default function Dashboard() {
	const usernameRef = useRef();
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleAnalyze = async () => {
		try {
			const username = usernameRef.current.value;
			if(username){
				setLoading(true)
			  const data = await getGithubProfile(username)
				setProfile(data)
			}
		}
		catch (error){
			console.error(error)
		}
		finally{
			setLoading(false)
		}
	}

    return (
      <Box sx={{ py: 6 }}>
  
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            gutterBottom
          >
            GitHub Profile Analyzer
          </Typography>
  
          <Typography
            variant="h6"
            color="text.secondary"
          >
            Analyze GitHub profiles, repositories and contributions
          </Typography>
        </Box>
  
  
        {/* Search */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            gap: 2,
            maxWidth: 700,
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
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ px: 4 }}
			onClick={handleAnalyze}
          >
            Analyze
          </Button>
  
        </Paper>
  
  
        {/* Profile */}
        <Paper
          elevation={2}
          sx={{ p: 4 }}
        >
  
          <Typography variant="h5" fontWeight={600}>
            GitHub Profile
          </Typography>
  
          <Typography color="text.secondary">
            Search for a username to see profile information.
          </Typography>


		  <ProfileHeader profile={profile} />
  
        </Paper>
  
      </Box>
    )
  }