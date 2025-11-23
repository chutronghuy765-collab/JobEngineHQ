import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Privacy Policy
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
          Your privacy is important to us. This privacy policy explains how we collect, use, and
          protect your personal information.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
          Information We Collect
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          We collect information that you provide directly to us, such as when you create an
          account, apply for a job, or contact us.
        </Typography>
      </Paper>
    </Container>
  )
}

export default PrivacyPolicy

