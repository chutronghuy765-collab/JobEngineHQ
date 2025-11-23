import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Terms of Service
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
          By using JobEngineHQ, you agree to these terms of service. Please read them carefully.
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
          User Responsibilities
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          Users are responsible for maintaining the confidentiality of their account information
          and for all activities that occur under their account.
        </Typography>
      </Paper>
    </Container>
  )
}

export default TermsOfService

