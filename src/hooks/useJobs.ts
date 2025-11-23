import { useState, useEffect, useCallback } from 'react'
import { jobService, CreateJobData, UpdateJobData } from '../services/jobService'
import { Job } from '../supabase'

// Fisher-Yates shuffle algorithm for randomizing array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

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
      // Shuffle jobs to randomize display order
      const shuffledData = shuffleArray(data)
      setJobs(shuffledData)
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

