const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Real companies and realistic job postings
const companies = [
  'Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Salesforce', 'Adobe', 'Oracle',
  'SAP', 'Shopify', 'HubSpot', 'Mailchimp', 'Hootsuite', 'Sprout Social', 'Buffer',
  'Canva', 'Figma', 'Slack', 'Zoom', 'Dropbox', 'Airbnb', 'Uber', 'Netflix',
  'Spotify', 'TikTok', 'Snapchat', 'Twitter', 'LinkedIn', 'Pinterest', 'Reddit',
  'Etsy', 'eBay', 'PayPal', 'Stripe', 'Square', 'Coinbase', 'Tesla', 'Nike',
  'Coca-Cola', 'PepsiCo', 'McDonald\'s', 'Starbucks', 'Disney', 'Warner Bros',
  'Sony', 'Samsung', 'LG', 'HP', 'Dell', 'Intel', 'NVIDIA'
]

const jobTitles = [
  'Digital Marketing Manager', 'Marketing Coordinator', 'Social Media Specialist',
  'Content Creator', 'SEO Analyst', 'PPC Specialist', 'Email Marketing Manager',
  'Marketing Analyst', 'Brand Manager', 'Product Marketing Manager',
  'Growth Marketing Manager', 'Performance Marketing Specialist', 'Marketing Automation Specialist',
  'Content Strategist', 'Community Manager', 'Influencer Relations Manager',
  'Marketing Operations Manager', 'Demand Generation Manager', 'Marketing Communications Manager',
  'Digital Campaign Manager', 'Marketing Data Analyst', 'Customer Acquisition Manager',
  'Retention Marketing Manager', 'Lifecycle Marketing Manager', 'Marketing Technology Manager'
]

const locations = [
  'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Boston', 'Seattle',
  'Austin', 'Denver', 'Miami', 'Atlanta', 'Dallas', 'Portland', 'San Diego',
  'London', 'Paris', 'Berlin', 'Amsterdam', 'Barcelona', 'Dublin', 'Stockholm',
  'Sydney', 'Melbourne', 'Singapore', 'Tokyo', 'Hong Kong', 'Dubai', 'Toronto',
  'Vancouver', 'Montreal', 'São Paulo', 'Mexico City', 'Buenos Aires'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'remote', 'hybrid']

// Generate realistic salary ranges based on job level
function getSalaryRange(title) {
  if (title.includes('Senior') || title.includes('Director') || title.includes('Lead')) {
    return { min: 100000, max: 180000 }
  } else if (title.includes('Manager') || title.includes('Specialist')) {
    return { min: 60000, max: 120000 }
  } else if (title.includes('Coordinator') || title.includes('Analyst')) {
    return { min: 45000, max: 75000 }
  } else {
    return { min: 50000, max: 90000 }
  }
}

// Generate job description
function generateDescription(title, company) {
  return `<h3>About ${company}</h3>
    <p>${company} is looking for a talented ${title} to join our marketing team. We're seeking a creative and data-driven professional who can help us grow our brand presence and drive meaningful engagement with our audience.</p>
    
    <h3>What You'll Do</h3>
    <ul>
      <li>Develop and execute comprehensive marketing strategies</li>
      <li>Manage cross-functional marketing campaigns</li>
      <li>Analyze marketing performance and optimize ROI</li>
      <li>Collaborate with internal teams and external partners</li>
      <li>Stay current with industry trends and best practices</li>
      <li>Create compelling content and messaging</li>
    </ul>
    
    <h3>What We're Looking For</h3>
    <p>We need someone who is passionate about marketing, results-oriented, and thrives in a fast-paced environment. You should have strong analytical skills, creativity, and the ability to work both independently and as part of a team.</p>`
}

// Generate requirements
function generateRequirements(title) {
  const baseRequirements = [
    'Bachelor\'s degree in Marketing, Business, Communications, or related field',
    'Strong written and verbal communication skills',
    'Proficiency with marketing tools and platforms',
    'Analytical mindset with attention to detail',
    'Ability to work in a fast-paced environment'
  ]

  if (title.includes('Senior') || title.includes('Manager')) {
    return [
      ...baseRequirements,
      '5+ years of experience in marketing',
      'Proven track record of successful campaigns',
      'Experience managing budgets and teams',
      'Strong leadership and project management skills'
    ]
  } else if (title.includes('Specialist') || title.includes('Analyst')) {
    return [
      ...baseRequirements,
      '3+ years of relevant marketing experience',
      'Experience with specific marketing channels',
      'Strong analytical and reporting skills'
    ]
  } else {
    return [
      ...baseRequirements,
      '1-2 years of marketing experience or internship',
      'Eagerness to learn and grow',
      'Strong organizational skills'
    ]
  }
}

// Generate benefits
const commonBenefits = [
  'Competitive salary and performance bonuses',
  'Comprehensive health, dental, and vision insurance',
  '401(k) or retirement plan with company matching',
  'Flexible work arrangements',
  'Professional development opportunities',
  'Generous paid time off',
  'Modern office environment',
  'Team building activities'
]

function generateBenefits() {
  return commonBenefits.sort(() => Math.random() - 0.5).slice(0, 6)
}

// Create 50 jobs
const jobs = []
const usedCombinations = new Set()

for (let i = 0; i < 50; i++) {
  let company, title, location, workType, workModel
  
  // Ensure unique combinations
  do {
    company = companies[Math.floor(Math.random() * companies.length)]
    title = jobTitles[Math.floor(Math.random() * jobTitles.length)]
    location = locations[Math.floor(Math.random() * locations.length)]
    workType = workTypes[Math.floor(Math.random() * workTypes.length)]
    workModel = workModels[Math.floor(Math.random() * workModels.length)]
  } while (usedCombinations.has(`${company}-${title}-${location}`) && usedCombinations.size < 50)
  
  usedCombinations.add(`${company}-${title}-${location}`)
  
  const salary = getSalaryRange(title)
  const isVerified = Math.random() < 0.3 // Only 30% are verified
  
  jobs.push({
    title: title,
    company: company,
    location: location,
    type: workType,
    work_model: workModel,
    is_verified: isVerified,
    salary_min: salary.min,
    salary_max: salary.max,
    description: generateDescription(title, company),
    requirements: generateRequirements(title),
    benefits: generateBenefits()
  })
}

async function createJobs() {
  console.log('🚀 Creating 50 additional job postings...')
  console.log(`   Verified jobs: ${jobs.filter(j => j.is_verified).length}`)
  console.log(`   Non-verified jobs: ${jobs.filter(j => !j.is_verified).length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    try {
      const verifiedBadge = job.is_verified ? '✓ Verified' : ''
      console.log(`[${i + 1}/${jobs.length}] Creating: ${job.title} at ${job.company} ${verifiedBadge}...`)
      
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          ...job,
          employer_id: null,
          is_active: true
        })
        .select()

      if (error) {
        console.error(`   ❌ Error: ${error.message}`)
        errorCount++
      } else {
        console.log(`   ✅ Success!`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}`)
      errorCount++
    }
    
    // Small delay to avoid rate limiting
    if (i < jobs.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }

  console.log('')
  console.log('='.repeat(50))
  console.log(`✅ Successfully created: ${successCount} jobs`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log(`📊 Verified: ${jobs.filter(j => j.is_verified).length} | Non-verified: ${jobs.filter(j => !j.is_verified).length}`)
  console.log('='.repeat(50))
}

// Run the script
createJobs().catch(console.error)

