const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function deleteAllJobs() {
  console.log('🗑️  Deleting all existing jobs...')
  
  const { data, error } = await supabase
    .from('jobs')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all
  
  if (error) {
    console.error('❌ Error:', error.message)
  } else {
    console.log('✅ All jobs deleted successfully!')
  }
}

deleteAllJobs().catch(console.error)

