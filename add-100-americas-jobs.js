const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Americas companies - small to medium businesses
const companies = [
  // US
  'Austin Digital Marketing', 'Portland Creative Agency', 'Nashville Brand Studio', 'Raleigh Media Co',
  'Charlotte Marketing Hub', 'Indianapolis Digital Works', 'Columbus Creative Lab', 'Minneapolis Marketing',
  'Milwaukee Brand Agency', 'Kansas City Digital', 'Omaha Creative Studio', 'Des Moines Media',
  'Madison Marketing Co', 'Boise Digital Solutions', 'Salt Lake City Creative', 'Albuquerque Marketing',
  'Tucson Brand Studio', 'Fresno Digital Agency', 'Sacramento Marketing', 'Oakland Creative Works',
  'Birmingham Media Co', 'Memphis Digital Solutions', 'Louisville Marketing', 'Richmond Creative',
  'Norfolk Brand Studio', 'Buffalo Digital Agency', 'Rochester Marketing', 'Pittsburgh Creative',
  'Cleveland Media Co', 'Cincinnati Digital', 'Grand Rapids Marketing', 'Detroit Creative',
  'Tampa Brand Studio', 'Orlando Digital Agency', 'Jacksonville Marketing', 'Miami Creative Works',
  'Fort Lauderdale Media', 'West Palm Beach Digital', 'Tallahassee Marketing', 'Gainesville Creative',
  // Canada
  'Toronto Marketing Co', 'Vancouver Digital Agency', 'Montreal Creative Studio', 'Calgary Brand Works',
  'Ottawa Marketing Hub', 'Edmonton Digital Solutions', 'Winnipeg Creative', 'Quebec City Media',
  'Hamilton Marketing', 'London Digital Agency', 'Halifax Creative Co', 'Victoria Marketing',
  // Mexico
  'Mexico City Marketing', 'Guadalajara Digital Agency', 'Monterrey Creative Studio', 'Puebla Brand Works',
  'Tijuana Marketing Co', 'León Digital Solutions', 'Juárez Creative', 'Torreón Media',
  // Brazil
  'São Paulo Marketing', 'Rio de Janeiro Digital', 'Brasília Creative Agency', 'Salvador Brand Studio',
  'Fortaleza Marketing Co', 'Belo Horizonte Digital', 'Manaus Creative Works', 'Curitiba Media',
  // Argentina
  'Buenos Aires Marketing', 'Córdoba Digital Agency', 'Rosario Creative Studio', 'Mendoza Brand Works',
  // Chile
  'Santiago Marketing Co', 'Valparaíso Digital', 'Concepción Creative', 'La Serena Media',
  // Colombia
  'Bogotá Marketing', 'Medellín Digital Agency', 'Cali Creative Studio', 'Barranquilla Brand Works',
  // Peru
  'Lima Marketing Co', 'Arequipa Digital', 'Trujillo Creative', 'Chiclayo Media',
  // Other
  'San José Marketing', 'Panama City Digital', 'Quito Creative Agency', 'Lima Brand Studio'
]

const jobTitles = [
  'Digital Marketing Specialist', 'Social Media Manager', 'Content Marketing Coordinator',
  'SEO Specialist', 'PPC Account Manager', 'Email Marketing Specialist',
  'Marketing Assistant', 'Brand Manager', 'Community Engagement Coordinator',
  'Content Creator', 'Social Media Coordinator', 'Digital Marketing Coordinator',
  'Marketing Communications Manager', 'Growth Marketing Specialist', 'Marketing Operations Coordinator',
  'Digital Content Strategist', 'Social Media Content Creator', 'Marketing Data Analyst',
  'Brand Marketing Coordinator', 'Digital Advertising Specialist', 'Content Marketing Writer',
  'Social Media Analyst', 'Marketing Research Coordinator', 'Digital Marketing Intern',
  'Content Strategist', 'Social Media Specialist', 'Marketing Coordinator',
  'SEO Content Writer', 'PPC Specialist', 'Email Marketing Coordinator'
]

// Americas locations with proper country names
const locations = [
  // US
  'Austin, TX, United States', 'Portland, OR, United States', 'Nashville, TN, United States', 'Raleigh, NC, United States',
  'Charlotte, NC, United States', 'Indianapolis, IN, United States', 'Columbus, OH, United States', 'Minneapolis, MN, United States',
  'Milwaukee, WI, United States', 'Kansas City, MO, United States', 'Omaha, NE, United States', 'Des Moines, IA, United States',
  'Madison, WI, United States', 'Boise, ID, United States', 'Salt Lake City, UT, United States', 'Albuquerque, NM, United States',
  'Tucson, AZ, United States', 'Fresno, CA, United States', 'Sacramento, CA, United States', 'Oakland, CA, United States',
  'Birmingham, AL, United States', 'Memphis, TN, United States', 'Louisville, KY, United States', 'Richmond, VA, United States',
  'Norfolk, VA, United States', 'Buffalo, NY, United States', 'Rochester, NY, United States', 'Pittsburgh, PA, United States',
  'Cleveland, OH, United States', 'Cincinnati, OH, United States', 'Grand Rapids, MI, United States', 'Detroit, MI, United States',
  'Tampa, FL, United States', 'Orlando, FL, United States', 'Jacksonville, FL, United States', 'Miami, FL, United States',
  'Fort Lauderdale, FL, United States', 'West Palm Beach, FL, United States', 'Tallahassee, FL, United States', 'Gainesville, FL, United States',
  // Canada
  'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Calgary, Canada',
  'Ottawa, Canada', 'Edmonton, Canada', 'Winnipeg, Canada', 'Quebec City, Canada',
  'Hamilton, Canada', 'London, Canada', 'Halifax, Canada', 'Victoria, Canada',
  // Mexico
  'Mexico City, Mexico', 'Guadalajara, Mexico', 'Monterrey, Mexico', 'Puebla, Mexico',
  'Tijuana, Mexico', 'León, Mexico', 'Juárez, Mexico', 'Torreón, Mexico',
  // Brazil
  'São Paulo, Brazil', 'Rio de Janeiro, Brazil', 'Brasília, Brazil', 'Salvador, Brazil',
  'Fortaleza, Brazil', 'Belo Horizonte, Brazil', 'Manaus, Brazil', 'Curitiba, Brazil',
  // Argentina
  'Buenos Aires, Argentina', 'Córdoba, Argentina', 'Rosario, Argentina', 'Mendoza, Argentina',
  // Chile
  'Santiago, Chile', 'Valparaíso, Chile', 'Concepción, Chile', 'La Serena, Chile',
  // Colombia
  'Bogotá, Colombia', 'Medellín, Colombia', 'Cali, Colombia', 'Barranquilla, Colombia',
  // Peru
  'Lima, Peru', 'Arequipa, Peru', 'Trujillo, Peru', 'Chiclayo, Peru',
  // Other
  'San José, Costa Rica', 'Panama City, Panama', 'Quito, Ecuador', 'Montevideo, Uruguay'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'remote', 'hybrid']

// Generate unique job descriptions
function generateUniqueJob(index) {
  const scenarios = [
    () => ({
      desc: `<p>${companies[index]} is looking for a digital marketing professional to help our clients grow their online presence. We work with local businesses, startups, and established companies across the Americas.</p>
      <p><strong>What you'll do:</strong> Develop and execute digital marketing strategies including social media management, content creation, SEO, email marketing, and paid advertising. You'll work with multiple clients, each with unique needs and goals.</p>
      <p><strong>Our approach:</strong> We believe in data-driven marketing. Every campaign is tracked, analyzed, and optimized. You'll have access to tools like Google Analytics, SEMrush, Hootsuite, and Mailchimp.</p>
      <p><strong>Growth opportunities:</strong> As we expand, there are opportunities to take on larger accounts, manage a team, or specialize in areas like e-commerce marketing or B2B lead generation.</p>`,
      reqs: [
        '2+ years digital marketing experience',
        'Proficiency in social media platforms',
        'Experience with Google Ads and Facebook Ads',
        'Strong analytical and reporting skills',
        'Excellent written and verbal communication',
        'Bilingual (English/Spanish) preferred but not required'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        '15 days PTO',
        'Professional development budget',
        'Flexible schedule',
        'Remote work options'
      ]
    }),
    
    () => ({
      desc: `<p>Join ${companies[index]} as a content marketing specialist. We help B2B companies create content that educates, engages, and converts. Our clients range from tech startups to established manufacturers.</p>
      <p><strong>Your responsibilities:</strong> Write blog posts (1,500-3,000 words), create social media content, develop email campaigns, write case studies, and collaborate with designers on infographics and eBooks.</p>
      <p><strong>Content focus:</strong> You'll write about industry trends, best practices, how-to guides, and thought leadership pieces. Topics vary by client - from software development to manufacturing processes.</p>
      <p><strong>Team collaboration:</strong> You'll work with account managers, designers, and SEO specialists. We have weekly content planning meetings and monthly strategy reviews.</p>`,
      reqs: [
        '3+ years content marketing experience',
        'Exceptional writing and editing skills',
        'Experience with WordPress or similar CMS',
        'Strong SEO knowledge',
        'Portfolio of published work',
        'Ability to write for B2B audiences'
      ],
      benefits: [
        '$45,000-$60,000 annual salary',
        'Health and dental insurance',
        '20 days PTO',
        '$1,500/year learning budget',
        '401(k) with company match',
        'Flexible work arrangements'
      ]
    }),
    
    () => ({
      desc: `<p>${companies[index]} needs a social media coordinator to manage our clients' social media presence. We work with restaurants, retail stores, fitness centers, and professional services.</p>
      <p><strong>Daily tasks:</strong> Create and schedule posts for Instagram, Facebook, LinkedIn, and Twitter. Take photos, create graphics in Canva, write captions, engage with followers, respond to messages, and track performance.</p>
      <p><strong>Creative freedom:</strong> Each client has a unique brand voice. You'll adapt your content style to match - from fun and casual to professional and informative.</p>
      <p><strong>Results matter:</strong> We track metrics like engagement rate, follower growth, website clicks, and lead generation. You'll see the direct impact of your work on client business.</p>`,
      reqs: [
        '1-2 years social media management',
        'Strong visual design skills',
        'Experience with Instagram, Facebook, LinkedIn',
        'Basic video editing (iMovie, CapCut, etc.)',
        'Creative writing ability',
        'Organized and able to manage multiple accounts'
      ],
      benefits: [
        '$35,000-$45,000 starting salary',
        'Health insurance',
        '15 days PTO',
        'Flexible hours',
        '$500/year for courses',
        'Work from home 2-3 days/week'
      ]
    }),
    
    () => ({
      desc: `<p>We're ${companies[index]}, a performance marketing agency helping e-commerce and SaaS companies scale through paid advertising. Our clients are fast-growing companies looking to accelerate their growth.</p>
      <p><strong>Your role:</strong> Manage paid ad campaigns across Google Ads, Facebook Ads, LinkedIn Ads, and TikTok Ads. Optimize campaigns for ROAS, analyze performance data, A/B test ad creative, and scale winning campaigns.</p>
      <p><strong>Tech stack:</strong> Google Ads, Facebook Ads Manager, LinkedIn Campaign Manager, TikTok Ads, Google Analytics, Shopify Analytics, and various attribution tools.</p>
      <p><strong>Career growth:</strong> Start managing $10K/month in ad spend, grow to $100K+/month, and eventually lead a team of specialists. We provide training, mentorship, and clear career paths.</p>`,
      reqs: [
        '3+ years paid advertising experience',
        'Proven track record with Google Ads and Facebook Ads',
        'Strong data analysis skills',
        'Experience with e-commerce or SaaS',
        'Understanding of conversion optimization',
        'Results-driven and detail-oriented'
      ],
      benefits: [
        '$55,000-$75,000 salary',
        'Performance bonuses (10-20% of salary)',
        'Health, dental, vision insurance',
        'Unlimited PTO',
        '$3,000/year professional development',
        'Stock options for top performers'
      ]
    }),
    
    () => ({
      desc: `<p>${companies[index]} is hiring a marketing coordinator to support our team and clients. This is a great role for someone early in their marketing career who wants to learn and grow.</p>
      <p><strong>What you'll do:</strong> Assist with campaign execution, create social media content, write email campaigns, update websites, create reports, coordinate with clients, and support the team with various marketing tasks.</p>
      <p><strong>Learning opportunities:</strong> You'll work on real client projects, learn from experienced marketers, get training on marketing tools, and develop skills across all areas of digital marketing.</p>
      <p><strong>Team support:</strong> We're a collaborative team that helps each other succeed. You'll have a mentor, regular feedback sessions, and opportunities to take on more responsibility as you grow.</p>`,
      reqs: [
        '1 year marketing experience or relevant degree',
        'Strong organizational skills',
        'Good writing abilities',
        'Basic design skills (Canva)',
        'Willingness to learn',
        'Positive attitude and team player'
      ],
      benefits: [
        '$30,000-$40,000 salary',
        'Health insurance',
        '10 days PTO',
        'Training and mentorship',
        'Flexible schedule',
        'Clear career development path'
      ]
    })
  ]
  
  return scenarios[index % scenarios.length]()
}

async function createJobs() {
  console.log('🚀 Creating 100 unique jobs in the Americas...\n')
  
  const jobs = []
  const verifiedCount = Math.floor(100 * 0.15) // ~15% verified
  
  for (let i = 0; i < 100; i++) {
    const companyIndex = i % companies.length
    const locationIndex = i % locations.length
    const titleIndex = i % jobTitles.length
    
    const { desc, reqs, benefits } = generateUniqueJob(i)
    
    const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
    
    // Mix of remote/hybrid/on-site (more remote for Americas)
    const workModelDistribution = ['remote', 'remote', 'remote', 'hybrid', 'hybrid', 'hybrid', 'on-site', 'on-site']
    const finalWorkModel = workModelDistribution[Math.floor(Math.random() * workModelDistribution.length)]
    
    // Salary ranges in USD (or local equivalent)
    const salaryRanges = [
      { min: 30000, max: 45000 },
      { min: 35000, max: 50000 },
      { min: 40000, max: 60000 },
      { min: 50000, max: 70000 },
      { min: 55000, max: 80000 }
    ]
    const salaryRange = salaryRanges[Math.floor(Math.random() * salaryRanges.length)]
    
    const isVerified = i < verifiedCount
    
    const job = {
      title: jobTitles[titleIndex],
      company: companies[companyIndex],
      location: locations[locationIndex],
      type: workType,
      work_model: finalWorkModel,
      salary_min: salaryRange.min,
      salary_max: salaryRange.max,
      description: desc,
      requirements: reqs,
      benefits: benefits,
      is_verified: isVerified,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }
    
    jobs.push(job)
  }
  
  // Insert in batches of 20
  for (let i = 0; i < jobs.length; i += 20) {
    const batch = jobs.slice(i, i + 20)
    const { data, error } = await supabase.from('jobs').insert(batch)
    
    if (error) {
      console.error(`❌ Error inserting batch ${i / 20 + 1}:`, error)
    } else {
      console.log(`✅ Inserted batch ${i / 20 + 1} (${batch.length} jobs)`)
    }
  }
  
  console.log(`\n✅ Successfully created ${jobs.length} jobs in the Americas!`)
  console.log(`   Verified: ${verifiedCount} (${(verifiedCount / jobs.length * 100).toFixed(1)}%)`)
  console.log(`   Remote: ${jobs.filter(j => j.work_model === 'remote').length}`)
  console.log(`   Hybrid: ${jobs.filter(j => j.work_model === 'hybrid').length}`)
  console.log(`   On-site: ${jobs.filter(j => j.work_model === 'on-site').length}`)
}

createJobs().catch(console.error)

