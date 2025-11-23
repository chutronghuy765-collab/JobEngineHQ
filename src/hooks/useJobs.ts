import { useState, useEffect, useCallback } from 'react'
import { jobService, CreateJobData, UpdateJobData } from '../services/jobService'
import { Job } from '../supabase'

export const useJobs = (filters?: {
  location?: string
  type?: string
  company?: string
  search?: string
  work_model?: string
}) => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await jobService.getJobs(filters)
      setJobs(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  return {
    jobs,
    loading,
    error,
    fetchJobs
  }
}

export const useJob = (id: string) => {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchJob = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const data = await jobService.getJobById(id)
      setJob(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchJob()
  }, [fetchJob])

  return {
    job,
    loading,
    error,
    fetchJob
  }
}

