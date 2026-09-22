import {
  Avatar,
  Box,
  Paper,
  Typography,
} from '@mui/material'

import PublicIcon from '@mui/icons-material/Public';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { getYearFromDate } from '../utils/global.utils';
  
export default function ProfileHeader({ profile }) {
  const { name, login, location, created_at, bio, avatar_url } = profile
	
  return (
	<Paper className="profile-hero" elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, mb: 3 }}>
  
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 3,
				}}
			>
	
				<Avatar className="profile-avatar"
					src={avatar_url}
					sx={{
					width: 90,
					height: 90,
					}}
				/>
	
				<Box className="profile-copy">
					<Typography className="profile-name" variant="h5" fontWeight={700}>{name}</Typography>
		
					<Box
						className="profile-meta"
						sx={{
							'& > *': { flexShrink: 0 },
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							color: 'text.primary',
							whiteSpace: 'nowrap',
						}}
					>
						<Typography component="span">@{login}</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
							<PublicIcon sx={{ fontSize: '16px' }} />
							<Typography component="span">{location}</Typography>
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
							<CalendarMonthIcon sx={{ fontSize: '16px' }} />
							<Typography component="span">Joined {getYearFromDate(created_at)}</Typography>
						</Box>
					</Box>
		
					<Typography sx={{ mt: 1 }}>{bio}</Typography>
				</Box>
			</Box>
		</Paper>
  )
}