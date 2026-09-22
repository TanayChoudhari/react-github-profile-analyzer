import {
    Grid,
    Card,
    CardContent,
    Typography,
  } from '@mui/material'

  export default ProfileStats ({stats}) {
    return (
        <Grid container spacing={2}>

  <Grid size={{ xs: 12, sm: 4 }}>
    <Card>
      <CardContent>
        <Typography color="text.secondary">
          Followers
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {profile.followers}
        </Typography>
      </CardContent>
    </Card>
  </Grid>


  <Grid size={{ xs: 12, sm: 4 }}>
    <Card>
      <CardContent>
        <Typography color="text.secondary">
          Following
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {profile.following}
        </Typography>
      </CardContent>
    </Card>
  </Grid>


  <Grid size={{ xs: 12, sm: 4 }}>
    <Card>
      <CardContent>
        <Typography color="text.secondary">
          Repositories
        </Typography>

        <Typography variant="h4" fontWeight={700}>
          {profile.public_repos}
        </Typography>
      </CardContent>
    </Card>
  </Grid>

</Grid>
    )
  }