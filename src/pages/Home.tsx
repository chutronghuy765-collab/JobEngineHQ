import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Home = () => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate('/jobs')
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/jobs')
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.2,
                color: 'white'
              }}
            >
              Find Your Dream Job
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                mb: 4,
                opacity: 0.95,
                maxWidth: '600px',
                mx: 'auto',
                color: 'white'
              }}
            >
              Discover thousands of opportunities in digital marketing and connect with top companies worldwide
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/jobs')}
                startIcon={<SearchIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Browse Jobs
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Why Choose JobEngineHQ?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              onClick={handleCardClick}
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(102, 126, 234, 0.7), rgba(102, 126, 234, 0.9))'
                  }
                }}
              />
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    mt: -5,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: 3
                  }}
                >
                  <SearchIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Smart Search
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Find the perfect job that matches your skills and experience with our advanced search filters
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SearchIcon />}
                  onClick={handleButtonClick}
                  sx={{
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Search Jobs
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              onClick={handleCardClick}
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(76, 175, 80, 0.7), rgba(76, 175, 80, 0.9))'
                  }
                }}
              />
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'success.main',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    mt: -5,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: 3
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Top Companies
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Connect with leading digital marketing agencies and innovative companies worldwide
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<BusinessIcon />}
                  onClick={handleButtonClick}
                  sx={{
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: 'success.main',
                    color: 'success.main',
                    '&:hover': {
                      borderColor: 'success.dark',
                      bgcolor: 'success.light'
                    }
                  }}
                >
                  Browse Companies
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              onClick={handleCardClick}
              sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Box
                sx={{
                  height: 200,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(255, 152, 0, 0.7), rgba(255, 152, 0, 0.9))'
                  }
                }}
              />
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Box
                  sx={{
                    bgcolor: 'warning.main',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    mt: -5,
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: 3
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Career Growth
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Explore opportunities that help you grow professionally and advance your career
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<TrendingUpIcon />}
                  onClick={handleButtonClick}
                  sx={{
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderColor: 'warning.main',
                    color: 'warning.main',
                    '&:hover': {
                      borderColor: 'warning.dark',
                      bgcolor: 'warning.light'
                    }
                  }}
                >
                  Explore Careers
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          py: { xs: 6, md: 8 },
          borderTop: '1px solid',
          borderColor: 'divider',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.75rem', md: '2.25rem' }, color: 'white' }}
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.95)' }}>
              Join thousands of professionals who found their dream job through JobEngineHQ
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/jobs')}
              startIcon={<LocationOnIcon />}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease'
              }}
            >
              Explore Jobs Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home
