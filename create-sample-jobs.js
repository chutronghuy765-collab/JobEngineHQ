const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const sampleJobs = [
  {
    title: 'Senior Digital Marketing Manager',
    company: 'WPP',
    location: 'New York',
    type: 'full-time',
    work_model: 'hybrid',
    is_verified: true,
    salary_min: 120000,
    salary_max: 160000,
    description: `<h3>About the Role</h3>
    <p>We are seeking an experienced Senior Digital Marketing Manager to lead our digital marketing initiatives for major global brands. You will be responsible for developing and executing comprehensive digital marketing strategies that drive brand awareness, engagement, and revenue growth.</p>
    
    <h3>Key Responsibilities</h3>
    <ul>
      <li>Develop and implement integrated digital marketing campaigns across multiple channels</li>
      <li>Manage digital marketing budgets and optimize ROI</li>
      <li>Lead cross-functional teams including creative, media, and analytics</li>
      <li>Analyze campaign performance and provide strategic recommendations</li>
      <li>Build and maintain relationships with key clients and stakeholders</li>
      <li>Stay current with digital marketing trends and emerging technologies</li>
    </ul>
    
    <h3>What We're Looking For</h3>
    <p>We need a strategic thinker with a proven track record in digital marketing, strong leadership skills, and the ability to work in a fast-paced agency environment.</p>`,
    requirements: [
      'Bachelor\'s degree in Marketing, Business, or related field',
      '7+ years of experience in digital marketing, preferably in an agency setting',
      'Proven experience managing large-scale digital campaigns',
      'Strong knowledge of SEO, SEM, social media, email marketing, and content marketing',
      'Experience with marketing automation platforms (HubSpot, Marketo, etc.)',
      'Excellent analytical skills and proficiency in Google Analytics',
      'Strong project management and team leadership skills',
      'Outstanding communication and presentation skills'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Comprehensive health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work arrangements (hybrid model)',
      'Professional development opportunities',
      'Generous paid time off and holidays',
      'Modern office space in Manhattan',
      'Access to industry events and conferences'
    ]
  },
  {
    title: 'Digital Marketing Strategist',
    company: 'Dentsu',
    location: 'London',
    type: 'full-time',
    work_model: 'remote',
    is_verified: true,
    salary_min: 80000,
    salary_max: 100000,
    description: `<h3>Position Overview</h3>
    <p>Dentsu is looking for a talented Digital Marketing Strategist to join our growing team. You will work with some of the world's most recognized brands to create innovative digital marketing solutions that drive business results.</p>
    
    <h3>Your Role</h3>
    <ul>
      <li>Develop data-driven digital marketing strategies for clients</li>
      <li>Conduct market research and competitive analysis</li>
      <li>Create comprehensive marketing plans and roadmaps</li>
      <li>Collaborate with creative and media teams to execute campaigns</li>
      <li>Monitor and report on campaign performance metrics</li>
      <li>Present strategies and results to clients and internal stakeholders</li>
    </ul>
    
    <h3>Why Dentsu?</h3>
    <p>Join a global network of creative agencies where innovation meets execution. We offer a collaborative environment, competitive benefits, and opportunities to work on award-winning campaigns.</p>`,
    requirements: [
      '5+ years of experience in digital marketing strategy',
      'Strong understanding of digital marketing channels and platforms',
      'Experience with data analysis and marketing analytics tools',
      'Excellent strategic thinking and problem-solving abilities',
      'Strong client-facing and presentation skills',
      'Ability to work independently and as part of a team',
      'Bachelor\'s degree in Marketing, Communications, or related field',
      'Experience in agency environment preferred'
    ],
    benefits: [
      'Remote work flexibility',
      'Competitive salary package',
      'Private health insurance',
      'Pension contribution scheme',
      '25 days annual leave plus bank holidays',
      'Learning and development budget',
      'Wellness programs',
      'Employee assistance program'
    ]
  },
  {
    title: 'Social Media Manager',
    company: 'Publicis Groupe',
    location: 'Paris',
    type: 'full-time',
    work_model: 'hybrid',
    is_verified: true,
    salary_min: 55000,
    salary_max: 75000,
    description: `<h3>Join Our Team</h3>
    <p>Publicis Groupe is seeking a creative and strategic Social Media Manager to lead social media initiatives for our premium client portfolio. You'll be responsible for developing engaging content, managing communities, and driving brand awareness across social platforms.</p>
    
    <h3>What You'll Do</h3>
    <ul>
      <li>Develop and execute social media strategies across multiple platforms</li>
      <li>Create and curate engaging content (copy, images, videos)</li>
      <li>Manage social media communities and respond to audience engagement</li>
      <li>Monitor social media trends and identify opportunities</li>
      <li>Collaborate with influencers and brand ambassadors</li>
      <li>Analyze social media metrics and optimize performance</li>
      <li>Work closely with creative and account teams</li>
    </ul>
    
    <h3>Your Impact</h3>
    <p>You'll play a key role in building brand presence and engagement for some of the world's most iconic brands, working in a creative and dynamic environment.</p>`,
    requirements: [
      '4+ years of experience in social media management',
      'Strong portfolio demonstrating successful social media campaigns',
      'Expert knowledge of major social media platforms (Instagram, Facebook, Twitter, LinkedIn, TikTok)',
      'Experience with social media management tools (Hootsuite, Sprout Social, etc.)',
      'Excellent copywriting and content creation skills',
      'Strong understanding of social media analytics',
      'Creative thinking and ability to generate innovative ideas',
      'Fluent in English and French preferred'
    ],
    benefits: [
      'Hybrid work model (3 days office, 2 days remote)',
      'Competitive salary with performance bonuses',
      'Comprehensive health insurance',
      'Transportation allowance',
      'Lunch vouchers',
      'Professional development programs',
      'Creative and inspiring work environment',
      'Team building activities'
    ]
  },
  {
    title: 'SEO Specialist',
    company: 'Ogilvy',
    location: 'Singapore',
    type: 'full-time',
    work_model: 'on-site',
    is_verified: true,
    salary_min: 60000,
    salary_max: 85000,
    description: `<h3>Role Description</h3>
    <p>Ogilvy Singapore is looking for an experienced SEO Specialist to optimize our clients' online presence and drive organic traffic growth. You will work with a diverse portfolio of brands across various industries.</p>
    
    <h3>Key Responsibilities</h3>
    <ul>
      <li>Conduct comprehensive SEO audits and keyword research</li>
      <li>Develop and implement on-page and off-page SEO strategies</li>
      <li>Optimize website content, structure, and technical elements</li>
      <li>Build high-quality backlinks and manage link building campaigns</li>
      <li>Monitor and analyze SEO performance using various tools</li>
      <li>Create SEO reports and provide strategic recommendations</li>
      <li>Stay updated with search engine algorithm changes</li>
      <li>Collaborate with content and development teams</li>
    </ul>
    
    <h3>Why Ogilvy?</h3>
    <p>Join one of the world's most creative agencies and work on award-winning campaigns while developing your SEO expertise in a supportive environment.</p>`,
    requirements: [
      '3+ years of hands-on SEO experience',
      'Strong knowledge of SEO best practices and algorithms',
      'Experience with SEO tools (Ahrefs, SEMrush, Moz, Google Search Console)',
      'Understanding of technical SEO and website architecture',
      'Experience with content optimization and link building',
      'Analytical mindset with strong data interpretation skills',
      'Excellent communication and reporting skills',
      'Bachelor\'s degree in Marketing, Communications, or related field'
    ],
    benefits: [
      'Competitive salary package',
      'Medical and dental insurance',
      'Annual leave and public holidays',
      'Professional development opportunities',
      'Modern office in central Singapore',
      'Team lunches and social events',
      'Flexible working hours',
      'Performance-based bonuses'
    ]
  },
  {
    title: 'Content Marketing Manager',
    company: 'Accenture Interactive',
    location: 'San Francisco',
    type: 'full-time',
    work_model: 'hybrid',
    is_verified: true,
    salary_min: 95000,
    salary_max: 125000,
    description: `<h3>About the Position</h3>
    <p>Accenture Interactive is seeking a Content Marketing Manager to lead content strategy and creation for our enterprise clients. You'll work with Fortune 500 companies to develop compelling content that drives engagement and conversions.</p>
    
    <h3>What You'll Be Doing</h3>
    <ul>
      <li>Develop comprehensive content marketing strategies</li>
      <li>Create and manage content calendars</li>
      <li>Write and edit high-quality content (blog posts, whitepapers, case studies, etc.)</li>
      <li>Manage content production workflows and editorial processes</li>
      <li>Optimize content for SEO and conversion</li>
      <li>Measure and analyze content performance</li>
      <li>Collaborate with designers, developers, and other team members</li>
      <li>Stay current with content marketing trends and best practices</li>
    </ul>
    
    <h3>Your Impact</h3>
    <p>You'll be responsible for creating content that helps our clients connect with their audiences and achieve their business objectives, working with some of the most innovative brands in the world.</p>`,
    requirements: [
      '6+ years of experience in content marketing',
      'Exceptional writing and editing skills',
      'Strong portfolio of published content',
      'Experience with content management systems (WordPress, Drupal, etc.)',
      'Understanding of SEO and content optimization',
      'Experience with content analytics and measurement',
      'Strong project management skills',
      'Bachelor\'s degree in Journalism, Marketing, Communications, or related field'
    ],
    benefits: [
      'Hybrid work model',
      'Competitive salary and bonus structure',
      'Comprehensive health benefits',
      '401(k) with generous matching',
      'Flexible PTO policy',
      'Professional development budget',
      'Wellness programs and gym membership',
      'Commuter benefits'
    ]
  },
  {
    title: 'PPC Campaign Manager',
    company: 'GroupM',
    location: 'Sydney',
    type: 'full-time',
    work_model: 'remote',
    is_verified: true,
    salary_min: 70000,
    salary_max: 95000,
    description: `<h3>Position Summary</h3>
    <p>GroupM is looking for a skilled PPC Campaign Manager to manage paid search and display advertising campaigns for our diverse client base. You'll optimize campaigns to maximize ROI and drive business growth.</p>
    
    <h3>Your Responsibilities</h3>
    <ul>
      <li>Plan, execute, and optimize PPC campaigns across Google Ads, Microsoft Ads, and other platforms</li>
      <li>Conduct keyword research and develop bidding strategies</li>
      <li>Create and test ad copy and landing pages</li>
      <li>Monitor campaign performance and adjust budgets and bids</li>
      <li>Analyze data and provide insights and recommendations</li>
      <li>Manage campaign budgets and ensure efficient spend</li>
      <li>Prepare regular performance reports for clients</li>
      <li>Stay updated with PPC platform updates and best practices</li>
    </ul>
    
    <h3>Why GroupM?</h3>
    <p>Join the world's leading media investment company and work with cutting-edge tools and technologies while managing campaigns for top-tier brands.</p>`,
    requirements: [
      '4+ years of experience managing PPC campaigns',
      'Google Ads and Microsoft Ads certified preferred',
      'Strong analytical skills and data-driven mindset',
      'Experience with Google Analytics and conversion tracking',
      'Knowledge of A/B testing and optimization techniques',
      'Excellent attention to detail',
      'Strong communication and reporting skills',
      'Bachelor\'s degree in Marketing, Business, or related field'
    ],
    benefits: [
      'Fully remote work option',
      'Competitive salary package',
      'Health and wellness benefits',
      'Superannuation contributions',
      'Flexible working arrangements',
      'Professional development opportunities',
      'Annual performance bonuses',
      'Work-life balance initiatives'
    ]
  },
  {
    title: 'Email Marketing Specialist',
    company: 'VMLY&R',
    location: 'Chicago',
    type: 'full-time',
    work_model: 'hybrid',
    is_verified: true,
    salary_min: 55000,
    salary_max: 75000,
    description: `<h3>Join Our Team</h3>
    <p>VMLY&R is seeking an Email Marketing Specialist to design, execute, and optimize email marketing campaigns that drive engagement and conversions for our clients.</p>
    
    <h3>What You'll Do</h3>
    <ul>
      <li>Design and develop email marketing campaigns</li>
      <li>Create engaging email content and templates</li>
      <li>Segment email lists and manage subscriber databases</li>
      <li>Set up automated email workflows and drip campaigns</li>
      <li>Test and optimize email campaigns (A/B testing)</li>
      <li>Monitor email deliverability and performance metrics</li>
      <li>Ensure compliance with email marketing regulations (CAN-SPAM, GDPR)</li>
      <li>Collaborate with creative and marketing teams</li>
    </ul>
    
    <h3>Your Opportunity</h3>
    <p>Work with innovative brands and cutting-edge email marketing platforms while developing your expertise in one of the most effective marketing channels.</p>`,
    requirements: [
      '3+ years of experience in email marketing',
      'Experience with email marketing platforms (Mailchimp, HubSpot, Marketo, etc.)',
      'Strong HTML and CSS skills for email template development',
      'Understanding of email deliverability best practices',
      'Experience with email automation and segmentation',
      'Analytical skills and experience with email analytics',
      'Attention to detail and quality assurance',
      'Bachelor\'s degree in Marketing or related field'
    ],
    benefits: [
      'Hybrid work schedule',
      'Competitive compensation',
      'Health, dental, and vision insurance',
      '401(k) retirement plan',
      'Paid time off and holidays',
      'Professional development support',
      'Creative and collaborative work environment',
      'Employee wellness programs'
    ]
  },
  {
    title: 'Marketing Analytics Manager',
    company: 'IBM iX',
    location: 'Toronto',
    type: 'full-time',
    work_model: 'on-site',
    is_verified: true,
    salary_min: 100000,
    salary_max: 130000,
    description: `<h3>Role Overview</h3>
    <p>IBM iX is looking for a Marketing Analytics Manager to lead data-driven marketing insights and optimization for our enterprise clients. You'll transform data into actionable strategies that drive business results.</p>
    
    <h3>Key Responsibilities</h3>
    <ul>
      <li>Develop and implement marketing analytics frameworks</li>
      <li>Analyze marketing performance across all channels</li>
      <li>Create dashboards and reports for stakeholders</li>
      <li>Conduct advanced data analysis and modeling</li>
      <li>Identify trends, opportunities, and optimization areas</li>
      <li>Provide strategic recommendations based on data insights</li>
      <li>Manage analytics tools and platforms</li>
      <li>Train and mentor team members on analytics best practices</li>
    </ul>
    
    <h3>Why IBM iX?</h3>
    <p>Join a global leader in digital transformation and work with cutting-edge analytics tools and technologies while solving complex business challenges for world-class clients.</p>`,
    requirements: [
      '7+ years of experience in marketing analytics',
      'Strong proficiency in Google Analytics, Adobe Analytics, and other analytics platforms',
      'Advanced Excel and SQL skills',
      'Experience with data visualization tools (Tableau, Power BI, etc.)',
      'Knowledge of statistical analysis and modeling',
      'Strong business acumen and strategic thinking',
      'Excellent communication and presentation skills',
      'Bachelor\'s or Master\'s degree in Analytics, Statistics, Business, or related field'
    ],
    benefits: [
      'Competitive salary and bonus structure',
      'Comprehensive benefits package',
      'RRSP matching program',
      'Professional development opportunities',
      'Modern office in downtown Toronto',
      'Flexible work arrangements',
      'Health and wellness programs',
      'Employee stock purchase plan'
    ]
  },
  {
    title: 'Influencer Marketing Coordinator',
    company: 'Weber Shandwick',
    location: 'Los Angeles',
    type: 'full-time',
    work_model: 'hybrid',
    is_verified: true,
    salary_min: 50000,
    salary_max: 65000,
    description: `<h3>About the Role</h3>
    <p>Weber Shandwick is seeking an Influencer Marketing Coordinator to support influencer marketing campaigns for our entertainment and lifestyle clients. You'll work with creators, influencers, and celebrities to amplify brand messages.</p>
    
    <h3>What You'll Do</h3>
    <ul>
      <li>Research and identify relevant influencers and content creators</li>
      <li>Reach out to influencers and negotiate partnerships</li>
      <li>Manage influencer relationships and communications</li>
      <li>Coordinate campaign logistics and deliverables</li>
      <li>Monitor influencer content and ensure brand compliance</li>
      <li>Track and report on campaign performance and ROI</li>
      <li>Maintain influencer databases and contact lists</li>
      <li>Support senior team members on larger campaigns</li>
    </ul>
    
    <h3>Your Opportunity</h3>
    <p>Work in the heart of the entertainment industry, collaborate with top influencers and brands, and build your career in one of the fastest-growing areas of marketing.</p>`,
    requirements: [
      '2+ years of experience in influencer marketing or social media',
      'Strong knowledge of social media platforms and influencer landscape',
      'Excellent communication and relationship-building skills',
      'Experience with influencer marketing tools and platforms',
      'Understanding of influencer marketing metrics and KPIs',
      'Creative thinking and problem-solving abilities',
      'Ability to work in a fast-paced environment',
      'Bachelor\'s degree in Marketing, Communications, or related field'
    ],
    benefits: [
      'Hybrid work model (3 days in office)',
      'Competitive entry-level salary',
      'Health and dental insurance',
      'Paid time off and holidays',
      'Professional development opportunities',
      'Networking events and industry connections',
      'Creative and dynamic work environment',
      'Opportunity to work with A-list brands'
    ]
  },
  {
    title: 'Digital Marketing Director',
    company: 'Havas Group',
    location: 'Dubai',
    type: 'full-time',
    work_model: 'on-site',
    is_verified: true,
    salary_min: 140000,
    salary_max: 180000,
    description: `<h3>Executive Position</h3>
    <p>Havas Group is seeking an experienced Digital Marketing Director to lead our digital marketing practice in the Middle East. You'll be responsible for developing digital strategies, managing teams, and driving growth for our agency and clients.</p>
    
    <h3>Your Leadership Role</h3>
    <ul>
      <li>Develop and execute comprehensive digital marketing strategies</li>
      <li>Lead and mentor a team of digital marketing professionals</li>
      <li>Manage client relationships and serve as strategic advisor</li>
      <li>Oversee digital marketing budgets and resource allocation</li>
      <li>Drive new business development and pitch presentations</li>
      <li>Stay ahead of digital marketing trends and technologies</li>
      <li>Ensure delivery of exceptional results for clients</li>
      <li>Collaborate with other agency departments and global teams</li>
    </ul>
    
    <h3>Why Havas?</h3>
    <p>Lead digital marketing for one of the world's largest communications groups in one of the most dynamic markets. You'll work with premium brands and have the opportunity to shape the future of digital marketing in the region.</p>`,
    requirements: [
      '10+ years of experience in digital marketing',
      '5+ years in a leadership or management role',
      'Proven track record of driving business growth',
      'Strong strategic thinking and business acumen',
      'Excellent leadership and team management skills',
      'Experience managing large budgets and teams',
      'Outstanding client relationship and presentation skills',
      'Bachelor\'s or Master\'s degree in Marketing, Business, or related field'
    ],
    benefits: [
      'Executive-level compensation package',
      'Comprehensive health and life insurance',
      'Annual performance bonuses',
      'Relocation assistance (if applicable)',
      'Professional development and training',
      'Premium office location in Dubai',
      '30 days annual leave',
      'Expatriate benefits package'
    ]
  }
]

async function createJobs() {
  console.log('🚀 Creating sample jobs...')
  console.log(`   Total jobs: ${sampleJobs.length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < sampleJobs.length; i++) {
    const job = sampleJobs[i]
    try {
      console.log(`[${i + 1}/${sampleJobs.length}] Creating: ${job.title} at ${job.company}...`)
      
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          ...job,
          employer_id: null, // Guest posting
          is_active: true
        })
        .select()

      if (error) {
        console.error(`   ❌ Error: ${error.message}`)
        errorCount++
      } else {
        console.log(`   ✅ Success! Job ID: ${data[0].id}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}`)
      errorCount++
    }
    
    console.log('')
  }

  console.log('='.repeat(50))
  console.log(`✅ Successfully created: ${successCount} jobs`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log('='.repeat(50))
}

// Run the script
createJobs().catch(console.error)

