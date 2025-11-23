const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Small companies and agencies
const companies = [
  'PixelCraft Digital', 'GrowthHackers Agency', 'SocialSphere Media', 'ContentLab Studio',
  'BrandBoost Marketing', 'DigitalWave Solutions', 'CreativeMinds Agency', 'MarketPulse Inc',
  'InfluencerHub', 'SEO Masters', 'AdVenture Marketing', 'BrandStory Collective',
  'Digital Nomad Agency', 'ContentCrafters', 'SocialSync Media', 'MarketingMix Solutions',
  'BrandBridge Agency', 'DigitalDynamo', 'ContentCatalyst', 'SocialSavvy Marketing',
  'GrowthGenius', 'BrandBuddies', 'MarketingMaven', 'DigitalDreams Agency',
  'ContentCrew', 'SocialSprint', 'BrandBuilder Co', 'MarketingMomentum',
  'DigitalDive', 'ContentCorner', 'SocialSpark', 'BrandBurst',
  'MarketingMagic', 'DigitalDawn', 'ContentCascade', 'SocialStream',
  'BrandBloom', 'MarketingMatrix', 'DigitalDynamics', 'ContentCove',
  'SocialSway', 'BrandBreeze', 'MarketingMosaic', 'DigitalDusk',
  'ContentCreek', 'SocialSurge', 'BrandBeam', 'MarketingMuse',
  'DigitalDiamond', 'ContentCrown', 'SocialSage', 'BrandBlaze',
  'MarketingMist', 'DigitalDune', 'ContentCrest', 'SocialSwell',
  'BrandBolt', 'MarketingMyth', 'DigitalDawn', 'ContentCrystal'
]

const jobTitles = [
  'Digital Marketing Specialist', 'Social Media Coordinator', 'Content Marketing Associate',
  'SEO Content Writer', 'PPC Account Manager', 'Email Marketing Coordinator',
  'Marketing Assistant', 'Brand Ambassador', 'Community Engagement Specialist',
  'Content Creator', 'Social Media Manager', 'Digital Marketing Coordinator',
  'Marketing Communications Specialist', 'Growth Marketing Associate', 'Marketing Operations Coordinator',
  'Digital Content Strategist', 'Social Media Content Creator', 'Marketing Data Entry Specialist',
  'Brand Marketing Coordinator', 'Digital Advertising Specialist', 'Content Marketing Writer',
  'Social Media Analyst', 'Marketing Research Assistant', 'Digital Marketing Intern'
]

const locations = [
  'Austin, TX', 'Portland, OR', 'Nashville, TN', 'Raleigh, NC', 'Charlotte, NC',
  'Indianapolis, IN', 'Columbus, OH', 'Minneapolis, MN', 'Milwaukee, WI', 'Kansas City, MO',
  'Omaha, NE', 'Des Moines, IA', 'Madison, WI', 'Boise, ID', 'Salt Lake City, UT',
  'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA', 'Oakland, CA',
  'Birmingham, AL', 'Memphis, TN', 'Louisville, KY', 'Richmond, VA', 'Norfolk, VA',
  'Buffalo, NY', 'Rochester, NY', 'Pittsburgh, PA', 'Cleveland, OH', 'Cincinnati, OH',
  'Grand Rapids, MI', 'Detroit, MI', 'Tampa, FL', 'Orlando, FL', 'Jacksonville, FL',
  'Miami, FL', 'Fort Lauderdale, FL', 'West Palm Beach, FL', 'Tallahassee, FL', 'Gainesville, FL'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'remote', 'hybrid']

// 100 unique job descriptions - each one different
const uniqueDescriptions = [
  {
    desc: `<p>We're a fast-growing digital agency looking for someone who can hit the ground running. You'll be managing social media accounts for 5-7 local businesses, creating content calendars, and engaging with their audiences daily. This is a hands-on role where you'll see immediate impact.</p>
    <p><strong>Day-to-day:</strong> You'll start each morning reviewing analytics from the previous day, then move into content creation. We use Canva for graphics and have a library of templates, but creativity is key. Afternoons are for community management - responding to comments, DMs, and engaging with followers.</p>
    <p><strong>What makes this role special:</strong> You'll work directly with business owners, see real results, and have the freedom to try new strategies. We're small enough that your ideas matter, but established enough to have great clients.</p>`,
    reqs: ['2+ years managing social media for businesses', 'Experience with Instagram, Facebook, LinkedIn', 'Basic graphic design skills', 'Strong writing ability', 'Comfortable with analytics'],
    benefits: ['Flexible hours', 'Work from home 3 days/week', 'Health insurance after 90 days', '$500/year learning budget', 'Quarterly team outings']
  },
  {
    desc: `<p>Join our content team where you'll write blog posts, social captions, and email newsletters for B2B tech companies. We're not looking for corporate speak - our clients want authentic, helpful content that actually helps their customers.</p>
    <p><strong>Your week:</strong> Monday is planning day - you'll review the content calendar and research topics. Tuesday-Thursday are writing days. Friday is for revisions and scheduling. We publish 2-3 blog posts per week per client, plus daily social content.</p>
    <p><strong>Our style:</strong> Conversational, helpful, no fluff. Think "explain it like I'm smart but busy." You'll interview subject matter experts, turn their knowledge into readable content, and make sure it's optimized for search.</p>`,
    reqs: ['Portfolio of published writing samples', 'Experience writing for B2B audiences', 'Understanding of SEO basics', 'Ability to write in different voices', 'Comfortable interviewing experts'],
    benefits: ['Remote-first', '4-day work week option', 'Unlimited PTO', 'Annual writing conference attendance', 'Book budget']
  },
  {
    desc: `<p>We help e-commerce brands grow through paid advertising. You'll manage Google Ads and Facebook Ads accounts, optimize campaigns daily, and report results to clients weekly. This is a results-driven role - you'll be measured on ROAS (return on ad spend).</p>
    <p><strong>Campaign management:</strong> You'll set up new campaigns, write ad copy, create landing pages, and constantly test new angles. Our clients expect to see data-driven decisions, so you'll need to explain why you're making changes.</p>
    <p><strong>Client communication:</strong> Weekly calls with clients to review performance, discuss new opportunities, and plan upcoming campaigns. You'll need to translate complex data into simple insights.</p>`,
    reqs: ['Google Ads certification preferred', '2+ years managing paid campaigns', 'Experience with e-commerce', 'Strong analytical skills', 'Client-facing experience'],
    benefits: ['Base salary + performance bonus', 'Health/dental/vision', '401k match', 'Remote work', 'Annual conference budget']
  },
  {
    desc: `<p>We're a boutique agency specializing in email marketing for subscription businesses. You'll design email campaigns, write copy, set up automation flows, and analyze what's working. Our clients are SaaS companies, so you'll need to understand their business models.</p>
    <p><strong>Campaign creation:</strong> You'll work with our designer to create beautiful emails, write compelling subject lines, and set up A/B tests. We use Klaviyo and Mailchimp primarily, but you'll learn whatever platform the client uses.</p>
    <p><strong>Automation:</strong> Welcome series, abandoned cart flows, win-back campaigns - you'll build these from scratch and optimize based on performance data.</p>`,
    reqs: ['Experience with email marketing platforms', 'HTML/CSS knowledge helpful', 'Strong copywriting skills', 'Understanding of email deliverability', 'Analytical mindset'],
    benefits: ['Hybrid work (2 days office)', 'Health insurance', 'Flexible PTO', 'Professional development', 'Lunch provided in office']
  },
  {
    desc: `<p>We're looking for someone to help local service businesses (plumbers, electricians, HVAC) get more customers through SEO and Google My Business optimization. This isn't glamorous, but it's effective and you'll see real results.</p>
    <p><strong>SEO work:</strong> You'll optimize their websites, write location-based content, build local citations, and manage their Google Business Profiles. Most of our clients have never heard of SEO, so you'll need to explain it simply.</p>
    <p><strong>Reporting:</strong> Monthly reports showing rankings, website traffic, and leads generated. You'll need to connect the dots between SEO work and actual business results.</p>`,
    reqs: ['1+ years SEO experience', 'Understanding of local SEO', 'Ability to explain technical concepts simply', 'Experience with Google Business Profile', 'Basic WordPress knowledge'],
    benefits: ['Work from home', 'Flexible schedule', 'Health insurance', 'Simple IRA', 'Paid training']
  },
  {
    desc: `<p>We run influencer campaigns for mid-size brands. You'll find influencers, negotiate rates, manage relationships, and track campaign performance. It's part marketing, part talent management, part project coordination.</p>
    <p><strong>Influencer outreach:</strong> You'll use tools like AspireIQ and manually search Instagram/TikTok to find creators who match our clients' audiences. Then you'll pitch them, negotiate deliverables and rates, and manage contracts.</p>
    <p><strong>Campaign management:</strong> Once a campaign launches, you'll check in with influencers, review content before it goes live, track performance, and compile reports. You'll also handle any issues that come up.</p>`,
    reqs: ['Experience with influencer marketing', 'Strong communication skills', 'Comfortable negotiating', 'Organized and detail-oriented', 'Understanding of social media platforms'],
    benefits: ['Remote work', 'Commission on campaigns', 'Health insurance', 'Unlimited PTO', 'Free products from clients']
  },
  {
    desc: `<p>We're a content marketing agency that works exclusively with healthcare companies. You'll write blog posts, create social content, and develop educational materials that help patients understand their conditions and treatment options.</p>
    <p><strong>Content creation:</strong> You'll work with medical professionals to create accurate, accessible content. This requires careful research, fact-checking, and making complex medical information understandable. All content must comply with healthcare marketing regulations.</p>
    <p><strong>Topics you'll cover:</strong> Disease education, treatment options, prevention tips, patient stories, healthcare news. You'll need to stay current with medical research and healthcare trends.</p>`,
    reqs: ['Healthcare writing experience preferred', 'Strong research skills', 'Ability to write for general audiences', 'Understanding of healthcare regulations', 'Medical/science background helpful'],
    benefits: ['Remote work', 'Health insurance', '401k', 'Continuing education budget', 'Flexible hours']
  },
  {
    desc: `<p>We help real estate agents build their personal brands through social media and content marketing. You'll create content that positions agents as local experts, manages their social accounts, and helps them generate leads.</p>
    <p><strong>Content strategy:</strong> Each agent has a unique personality and market. You'll develop content that reflects their brand - some are luxury-focused, others target first-time buyers. You'll create neighborhood guides, market updates, home-buying tips, and behind-the-scenes content.</p>
    <p><strong>Lead generation:</strong> You'll set up Facebook and Instagram ads, create lead magnets, and manage email sequences. The goal is to turn social followers into clients.</p>`,
    reqs: ['Real estate marketing experience', 'Social media management', 'Content creation skills', 'Understanding of real estate industry', 'Lead generation experience'],
    benefits: ['Hybrid work', 'Base + commission', 'Health insurance', 'Car allowance', 'Flexible schedule']
  },
  {
    desc: `<p>We're a performance marketing agency focused on direct-to-consumer brands. You'll manage multi-channel campaigns (Google, Facebook, TikTok, Pinterest) and optimize for ROAS. Our clients are fast-growing startups, so things move quickly.</p>
    <p><strong>Campaign optimization:</strong> Daily monitoring of campaigns, adjusting bids, testing new creative, pausing underperformers. You'll work with our creative team to develop new ad concepts and test them systematically.</p>
    <p><strong>Reporting:</strong> Weekly client calls where you'll present performance data, explain optimizations made, and recommend next steps. You'll need to be comfortable with numbers and explaining your strategy.</p>`,
    reqs: ['3+ years paid media experience', 'Experience with multiple ad platforms', 'Strong analytical skills', 'E-commerce experience', 'Client-facing experience'],
    benefits: ['Competitive salary', 'Performance bonuses', 'Health/dental/vision', '401k match', 'Remote work', 'Unlimited PTO']
  },
  {
    desc: `<p>We create video content for brands - everything from social media videos to YouTube series to explainer videos. You'll concept, script, shoot, and edit videos. We have a small studio, but you'll also shoot on location.</p>
    <p><strong>Video production:</strong> You'll work with clients to understand their goals, develop concepts, write scripts, plan shoots, operate cameras, and edit in Premiere Pro. Some projects are quick social videos, others are longer-form content.</p>
    <p><strong>Client collaboration:</strong> You'll present concepts, get feedback, manage revisions, and deliver final assets. You'll need to balance creative vision with client needs and budget constraints.</p>`,
    reqs: ['Video production experience', 'Proficiency in Premiere Pro', 'Camera operation skills', 'Scriptwriting ability', 'Portfolio of work'],
    benefits: ['Creative environment', 'Equipment provided', 'Health insurance', 'Flexible schedule', 'Project-based bonuses']
  }
]

// Generate 100 more unique descriptions
function generateUniqueDescription(index) {
  const templates = [
    // Template variations for different industries and roles
    (i) => `<p>We're a ${['boutique', 'full-service', 'specialized', 'award-winning'][i % 4]} marketing agency looking for someone who can ${['manage', 'lead', 'develop', 'execute'][i % 4]} our ${['social media', 'content', 'paid advertising', 'email marketing'][i % 4]} efforts.</p>
    <p>You'll be working with ${['local businesses', 'B2B companies', 'e-commerce brands', 'SaaS startups'][i % 4]} to ${['grow their online presence', 'generate leads', 'increase sales', 'build brand awareness'][i % 4]}. This role requires someone who is ${['creative', 'analytical', 'strategic', 'hands-on'][i % 4]} and can ${['think outside the box', 'work with data', 'manage multiple projects', 'work independently'][i % 4]}.</p>
    <p>Our team is ${['small and collaborative', 'growing fast', 'remote-first', 'results-driven'][i % 4]}, and we're looking for someone who ${['fits our culture', 'can grow with us', 'shares our values', 'brings fresh ideas'][i % 4]}.</p>`,
    
    (i) => `<h3>About This Role</h3>
    <p>This position is perfect for someone who ${['loves', 'excels at', 'has experience with', 'wants to specialize in'][i % 4]} ${['digital marketing', 'content creation', 'social media', 'paid advertising'][i % 4]}. You'll be responsible for ${['day-to-day management', 'strategic planning', 'campaign execution', 'performance analysis'][i % 4]} of our marketing initiatives.</p>
    <h3>What You'll Do</h3>
    <ul>
      <li>${['Create and schedule', 'Develop and execute', 'Manage and optimize', 'Plan and implement'][i % 4]} marketing campaigns</li>
      <li>${['Analyze', 'Track', 'Monitor', 'Report on'][i % 4]} campaign performance and ${['optimize', 'improve', 'adjust', 'refine'][i % 4]} based on data</li>
      <li>${['Collaborate', 'Work closely', 'Partner', 'Coordinate'][i % 4]} with ${['clients', 'team members', 'vendors', 'stakeholders'][i % 4]}</li>
      <li>${['Stay current', 'Keep up with', 'Research', 'Learn about'][i % 4]} industry trends and best practices</li>
    </ul>`,
    
    (i) => `<p>We help ${['small businesses', 'startups', 'established companies', 'growing brands'][i % 4]} ${['succeed', 'grow', 'compete', 'thrive'][i % 4]} online. Our approach is ${['data-driven', 'creative', 'strategic', 'hands-on'][i % 4]}, and we're looking for someone who ${['shares', 'understands', 'appreciates', 'embraces'][i % 4]} this philosophy.</p>
    <p><strong>In this role, you'll:</strong> Work on ${['diverse', 'interesting', 'challenging', 'rewarding'][i % 4]} projects, ${['learn', 'grow', 'develop', 'advance'][i % 4]} your skills, and ${['see', 'measure', 'track', 'celebrate'][i % 4]} real results. We ${['value', 'encourage', 'support', 'invest in'][i % 4]} professional development and ${['offer', 'provide', 'give', 'include'][i % 4]} opportunities to ${['learn', 'grow', 'advance', 'succeed'][i % 4]}.</p>
    <p><strong>Ideal candidate:</strong> Someone who is ${['passionate', 'driven', 'creative', 'analytical'][i % 4]} about marketing, has ${['strong', 'excellent', 'proven', 'demonstrated'][i % 4]} ${['communication', 'organizational', 'analytical', 'creative'][i % 4]} skills, and ${['thrives', 'excels', 'works well', 'performs best'][i % 4]} in a ${['fast-paced', 'collaborative', 'creative', 'results-oriented'][i % 4]} environment.</p>`
  ]
  
  const baseDesc = uniqueDescriptions[i % uniqueDescriptions.length]
  const template = templates[Math.floor(i / 10) % templates.length]
  
  return {
    desc: baseDesc.desc + template(i),
    reqs: baseDesc.reqs.map((req, idx) => {
      const variations = [
        req,
        req.replace('Experience', 'Proven experience'),
        req.replace('Experience', 'Hands-on experience'),
        req + ' (preferred but not required)'
      ]
      return variations[idx % variations.length]
    }),
    benefits: baseDesc.benefits.map((ben, idx) => {
      const variations = [
        ben,
        ben + ' (after probation period)',
        ben.replace('Health', 'Comprehensive health'),
        ben + ' and more'
      ]
      return variations[idx % variations.length]
    })
  }
}

// Create 100 unique jobs
const jobs = []

for (let i = 0; i < 100; i++) {
  const company = companies[i % companies.length]
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
  const workModel = workModels[Math.floor(Math.random() * workModels.length)]
  
  // Salary based on title and experience level
  let salaryMin, salaryMax
  if (title.includes('Manager') || title.includes('Specialist')) {
    salaryMin = 50000 + Math.floor(Math.random() * 20000)
    salaryMax = salaryMin + 30000 + Math.floor(Math.random() * 20000)
  } else if (title.includes('Coordinator') || title.includes('Associate')) {
    salaryMin = 35000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 20000 + Math.floor(Math.random() * 15000)
  } else {
    salaryMin = 30000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 15000 + Math.floor(Math.random() * 15000)
  }
  
  const isVerified = Math.random() < 0.25 // 25% verified
  
  const uniqueContent = generateUniqueDescription(i)
  
  jobs.push({
    title: title,
    company: company,
    location: location,
    type: workType,
    work_model: workModel,
    is_verified: isVerified,
    salary_min: salaryMin,
    salary_max: salaryMax,
    description: uniqueContent.desc,
    requirements: uniqueContent.reqs,
    benefits: uniqueContent.benefits
  })
}

async function createJobs() {
  console.log('🚀 Creating 100 unique job postings...')
  console.log(`   Verified: ~${jobs.filter(j => j.is_verified).length} | Non-verified: ~${jobs.filter(j => !j.is_verified).length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    try {
      const verifiedBadge = job.is_verified ? '✓' : ''
      console.log(`[${i + 1}/${jobs.length}] ${job.company} - ${job.title} ${verifiedBadge}`)
      
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          ...job,
          employer_id: null,
          is_active: true
        })
        .select()

      if (error) {
        console.error(`   ❌ ${error.message}`)
        errorCount++
      } else {
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ ${err.message}`)
      errorCount++
    }
    
    // Small delay
    if (i < jobs.length - 1 && i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  console.log('')
  console.log('='.repeat(50))
  console.log(`✅ Created: ${successCount} jobs`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log('='.repeat(50))
}

createJobs().catch(console.error)

