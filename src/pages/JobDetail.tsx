import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkIcon from '@mui/icons-material/Work'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import VerifiedIcon from '@mui/icons-material/Verified'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { differenceInDays, format } from 'date-fns'
import { useJob } from '../hooks/useJobs'
import { applicationService } from '../services/applicationService'

function formatPostedDate(dateString: string) {
  if (!dateString) return ''
  const now = new Date()
  const posted = new Date(dateString)
  const diff = differenceInDays(now, posted)
  if (diff <= 0) return 'Just now'
  if (diff === 1) return '1 day ago'
  if (diff <= 7) return `${diff} days ago`
  return format(posted, 'MMM d, yyyy')
}

const formatWorkType = (type: string) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
}

const JobDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { job, loading, error } = useJob(id || '')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cover_letter: '',
    linkedin_profile: '',
    resume: null as File | null
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!job || !id) return

    setSubmitLoading(true)
    setSubmitError('')

    try {
      await applicationService.createApplication({
        job_id: id,
        name: formData.name,
        email: formData.email,
        cover_letter: formData.cover_letter,
        linkedin_profile: formData.linkedin_profile,
        resume_url: formData.resume ? formData.resume.name : undefined
      })

      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        cover_letter: '',
        linkedin_profile: '',
        resume: null
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit application')
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading job details...</Typography>
      </Container>
    )
  }

  if (error || !job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Job not found.'}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/jobs')}
          sx={{ mt: 2 }}
        >
          Back to Jobs
        </Button>
      </Container>
    )
  }

  const salaryText =
    job.salary_min && job.salary_max
      ? `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`
      : job.salary_min
      ? `From $${job.salary_min.toLocaleString()}`
      : ''

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/jobs')}
        sx={{ mb: 3, textTransform: 'none' }}
      >
        Back to Jobs
      </Button>

      <Grid container spacing={4}>
        {/* Job Details */}
        <Grid item xs={12} md={8}>
          {/* Company Header */}
          <Box
            sx={{
              height: 200,
              backgroundImage: `url(https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=667eea&color=fff&size=400&bold=true)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
              mb: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)'
              }
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 1,
                color: 'white'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                {job.title}
                {job.is_verified && (
                  <VerifiedIcon sx={{ color: 'white', fontSize: 32 }} />
                )}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 500 }}>
                {job.company} • {job.location}
              </Typography>
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >

            <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<LocationOnIcon />}
                label={job.location}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
              <Chip
                icon={<WorkIcon />}
                label={formatWorkType(job.type)}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
              {job.work_model && (
                <Chip
                  label={job.work_model.charAt(0).toUpperCase() + job.work_model.slice(1)}
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              )}
              <Chip
                icon={<CalendarMonthIcon />}
                label={formatPostedDate(job.created_at)}
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Job Description
            </Typography>
            <Box
              sx={{
                lineHeight: 1.8,
                '& h3': { fontSize: '1.3rem', fontWeight: 600, mt: 3, mb: 1.5 },
                '& p': { mb: 2, fontSize: '1rem' },
                '& ul': { pl: 3, mb: 2 },
                '& li': { mb: 1, fontSize: '1rem' }
              }}
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            {job.requirements && job.requirements.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Requirements
                </Typography>
                <Box component="ul" sx={{ pl: 2.5 }}>
                  {job.requirements.map((req, index) => (
                    <Typography component="li" key={index} sx={{ mb: 1, fontSize: '1rem' }}>
                      {req}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Benefits
                </Typography>
                <Box component="ul" sx={{ pl: 2.5 }}>
                  {job.benefits.map((benefit, index) => (
                    <Typography component="li" key={index} sx={{ mb: 1, fontSize: '1rem' }}>
                      {benefit}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Application Form */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              position: 'sticky',
              top: 20
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Apply for this position
            </Typography>

            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Application submitted successfully!
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                sx={{ mb: 2 }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                sx={{ mb: 2 }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Cover Letter (Optional)"
                name="cover_letter"
                value={formData.cover_letter}
                onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                multiline
                rows={4}
                sx={{ mb: 2 }}
                margin="normal"
              />
              <TextField
                fullWidth
                label="LinkedIn Profile (Optional)"
                name="linkedin_profile"
                value={formData.linkedin_profile}
                onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                sx={{ mb: 2 }}
                margin="normal"
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
                disabled={submitLoading}
              >
                Upload Resume (Optional)
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFormData({ ...formData, resume: e.target.files[0] })
                    }
                  }}
                />
              </Button>
              {formData.resume && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Selected: {formData.resume.name}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={submitLoading || !formData.name || !formData.email}
                startIcon={submitLoading ? <CircularProgress size={20} /> : null}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                {submitLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default JobDetail

