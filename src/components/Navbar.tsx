import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import logo from '../assets/job-logo-a-brand-symbol-design-graphic-minimalist-logo-vector-Photoroom.png'

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              gap: 1.5
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Jobs Logo"
              onError={(e) => {
                // Fallback nếu logo không load được
                e.currentTarget.style.display = 'none'
              }}
              sx={{
                height: { xs: 78, md: 104 },
                width: 'auto',
                display: 'block',
                maxWidth: { xs: 195, md: 260 }
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              JobEngineHQ
            </Typography>
          </Box>

          {/* Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to="/jobs"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                Browse Jobs
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                About
              </Button>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/jobs')}
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                px: 2.5,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.light',
                  color: 'primary.dark'
                }
              }}
            >
              {isMobile ? 'Search' : 'Search Jobs'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar

