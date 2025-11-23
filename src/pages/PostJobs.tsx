import React, { useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { jobService } from '../services/jobService'

const PostJobs = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'internship',
    work_model: 'remote' as 'on-site' | 'remote' | 'hybrid',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    benefits: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await jobService.createJob({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        work_model: formData.work_model,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : undefined,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : undefined,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        benefits: formData.benefits.split('\n').filter(b => b.trim())
      })

      setSuccess(true)
      setTimeout(() => {
        navigate('/jobs')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          py: { xs: 6, md: 8 },
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
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1, color: 'white' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                color: 'white'
              }}
            >
              Post a Job
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'rgba(255, 255, 255, 0.95)',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Reach thousands of qualified digital marketing professionals
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            mt: -6,
            position: 'relative',
            zIndex: 1,
            bgcolor: 'white'
          }}
        >
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Job posted successfully! Redirecting...
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Work Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Work Type"
                  onChange={(e) => handleSelectChange('type', e.target.value)}
                >
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Work Model</InputLabel>
                <Select
                  value={formData.work_model}
                  label="Work Model"
                  onChange={(e) => handleSelectChange('work_model', e.target.value)}
                >
                  <MenuItem value="on-site">On-site</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min Salary (Optional)"
                name="salary_min"
                type="number"
                value={formData.salary_min}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Salary (Optional)"
                name="salary_max"
                type="number"
                value={formData.salary_max}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={6}
                required
                placeholder="Enter detailed job description (HTML supported)"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Requirements (one per line)"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Enter each requirement on a new line"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Benefits (one per line)"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Enter each benefit on a new line"
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/jobs')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  {loading ? 'Posting...' : 'Post Job'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
      </Container>
    </Box>
  )
}

export default PostJobs

