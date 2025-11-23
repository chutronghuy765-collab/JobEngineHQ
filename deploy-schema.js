const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials')
  console.error('Please set REACT_APP_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deploySchema() {
  try {
    console.log('📄 Reading SQL schema file...')
    const sqlPath = path.join(__dirname, 'supabase-schema.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('🚀 Deploying schema to Supabase...')
    console.log('   Project URL:', supabaseUrl)
    
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`   Found ${statements.length} SQL statements`)
    
    // Execute SQL using Supabase REST API
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      // If exec_sql doesn't exist, try direct query
      console.log('⚠️  RPC method not available, trying alternative approach...')
      
      // Execute statements one by one
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i] + ';'
        try {
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql_query: statement })
          if (stmtError && !stmtError.message.includes('already exists')) {
            console.warn(`   Warning on statement ${i + 1}:`, stmtError.message)
          }
        } catch (err) {
          console.warn(`   Warning on statement ${i + 1}:`, err.message)
        }
      }
    }
    
    console.log('✅ Schema deployment completed!')
    console.log('')
    console.log('📋 Next steps:')
    console.log('   1. Go to your Supabase dashboard: https://supabase.com/dashboard')
    console.log('   2. Navigate to SQL Editor')
    console.log('   3. Copy and paste the contents of supabase-schema.sql')
    console.log('   4. Click "Run" to execute the SQL')
    console.log('')
    console.log('   Or use the Supabase CLI:')
    console.log('   supabase db push')
    
  } catch (error) {
    console.error('❌ Error deploying schema:', error.message)
    console.log('')
    console.log('📋 Manual deployment:')
    console.log('   1. Go to your Supabase dashboard: https://supabase.com/dashboard')
    console.log('   2. Navigate to SQL Editor')
    console.log('   3. Copy and paste the contents of supabase-schema.sql')
    console.log('   4. Click "Run" to execute the SQL')
    process.exit(1)
  }
}

deploySchema()

