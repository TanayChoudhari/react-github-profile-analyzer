import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material'

import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'

export default function ProfileRecommendations({ breakdown }) {
  const recommendations = [...breakdown]
    .sort((first, second) => (first.score / first.maximum) - (second.score / second.maximum))
    .slice(0, 3)

  return (
    <Box className="recommendations-section">
      <Box className="recommendations-heading">
        <Box>
          <Typography className="section-kicker">NEXT STEPS</Typography>
          <Typography className="recommendations-title" variant="h5">
            Raise your profile score
          </Typography>
        </Box>
        <Typography className="recommendations-count">
          Focus on these opportunities first
        </Typography>
      </Box>

      <Box className="recommendations-grid">
        {recommendations.map((recommendation) => {
          const percentage = (recommendation.score / recommendation.maximum) * 100

          return (
            <Card className="recommendation-card" elevation={0} key={recommendation.key}>
              <CardContent>
                <Box className="recommendation-card-heading">
                  <Box className="recommendation-icon">
                    <TipsAndUpdatesOutlinedIcon />
                  </Box>
                  <Typography className="recommendation-label">
                    {recommendation.label}
                  </Typography>
                  <Typography className="recommendation-score">
                    {Math.round(recommendation.score)}/{recommendation.maximum}
                  </Typography>
                </Box>
                <LinearProgress
                  className="recommendation-progress"
                  variant="determinate"
                  value={percentage}
                />
                <Typography className="recommendation-copy">
                  {recommendation.recommendation}
                </Typography>
                <ArrowForwardOutlinedIcon className="recommendation-arrow" />
              </CardContent>
            </Card>
          )
        })}
      </Box>
    </Box>
  )
}