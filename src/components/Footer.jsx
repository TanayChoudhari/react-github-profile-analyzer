import { Box, Typography } from '@mui/material'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box component="footer" className="app-footer">
      <Typography className="app-footer-copy">
        <Box component="span" className="copyright-symbol" aria-hidden="true">
          &copy;
        </Box>
        {year} Tanay Vaibhav Choudhari
      </Typography>
    </Box>
  )
}
