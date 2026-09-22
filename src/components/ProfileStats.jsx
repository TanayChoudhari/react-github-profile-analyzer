import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material'

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'

export default function ProfileStats ({profile}) {
  const stats = [
    { label: 'Followers', value: profile.followers, icon: <GroupOutlinedIcon /> },
    { label: 'Following', value: profile.following, icon: <PersonAddAltOutlinedIcon /> },
    { label: 'Repositories', value: profile.public_repos, icon: <CodeOutlinedIcon /> },
  ]

  return (
    <Grid container spacing={2}>
      {stats.map(({ label, value, icon }) => (
        <Grid size={{ xs: 12, sm: 4 }} key={label}>
          <Card className="stat-card" elevation={0}>
            <CardContent>
              <Box className="stat-card-top">
                <Typography color="text.secondary">{label}</Typography>
                <Box className="stat-icon">{icon}</Box>
              </Box>
              <Typography variant="h4" fontWeight={700}>{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}