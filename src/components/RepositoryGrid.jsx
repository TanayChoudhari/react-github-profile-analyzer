import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Typography,
} from '@mui/material'

import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined'

function formatRelativeUpdateDate(updatedAt) {
	if (!updatedAt) return 'Update date unavailable'

	const elapsedDays = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000)

	if (elapsedDays <= 0) return 'Updated today'
	if (elapsedDays === 1) return 'Updated yesterday'
	if (elapsedDays < 7) return `Updated ${elapsedDays} days ago`
	if (elapsedDays < 30) {
		const weeks = Math.floor(elapsedDays / 7)
		return `Updated ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
	}
	if (elapsedDays < 365) {
		const months = Math.floor(elapsedDays / 30)
		return `Updated ${months} ${months === 1 ? 'month' : 'months'} ago`
	}

	const years = Math.floor(elapsedDays / 365)
	return `Updated ${years} ${years === 1 ? 'year' : 'years'} ago`
}

export default function RepositoryGrid({ repositories, loading }) {
	return (
	<Box className="repositories-section">
		<Box className="repositories-heading">
		<Box>
			<Typography className="section-kicker">SELECTED WORK</Typography>
			<Typography className="repositories-title" variant="h5">
			Repositories
			</Typography>
		</Box>
		<Typography className="repositories-count">
			{loading ? 'Loading...' : `${repositories.length} public projects`}
		</Typography>
		</Box>

		{loading ? (
		<Box className="repositories-empty">
			<CodeOutlinedIcon />
			<Typography>Collecting public repositories...</Typography>
		</Box>
		) : repositories.length === 0 ? (
		<Box className="repositories-empty">
			<CodeOutlinedIcon />
			<Typography>No public repositories to showcase yet.</Typography>
		</Box>
		) : (
		<Grid container spacing={2}>
			{repositories.map((repository) => (
			<Grid size={{ xs: 12, sm: 6, md: 4 }} key={repository.id}>
				<Card className="repository-card" elevation={0}>
				<CardContent>
					<Box className="repository-card-top">
					<CodeOutlinedIcon className="repository-icon" />
					<Link
						className="repository-link"
						href={repository.html_url}
						target="_blank"
						rel="noreferrer"
						aria-label={`Open ${repository.name} on GitHub`}
					>
						<OpenInNewOutlinedIcon />
					</Link>
					</Box>
					<Typography className="repository-name" variant="h6">
					{repository.name}
					</Typography>
					<Typography className="repository-description">
					{repository.description || 'No description provided.'}
					</Typography>
					<Typography className="repository-updated">
						<UpdateOutlinedIcon />
						{formatRelativeUpdateDate(repository.updated_at)}
					</Typography>
					<Box className="repository-meta">
					{repository.language && (
						<Chip label={repository.language} size="small" />
					)}
					<Box className="repository-stat">
						<StarBorderOutlinedIcon />
						{repository.stargazers_count}
					</Box>
					<Box className="repository-stat">
						<ForkRightOutlinedIcon />
						{repository.forks_count}
					</Box>
					</Box>
				</CardContent>
				</Card>
			</Grid>
			))}
		</Grid>
		)}
	</Box>
	)
}