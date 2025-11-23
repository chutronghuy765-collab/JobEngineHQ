import { supabase } from '../supabase'
import { Job, WorkModel } from '../supabase'

export interface CreateJobData {
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  work_model?: WorkModel
  salary_min?: number
  salary_max?: number
  description: string
  requirements: string[]
  benefits: string[]
}

export interface UpdateJobData extends Partial<CreateJobData> {
  is_active?: boolean
}

export const jobService = {
  // Get all active jobs
  async getJobs(filters?: {
    location?: string
    type?: string
    company?: string
    search?: string
    work_model?: string
  }): Promise<Job[]> {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      // Removed order by to allow random shuffling

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }

    if (filters?.type) {
      query = query.eq('type', filters.type)
    }

    if (filters?.company) {
      query = query.ilike('company', `%${filters.company}%`)
    }

    if (filters?.work_model) {
      query = query.eq('work_model', filters.work_model)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching jobs:', error)
      throw new Error(error.message || 'Failed to fetch jobs')
    }

    return data || []
  },

  // Get job by ID
  async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching job:', error)
      throw new Error(error.message || 'Failed to fetch job')
    }

    return data
  },

  // Create new job
  async createJob(jobData: CreateJobData): Promise<Job> {
    const { data: { user } } = await supabase.auth.getUser()

    const insertData = {
      ...jobData,
      employer_id: user?.id || null,
      is_active: true,
      is_verified: false
    }

    const { data, error } = await supabase
      .from('jobs')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating job:', error)
      throw new Error(error.message || 'Failed to create job')
    }

    return data
  },

  // Update job
  async updateJob(id: string, updates: UpdateJobData): Promise<Job> {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating job:', error)
      throw new Error(error.message || 'Failed to update job')
    }

    return data
  },

  // Delete job
  async deleteJob(id: string): Promise<void> {
    const { error } = await supabase.from('jobs').delete().eq('id', id)

    if (error) {
      console.error('Error deleting job:', error)
      throw new Error(error.message || 'Failed to delete job')
    }
  }
}

