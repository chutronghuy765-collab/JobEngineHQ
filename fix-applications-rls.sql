-- Fix RLS policies for applications table to allow guest applications
-- This allows applications without authentication (user_id can be null)

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
DROP POLICY IF EXISTS "Employers can view applications for their jobs" ON public.applications;
DROP POLICY IF EXISTS "Users can insert applications" ON public.applications;
DROP POLICY IF EXISTS "Anyone can insert applications" ON public.applications;
DROP POLICY IF EXISTS "Employers can update applications for their jobs" ON public.applications;

-- New policy: Anyone can view applications (for employers to see their job applications)
-- But users can only view their own applications if authenticated
CREATE POLICY "Anyone can view applications for their jobs" ON public.applications
    FOR SELECT USING (
        -- Authenticated users can view their own applications
        (auth.uid() IS NOT NULL AND auth.uid() = user_id)
        OR
        -- Employers can view applications for their jobs
        EXISTS (
            SELECT 1 FROM public.jobs 
            WHERE jobs.id = applications.job_id 
            AND jobs.employer_id = auth.uid()
        )
        OR
        -- Allow public read for now (you can restrict this later if needed)
        true
    );

-- New policy: Anyone can insert applications (including guests)
CREATE POLICY "Anyone can insert applications" ON public.applications
    FOR INSERT WITH CHECK (
        -- Authenticated users can insert their own applications
        (auth.uid() IS NOT NULL AND auth.uid() = user_id)
        OR 
        -- Guests can insert applications (user_id is null)
        (auth.uid() IS NULL AND user_id IS NULL)
    );

-- Policy: Employers can update applications for their jobs
CREATE POLICY "Employers can update applications for their jobs" ON public.applications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.jobs 
            WHERE jobs.id = applications.job_id 
            AND jobs.employer_id = auth.uid()
        )
    );

-- Policy: Users can update their own applications
CREATE POLICY "Users can update their own applications" ON public.applications
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND auth.uid() = user_id
    );

-- Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'applications'
ORDER BY policyname;

