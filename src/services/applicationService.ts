import { supabase } from '../supabase'
import { Application } from '../supabase'

export interface CreateApplicationData {
  job_id: string
  name: string
  email: string
  cover_letter?: string
  linkedin_profile?: string
  resume_url?: string
}

export const applicationService = {
  // Create new application
  async createApplication(applicationData: CreateApplicationData): Promise<Application> {
    const { data: { user } } = await supabase.auth.getUser()

    // Verify job exists
    const { data: jobExists, error: jobError } = await supabase
      .from('jobs')
      .select('id, title, company')
      .eq('id', applicationData.job_id)
      .eq('is_active', true)
      .single()

    if (jobError || !jobExists) {
      throw new Error('Job not found or inactive')
    }

    const insertData = {
      job_id: applicationData.job_id,
      name: applicationData.name,
      email: applicationData.email,
      cover_letter: applicationData.cover_letter || '',
      linkedin_profile: applicationData.linkedin_profile,
      resume_url: applicationData.resume_url,
      user_id: user?.id || null,
      status: 'pending' as const
    }

    const { data, error } = await supabase
      .from('applications')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating application:', error)
      if (error.code === '23505') {
        throw new Error('You have already applied to this job.')
      }
      throw new Error(error.message || 'Failed to submit application')
    }

    return data
  }
}

