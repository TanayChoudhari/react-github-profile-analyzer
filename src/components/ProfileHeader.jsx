import {
    Avatar,
    Box,
    Paper,
    Typography,
  } from '@mui/material'
  
  export default function ProfileHeader({ profile }) {
    return (
      <Paper sx={{ p: 4, mb: 3 }}>
  
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
  
          <Avatar
            src={profile.avatar_url}
            sx={{
              width: 90,
              height: 90,
            }}
          />
  
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {profile.name}
            </Typography>
  
            <Typography color="text.secondary">
              @{profile.login}
            </Typography>
  
            <Typography sx={{ mt: 1 }}>
              {profile.bio}
            </Typography>
          </Box>
  
        </Box>
  
      </Paper>
    )
  }