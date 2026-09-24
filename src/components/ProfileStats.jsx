import {
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Link,
  Typography,
} from '@mui/material'

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'

function getStarredInsights(starredRepositories) {
  const technologies = new Set()
  const interests = new Set()

  starredRepositories.forEach((repository) => {
    if (repository.language) technologies.add(repository.language)
    repository.topics?.forEach((topic) => interests.add(topic))
  })

  return {
    technologies: [...technologies].slice(0, 8),
    interests: [...interests].slice(0, 10),
    recentProjects: starredRepositories.slice(0, 5),
  }
}

export default function ProfileStats ({ profile, starredRepositories, loading }) {
  const { technologies, interests, recentProjects } = getStarredInsights(starredRepositories)
  const stats = [
    { label: 'Followers', value: profile.followers, icon: <GroupOutlinedIcon /> },
    { label: 'Following', value: profile.following, icon: <PersonAddAltOutlinedIcon /> },
    { label: 'Total Repos', value: profile.public_repos, icon: <CodeOutlinedIcon /> },
    { label: 'Starred Repos', value: loading ? '...' : starredRepositories.length, icon: <StarBorderOutlinedIcon /> },
  ]

  return (
    <Box className="profile-stats">
      <Grid container spacing={2}>
        {stats.map(({ label, value, icon }) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={label}>
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

      <Grid className="starred-insights" container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="insight-card" elevation={0}>
            <CardContent>
              <Box className="insight-heading">
                <AutoAwesomeOutlinedIcon />
                <Typography variant="h6">Technologies</Typography>
              </Box>
              {loading ? <Typography className="insight-muted">Loading starred work...</Typography> : (
                <Box className="insight-chips">
                  {technologies.length ? technologies.map((technology) => <Chip key={technology} label={technology} size="small" />) : <Typography className="insight-muted">No language data yet.</Typography>}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="insight-card" elevation={0}>
            <CardContent>
              <Box className="insight-heading">
                <InterestsOutlinedIcon />
                <Typography variant="h6">Interests</Typography>
              </Box>
              {loading ? <Typography className="insight-muted">Reading interests...</Typography> : (
                <Box className="insight-chips">
                  {interests.length ? interests.map((interest) => <Chip key={interest} label={interest} size="small" />) : <Typography className="insight-muted">No repository topics yet.</Typography>}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="insight-card" elevation={0}>
            <CardContent>
              <Box className="insight-heading">
                <StarBorderOutlinedIcon />
                <Typography variant="h6">Recently starred</Typography>
              </Box>
              {loading ? <Typography className="insight-muted">Loading projects...</Typography> : (
                <Box className="recent-projects">
                  {recentProjects.length ? recentProjects.map((repository) => (
                    <Link className="recent-project" href={repository.html_url} target="_blank" rel="noreferrer" key={repository.id}>
                      <Typography>{repository.name}</Typography>
                      <OpenInNewOutlinedIcon />
                    </Link>
                  )) : <Typography className="insight-muted">No starred projects yet.</Typography>}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}