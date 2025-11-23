const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// European companies - small to medium businesses
const companies = [
  'Berlin Marketing Studio', 'Munich Digital Works', 'Hamburg Creative Lab', 'Frankfurt Media Co',
  'Paris Brand Agency', 'Lyon Digital Solutions', 'Marseille Marketing Hub', 'Toulouse Creative',
  'London Social Media Co', 'Manchester Digital Agency', 'Birmingham Marketing', 'Leeds Brand Studio',
  'Madrid Content Agency', 'Barcelona Digital Marketing', 'Valencia Creative Works', 'Seville Media',
  'Milan Branding Studio', 'Rome Digital Agency', 'Turin Marketing Co', 'Naples Creative Lab',
  'Amsterdam Marketing Pro', 'Rotterdam Digital Hub', 'The Hague Creative', 'Utrecht Media',
  'Brussels Brand Agency', 'Antwerp Digital Works', 'Ghent Marketing Studio', 'Bruges Creative',
  'Warsaw Digital Solutions', 'Krakow Marketing Agency', 'Wroclaw Brand Studio', 'Poznan Creative',
  'Stockholm Marketing Co', 'Gothenburg Digital', 'Malmö Creative Agency', 'Uppsala Media',
  'Copenhagen Brand Studio', 'Aarhus Digital Works', 'Odense Marketing', 'Aalborg Creative',
  'Vienna Marketing Agency', 'Graz Digital Solutions', 'Linz Creative Co', 'Salzburg Media',
  'Zurich Brand Studio', 'Geneva Digital Agency', 'Basel Marketing', 'Bern Creative Works',
  'Dublin Marketing Co', 'Cork Digital Solutions', 'Galway Creative Agency', 'Limerick Media',
  'Lisbon Brand Studio', 'Porto Digital Works', 'Coimbra Marketing', 'Braga Creative',
  'Athens Marketing Agency', 'Thessaloniki Digital', 'Patras Creative Co', 'Heraklion Media',
  'Helsinki Brand Studio', 'Tampere Digital Agency', 'Turku Marketing', 'Oulu Creative',
  'Oslo Marketing Co', 'Bergen Digital Solutions', 'Trondheim Creative', 'Stavanger Media',
  'Prague Brand Studio', 'Brno Digital Works', 'Ostrava Marketing', 'Plzen Creative',
  'Budapest Marketing Agency', 'Debrecen Digital', 'Szeged Creative Co', 'Pécs Media',
  'Bucharest Brand Studio', 'Cluj-Napoca Digital Agency', 'Timisoara Marketing', 'Iasi Creative',
  'Sofia Marketing Co', 'Plovdiv Digital Solutions', 'Varna Creative', 'Burgas Media',
  'Zagreb Brand Studio', 'Split Digital Works', 'Rijeka Marketing', 'Osijek Creative',
  'Ljubljana Marketing Agency', 'Maribor Digital', 'Celje Creative Co', 'Kranj Media',
  'Tallinn Brand Studio', 'Tartu Digital Agency', 'Narva Marketing', 'Parnu Creative',
  'Riga Marketing Co', 'Daugavpils Digital Solutions', 'Liepaja Creative', 'Jelgava Media',
  'Vilnius Brand Studio', 'Kaunas Digital Works', 'Klaipeda Marketing', 'Siauliai Creative'
]

const jobTitles = [
  'Digital Marketing Specialist', 'Social Media Coordinator', 'Content Marketing Manager',
  'SEO Specialist', 'PPC Account Manager', 'Email Marketing Coordinator',
  'Marketing Assistant', 'Brand Manager', 'Community Manager',
  'Content Creator', 'Social Media Manager', 'Digital Marketing Coordinator',
  'Marketing Communications Specialist', 'Growth Marketing Manager', 'Marketing Operations Specialist',
  'Digital Content Strategist', 'Social Media Content Creator', 'Marketing Analyst',
  'Brand Marketing Coordinator', 'Digital Advertising Specialist', 'Content Marketing Writer',
  'Social Media Analyst', 'Marketing Research Specialist', 'Digital Marketing Intern',
  'Content Strategist', 'Social Media Specialist', 'Marketing Coordinator',
  'SEO Content Writer', 'PPC Specialist', 'Email Marketing Specialist'
]

// European locations with proper country names
const locations = [
  // Germany
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Frankfurt, Germany',
  'Cologne, Germany', 'Stuttgart, Germany', 'Düsseldorf, Germany', 'Dresden, Germany',
  // France
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France',
  'Nice, France', 'Nantes, France', 'Strasbourg, France', 'Bordeaux, France',
  // UK
  'London, United Kingdom', 'Manchester, United Kingdom', 'Birmingham, United Kingdom', 'Leeds, United Kingdom',
  'Glasgow, United Kingdom', 'Edinburgh, United Kingdom', 'Liverpool, United Kingdom', 'Bristol, United Kingdom',
  // Spain
  'Madrid, Spain', 'Barcelona, Spain', 'Valencia, Spain', 'Seville, Spain',
  'Bilbao, Spain', 'Málaga, Spain', 'Zaragoza, Spain', 'Murcia, Spain',
  // Italy
  'Milan, Italy', 'Rome, Italy', 'Turin, Italy', 'Naples, Italy',
  'Florence, Italy', 'Bologna, Italy', 'Venice, Italy', 'Genoa, Italy',
  // Netherlands
  'Amsterdam, Netherlands', 'Rotterdam, Netherlands', 'The Hague, Netherlands', 'Utrecht, Netherlands',
  // Belgium
  'Brussels, Belgium', 'Antwerp, Belgium', 'Ghent, Belgium', 'Bruges, Belgium',
  // Poland
  'Warsaw, Poland', 'Krakow, Poland', 'Wroclaw, Poland', 'Poznan, Poland',
  // Sweden
  'Stockholm, Sweden', 'Gothenburg, Sweden', 'Malmö, Sweden', 'Uppsala, Sweden',
  // Denmark
  'Copenhagen, Denmark', 'Aarhus, Denmark', 'Odense, Denmark', 'Aalborg, Denmark',
  // Austria
  'Vienna, Austria', 'Graz, Austria', 'Linz, Austria', 'Salzburg, Austria',
  // Switzerland
  'Zurich, Switzerland', 'Geneva, Switzerland', 'Basel, Switzerland', 'Bern, Switzerland',
  // Ireland
  'Dublin, Ireland', 'Cork, Ireland', 'Galway, Ireland', 'Limerick, Ireland',
  // Portugal
  'Lisbon, Portugal', 'Porto, Portugal', 'Coimbra, Portugal', 'Braga, Portugal',
  // Greece
  'Athens, Greece', 'Thessaloniki, Greece', 'Patras, Greece', 'Heraklion, Greece',
  // Finland
  'Helsinki, Finland', 'Tampere, Finland', 'Turku, Finland', 'Oulu, Finland',
  // Norway
  'Oslo, Norway', 'Bergen, Norway', 'Trondheim, Norway', 'Stavanger, Norway',
  // Czech Republic
  'Prague, Czech Republic', 'Brno, Czech Republic', 'Ostrava, Czech Republic', 'Plzen, Czech Republic',
  // Hungary
  'Budapest, Hungary', 'Debrecen, Hungary', 'Szeged, Hungary', 'Pécs, Hungary',
  // Romania
  'Bucharest, Romania', 'Cluj-Napoca, Romania', 'Timisoara, Romania', 'Iasi, Romania'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'remote', 'hybrid']

// Generate unique job descriptions
function generateUniqueJob(index) {
  const scenarios = [
    () => ({
      desc: `<p>${companies[index]} is seeking a talented digital marketing professional to join our growing team. We specialize in helping European SMEs establish their online presence and reach new customers.</p>
      <p><strong>Your role:</strong> You'll manage multiple client accounts, creating and executing digital marketing strategies. This includes social media management, content creation, SEO optimization, and paid advertising campaigns.</p>
      <p><strong>What makes us different:</strong> We're a close-knit team that values creativity and results. You'll work directly with clients, see the impact of your work, and have opportunities to grow professionally.</p>
      <p><strong>Day-to-day:</strong> Morning stand-up with the team, client meetings, content planning, campaign execution, performance analysis, and reporting. We use tools like Hootsuite, Google Analytics, and SEMrush.</p>`,
      reqs: [
        '2+ years digital marketing experience',
        'Proficiency in social media platforms',
        'Experience with Google Ads and Facebook Ads',
        'Strong analytical skills',
        'Excellent communication in English',
        'EU work authorization'
      ],
      benefits: [
        'Competitive salary package',
        '25 days annual leave',
        'Health insurance',
        'Professional development budget',
        'Flexible working hours',
        'Remote work options'
      ]
    }),
    
    () => ({
      desc: `<p>Join ${companies[index]} as we expand our content marketing division. We work with B2B companies across Europe, helping them create compelling content that drives engagement and conversions.</p>
      <p><strong>Responsibilities:</strong> Research industry trends, write blog posts (1,500-2,500 words), create social media content, develop email campaigns, and collaborate with designers on visual content.</p>
      <p><strong>Our culture:</strong> We believe in work-life balance. Core hours are 10am-4pm, and you can work from home 3 days per week. We have monthly team lunches and quarterly team building activities.</p>
      <p><strong>Growth opportunities:</strong> We're growing fast and need people who can take on more responsibility. Within 12 months, you could be leading content strategy for major accounts.</p>`,
      reqs: [
        '3+ years content marketing experience',
        'Exceptional writing skills',
        'Experience with WordPress',
        'Knowledge of SEO best practices',
        'Portfolio of published work',
        'Fluent in English (additional European languages a plus)'
      ],
      benefits: [
        '€35,000-€45,000 annual salary',
        '28 days holiday',
        'Private health insurance',
        '€1,000/year learning budget',
        'Modern office in city center',
        'Free coffee and snacks'
      ]
    }),
    
    () => ({
      desc: `<p>${companies[index]} is looking for a social media specialist to manage our clients' online presence. We work with restaurants, retail stores, and service businesses who need help building their brand on social platforms.</p>
      <p><strong>What you'll do:</strong> Create daily content for Instagram, Facebook, and LinkedIn. This includes photos, graphics, videos, and stories. You'll also engage with followers, respond to messages, and track performance metrics.</p>
      <p><strong>Tools we use:</strong> Canva Pro for design, Later for scheduling, Instagram Creator Studio, Facebook Business Manager, and Google Analytics for insights.</p>
      <p><strong>Why you'll love it:</strong> Creative freedom, direct client interaction, seeing real business results, and a supportive team environment. We celebrate wins together and learn from challenges.</p>`,
      reqs: [
        '1-2 years social media management',
        'Strong visual design sense',
        'Experience with Instagram and Facebook',
        'Basic video editing skills',
        'Creative writing ability',
        'Organized and detail-oriented'
      ],
      benefits: [
        '€28,000-€35,000 starting salary',
        'Flexible schedule',
        'Work from home 2 days/week',
        'Health insurance',
        '€500/year for courses',
        'Team events and outings'
      ]
    }),
    
    () => ({
      desc: `<p>We're ${companies[index]}, a boutique marketing agency specializing in helping tech startups scale their marketing efforts. Our clients are SaaS companies and tech platforms looking to grow their user base.</p>
      <p><strong>Your mission:</strong> Develop and execute growth marketing strategies. This includes running paid ad campaigns, optimizing conversion funnels, A/B testing landing pages, and analyzing user behavior data.</p>
      <p><strong>Tech stack:</strong> Google Ads, Facebook Ads, LinkedIn Ads, HubSpot CRM, Mixpanel for analytics, Hotjar for user insights, and various landing page builders.</p>
      <p><strong>Career path:</strong> Start as a specialist, grow into a senior role managing larger accounts, and eventually lead a team. We invest in our people and promote from within.</p>`,
      reqs: [
        '3+ years performance marketing',
        'Experience with Google Ads and Facebook Ads',
        'Strong data analysis skills',
        'Experience with CRM systems',
        'Understanding of SaaS business models',
        'Results-driven mindset'
      ],
      benefits: [
        '€40,000-€55,000 salary',
        'Performance bonuses',
        '30 days annual leave',
        'Top-tier health insurance',
        '€2,000/year professional development',
        'Stock options available'
      ]
    }),
    
    () => ({
      desc: `<p>${companies[index]} needs a content marketing coordinator to support our team of writers and strategists. This is a great entry-to-mid level role for someone looking to grow their career in content marketing.</p>
      <p><strong>Daily tasks:</strong> Coordinate content calendar, assign articles to writers, edit and proofread content, publish posts in WordPress, create social media snippets, track content performance, and report to clients.</p>
      <p><strong>Learning opportunities:</strong> You'll work closely with senior strategists, learn SEO best practices, understand content strategy, and develop your writing and editing skills.</p>
      <p><strong>Team environment:</strong> We're a collaborative team that supports each other. Weekly content meetings, peer reviews, and regular feedback sessions help everyone improve.</p>`,
      reqs: [
        '1-2 years marketing experience',
        'Strong organizational skills',
        'Good writing and editing abilities',
        'Familiarity with WordPress',
        'Basic SEO knowledge',
        'Attention to detail'
      ],
      benefits: [
        '€25,000-€32,000 salary',
        '24 days holiday',
        'Health insurance',
        'Training and mentorship',
        'Flexible hours',
        'Career development plan'
      ]
    })
  ]
  
  return scenarios[index % scenarios.length]()
}

async function createJobs() {
  console.log('🚀 Creating 100 unique jobs in Europe...\n')
  
  const jobs = []
  const verifiedCount = Math.floor(100 * 0.12) // ~12% verified
  
  for (let i = 0; i < 100; i++) {
    const companyIndex = i % companies.length
    const locationIndex = i % locations.length
    const titleIndex = i % jobTitles.length
    
    const { desc, reqs, benefits } = generateUniqueJob(i)
    
    const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
    const workModel = workModels[Math.floor(Math.random() * workModels.length)]
    
    // Mix of remote/hybrid/on-site (more hybrid and on-site for Europe)
    const workModelDistribution = ['remote', 'remote', 'hybrid', 'hybrid', 'hybrid', 'on-site', 'on-site', 'on-site']
    const finalWorkModel = workModelDistribution[Math.floor(Math.random() * workModelDistribution.length)]
    
    // Salary ranges in EUR
    const salaryRanges = [
      { min: 25000, max: 35000 },
      { min: 30000, max: 45000 },
      { min: 35000, max: 50000 },
      { min: 40000, max: 60000 },
      { min: 45000, max: 65000 }
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
  
  console.log(`\n✅ Successfully created ${jobs.length} jobs in Europe!`)
  console.log(`   Verified: ${verifiedCount} (${(verifiedCount / jobs.length * 100).toFixed(1)}%)`)
  console.log(`   Remote: ${jobs.filter(j => j.work_model === 'remote').length}`)
  console.log(`   Hybrid: ${jobs.filter(j => j.work_model === 'hybrid').length}`)
  console.log(`   On-site: ${jobs.filter(j => j.work_model === 'on-site').length}`)
}

createJobs().catch(console.error)

