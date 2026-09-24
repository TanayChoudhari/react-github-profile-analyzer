import {
  Box,
  LinearProgress,
  Typography,
} from '@mui/material'

import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined'

const LANGUAGE_COLORS = [
  '#b8f36b',
  '#7de1c2',
  '#f4c95d',
  '#ef8f6b',
  '#b69cff',
]

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`
}

export default function LanguageStats({ languageCount, loading }) {
  const allLanguages = Object.entries(languageCount)
    .sort(([, firstBytes], [, secondBytes]) => secondBytes - firstBytes)
  const languages = allLanguages.slice(0, 8)
  const totalBytes = allLanguages.reduce((total, [, bytes]) => total + bytes, 0)

  return (
    <Box className="languages-section">
      <Box className="languages-heading">
        <Box>
          <Typography className="section-kicker">CODE COMPOSITION</Typography>
          <Typography className="languages-title" variant="h5">
            Languages used
          </Typography>
        </Box>
        <Typography className="languages-count">
          {loading ? 'Calculating...' : `${languages.length} languages detected`}
        </Typography>
      </Box>

      {loading ? (
        <Box className="languages-empty">
          <DataObjectOutlinedIcon />
          <Typography>Reading language usage across repositories...</Typography>
        </Box>
      ) : languages.length === 0 ? (
        <Box className="languages-empty">
          <DataObjectOutlinedIcon />
          <Typography>No language data available yet.</Typography>
        </Box>
      ) : (
        <Box className="languages-panel">
          {languages.map(([language, bytes], index) => {
            const percentage = (bytes / totalBytes) * 100

            return (
              <Box className="language-row" key={language}>
                <Box className="language-row-heading">
                  <Box className="language-name">
                    <Box
                      className="language-dot"
                      sx={{ backgroundColor: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length] }}
                    />
                    <Typography>{language}</Typography>
                  </Box>
                  <Typography className="language-value">
                    {percentage.toFixed(1)}% / {formatBytes(bytes)}
                  </Typography>
                </Box>
                <LinearProgress
                  className="language-progress"
                  variant="determinate"
                  value={percentage}
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length],
                    },
                  }}
                />
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}
