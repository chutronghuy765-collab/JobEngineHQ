import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkIcon from '@mui/icons-material/Work'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import VerifiedIcon from '@mui/icons-material/Verified'
import ClearIcon from '@mui/icons-material/Clear'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { differenceInDays, format } from 'date-fns'
import { useJobs } from '../hooks/useJobs'
import { Job, WorkModel } from '../supabase'
import { applicationService } from '../services/applicationService'
import Pagination from '@mui/material/Pagination'

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels: WorkModel[] = ['on-site', 'remote', 'hybrid']

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

// Extract country from location string - maps cities and states to countries
const extractCountry = (location: string): string => {
  if (!location) return ''
  
  const locationLower = location.toLowerCase().trim()
  
  // Split by comma and get all parts
  const parts = location.split(',').map(p => p.trim())
  const lastPart = parts[parts.length - 1]
  const lastPartLower = lastPart.toLowerCase()
  
  // Map US states to "United States"
  const usStates = ['al', 'ak', 'az', 'ar', 'ca', 'co', 'ct', 'de', 'fl', 'ga', 'hi', 'id', 'il', 'in', 'ia', 'ks', 'ky', 'la', 'me', 'md', 'ma', 'mi', 'mn', 'ms', 'mo', 'mt', 'ne', 'nv', 'nh', 'nj', 'nm', 'ny', 'nc', 'nd', 'oh', 'ok', 'or', 'pa', 'ri', 'sc', 'sd', 'tn', 'tx', 'ut', 'vt', 'va', 'wa', 'wv', 'wi', 'wy', 'usa', 'united states', 'us']
  if (usStates.includes(lastPartLower)) {
    return 'United States'
  }
  
  // Map UK variations to "United Kingdom"
  const ukVariations = ['uk', 'united kingdom', 'england', 'scotland', 'wales', 'northern ireland', 'gb', 'great britain']
  if (ukVariations.includes(lastPartLower)) {
    return 'United Kingdom'
  }
  
  // Map major cities to their countries
  const cityToCountry: { [key: string]: string } = {
    // UK cities
    'london': 'United Kingdom',
    'manchester': 'United Kingdom',
    'birmingham': 'United Kingdom',
    'leeds': 'United Kingdom',
    'glasgow': 'United Kingdom',
    'edinburgh': 'United Kingdom',
    'liverpool': 'United Kingdom',
    'bristol': 'United Kingdom',
    'sheffield': 'United Kingdom',
    'newcastle': 'United Kingdom',
    'cardiff': 'United Kingdom',
    'belfast': 'United Kingdom',
    
    // US cities (major ones)
    'new york': 'United States',
    'los angeles': 'United States',
    'chicago': 'United States',
    'houston': 'United States',
    'phoenix': 'United States',
    'philadelphia': 'United States',
    'san antonio': 'United States',
    'san diego': 'United States',
    'dallas': 'United States',
    'austin': 'United States',
    'san jose': 'United States',
    'san francisco': 'United States',
    'seattle': 'United States',
    'boston': 'United States',
    'miami': 'United States',
    'atlanta': 'United States',
    'denver': 'United States',
    'portland': 'United States',
    'las vegas': 'United States',
    'detroit': 'United States',
    'washington': 'United States',
    'washington dc': 'United States',
    'washington d.c.': 'United States',
    'dc': 'United States',
    'washington, dc': 'United States',
    'washington, d.c.': 'United States',
    'minneapolis': 'United States',
    'tampa': 'United States',
    'orlando': 'United States',
    'charlotte': 'United States',
    'sacramento': 'United States',
    'kansas city': 'United States',
    'raleigh': 'United States',
    'omaha': 'United States',
    'oakland': 'United States',
    'tulsa': 'United States',
    'cleveland': 'United States',
    'wichita': 'United States',
    'arlington': 'United States',
    
    // Spanish cities
    'barcelona': 'Spain',
    'madrid': 'Spain',
    'valencia': 'Spain',
    'seville': 'Spain',
    'bilbao': 'Spain',
    'malaga': 'Spain',
    'zaragoza': 'Spain',
    
    // French cities
    'paris': 'France',
    'lyon': 'France',
    'marseille': 'France',
    'toulouse': 'France',
    'nice': 'France',
    'nantes': 'France',
    'strasbourg': 'France',
    'bordeaux': 'France',
    
    // German cities
    'berlin': 'Germany',
    'munich': 'Germany',
    'hamburg': 'Germany',
    'frankfurt': 'Germany',
    'cologne': 'Germany',
    'stuttgart': 'Germany',
    'düsseldorf': 'Germany',
    'dresden': 'Germany',
    
    // Italian cities
    'milan': 'Italy',
    'rome': 'Italy',
    'naples': 'Italy',
    'turin': 'Italy',
    'florence': 'Italy',
    'bologna': 'Italy',
    'venice': 'Italy',
    'genoa': 'Italy',
    
    // Other European cities
    'amsterdam': 'Netherlands',
    'rotterdam': 'Netherlands',
    'brussels': 'Belgium',
    'vienna': 'Austria',
    'stockholm': 'Sweden',
    'copenhagen': 'Denmark',
    'helsinki': 'Finland',
    'dublin': 'Ireland',
    'warsaw': 'Poland',
    'prague': 'Czech Republic',
    'budapest': 'Hungary',
    'bucharest': 'Romania',
    'athens': 'Greece',
    'lisbon': 'Portugal',
    
    // Middle East cities
    'dubai': 'UAE',
    'abu dhabi': 'UAE',
    'riyadh': 'Saudi Arabia',
    'jeddah': 'Saudi Arabia',
    'tel aviv': 'Israel',
    'istanbul': 'Turkey',
    'cairo': 'Egypt',
    'amman': 'Jordan',
    'beirut': 'Lebanon',
    'doha': 'Qatar',
    'kuwait city': 'Kuwait',
    'manama': 'Bahrain',
    'muscat': 'Oman',
    
    // Asian cities
    'mumbai': 'India',
    'delhi': 'India',
    'bangalore': 'India',
    'hyderabad': 'India',
    'chennai': 'India',
    'kolkata': 'India',
    'pune': 'India',
    'manila': 'Philippines',
    'dhaka': 'Bangladesh',
    'karachi': 'Pakistan',
    'ho chi minh city': 'Vietnam',
    'hanoi': 'Vietnam',
    'jakarta': 'Indonesia',
    'bangkok': 'Thailand',
    'colombo': 'Sri Lanka',
    'kathmandu': 'Nepal',
    'kuala lumpur': 'Malaysia'
  }
  
  // Check if the entire location or first part is a known city
  if (cityToCountry[locationLower]) {
    return cityToCountry[locationLower]
  }
  
  if (parts.length > 0 && cityToCountry[parts[0].toLowerCase()]) {
    return cityToCountry[parts[0].toLowerCase()]
  }
  
  // If last part is a known country name, return it
  const knownCountries = [
    'india', 'philippines', 'bangladesh', 'pakistan', 'vietnam', 'indonesia',
    'thailand', 'sri lanka', 'nepal', 'malaysia', 'china', 'japan', 'south korea',
    'singapore', 'australia', 'new zealand', 'canada', 'mexico', 'brazil',
    'argentina', 'chile', 'south africa', 'nigeria', 'egypt', 'kenya',
    'spain', 'france', 'germany', 'italy', 'netherlands', 'belgium', 'austria',
    'sweden', 'denmark', 'finland', 'norway', 'ireland', 'poland', 'portugal',
    'greece', 'romania', 'hungary', 'czech republic', 'switzerland', 'russia',
    'ukraine', 'uae', 'saudi arabia', 'israel', 'turkey', 'jordan', 'lebanon',
    'qatar', 'kuwait', 'bahrain', 'oman', 'iran', 'iraq'
  ]
  
  if (knownCountries.includes(lastPartLower)) {
    // Capitalize properly
    return lastPart.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }
  
  // If we have a comma, assume last part is country
  if (parts.length > 1) {
    return lastPart
  }
  
  // If no comma and not a known city, return empty (unknown location)
  return ''
}

const Jobs = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [workType, setWorkType] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [workModel, setWorkModel] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 12

  // Don't filter by location in API - we'll filter by country on client-side
  const { jobs: allJobs, loading, error } = useJobs({
    type: workType || undefined,
    work_model: workModel || undefined,
    search: searchQuery || undefined
  })
  
  // Filter jobs by selected country on client-side
  const jobs = selectedCountry
    ? allJobs.filter(job => extractCountry(job.location) === selectedCountry)
    : allJobs

  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [applyingJob, setApplyingJob] = useState<Job | null>(null)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        setSearchQuery(search)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, workType, selectedCountry, workModel])

  // Extract unique countries from all jobs (before filtering)
  const uniqueCountries = Array.from(
    new Set(allJobs.map(job => extractCountry(job.location)).filter(country => country))
  ).sort()

  // Filter jobs by selected country
  const filteredJobs = selectedCountry
    ? jobs.filter(job => extractCountry(job.location) === selectedCountry)
    : jobs

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)

  const handleApplyClick = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation()
    setApplyingJob(job)
    setApplyModalOpen(true)
    setSubmitSuccess(false)
    setSubmitError('')
  }

  const handleCloseModal = () => {
    setApplyModalOpen(false)
    setApplyingJob(null)
    setFormData({
      name: '',
      email: '',
      cover_letter: '',
      linkedin_profile: '',
      resume: null
    })
    setSubmitSuccess(false)
    setSubmitError('')
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyingJob) return

    setSubmitLoading(true)
    setSubmitError('')

    try {
      await applicationService.createApplication({
        job_id: applyingJob.id,
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
        handleCloseModal()
      }, 2000)
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit application')
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading jobs...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Search and Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            placeholder="Search jobs by title, company, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearch('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>Work Type</InputLabel>
              <Select
                value={workType}
                label="Work Type"
                onChange={(e) => setWorkType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                {workTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {formatWorkType(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={selectedCountry}
                label="Country"
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <MenuItem value="">All Countries</MenuItem>
                {uniqueCountries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 150 }}>
              <InputLabel>Work Model</InputLabel>
              <Select
                value={workModel}
                label="Work Model"
                onChange={(e) => setWorkModel(e.target.value)}
              >
                <MenuItem value="">All Models</MenuItem>
                {workModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model.charAt(0).toUpperCase() + model.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {(searchQuery || selectedCountry) && (
            <Typography variant="body2" color="text.secondary">
              {searchQuery && `Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''} for "${searchQuery}"`}
              {searchQuery && selectedCountry && ' • '}
              {selectedCountry && `Filtered by: ${selectedCountry}`}
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Jobs Grid */}
      {paginatedJobs.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No jobs found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate(`/job/${job.id}`)}
                >
                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            {job.title}
                          </Typography>
                          {job.is_verified && (
                            <VerifiedIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {job.company}
                        </Typography>
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
                      <Chip
                        icon={<LocationOnIcon sx={{ fontSize: 16 }} />}
                        label={job.location}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Chip
                        icon={<WorkIcon sx={{ fontSize: 16 }} />}
                        label={formatWorkType(job.type)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      {job.work_model && (
                        <Chip
                          label={job.work_model.charAt(0).toUpperCase() + job.work_model.slice(1)}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flexGrow: 1
                      }}
                    >
                      {job.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Chip
                        icon={<CalendarMonthIcon sx={{ fontSize: 14 }} />}
                        label={formatPostedDate(job.created_at)}
                        size="small"
                        sx={{ fontSize: '0.75rem' }}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => handleApplyClick(job, e)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 2
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      {/* Application Modal */}
      <Dialog
        open={applyModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">Apply for {applyingJob?.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {applyingJob?.company}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
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

          <form onSubmit={handleSubmitApplication}>
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
          </form>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseModal} disabled={submitLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmitApplication}
            variant="contained"
            disabled={submitLoading || !formData.name || !formData.email}
            startIcon={submitLoading ? <CircularProgress size={20} /> : null}
          >
            {submitLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Jobs

