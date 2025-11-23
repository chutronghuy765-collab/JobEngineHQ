import React from 'react'
import { Container, Typography, Box, Paper, Grid } from '@mui/material'

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)'
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: 'white'
              }}
            >
              About JobEngineHQ
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                opacity: 0.95,
                maxWidth: '700px',
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.95)'
              }}
            >
              Connecting talented digital marketers with opportunities worldwide
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            mb: 4
          }}
        >
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
            JobEngineHQ is a leading job board platform dedicated to connecting talented digital
            marketers with top companies worldwide. We specialize in helping professionals find
            their dream jobs in the digital marketing industry.
          </Typography>

          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Our mission is to make job searching easier and more efficient for both job seekers
            and employers. We provide a seamless platform where companies can post job openings
            and candidates can discover opportunities that match their skills and career goals.
          </Typography>
        </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              For Job Seekers
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Browse through thousands of job listings from top companies. Use our advanced
              search filters to find the perfect opportunity that matches your skills, location,
              and preferences.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              For Employers
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Post your job openings and reach thousands of qualified candidates. Our platform
              makes it easy to manage applications and find the right talent for your team.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </Box>
  )
}

export default About

