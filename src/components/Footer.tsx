import React from 'react'
import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import logo from '../assets/job-logo-a-brand-symbol-design-graphic-minimalist-logo-vector-Photoroom.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.300',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="Jobs Logo"
                sx={{
                  height: 104,
                  width: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                  maxWidth: 260
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.3rem'
                }}
              >
                JobEngineHQ
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
              Connecting talented digital marketers with top companies worldwide.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', fontWeight: 600, mb: 2 }}
            >
              For Job Seekers
            </Typography>
            <Stack spacing={1}>
              <Link
                component={RouterLink}
                to="/jobs"
                sx={{ color: 'grey.400', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Browse Jobs
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                sx={{ color: 'grey.400', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                About Us
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', fontWeight: 600, mb: 2 }}
            >
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 1 }}>
              Email:{' '}
              <Link
                href="mailto:support@jobenginehq.com"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                support@jobenginehq.com
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.800',
            mt: 4,
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {new Date().getFullYear()} JobEngineHQ. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              component={RouterLink}
              to="/privacy-policy"
              sx={{ color: 'grey.500', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' } }}
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms-of-service"
              sx={{ color: 'grey.500', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { color: 'white' } }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

