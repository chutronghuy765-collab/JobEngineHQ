const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Companies from freelancer-heavy countries
const companies = [
  // India
  'TechVista Solutions', 'DigitalEdge India', 'CreativeMinds Mumbai', 'BrandCraft Delhi',
  'MarketingPro Bangalore', 'WebWise Chennai', 'SocialSphere Hyderabad', 'ContentCraft Pune',
  'DigitalDynamo India', 'GrowthGuru Mumbai', 'BrandBridge Delhi', 'MarketingMasters Bangalore',
  'PixelPerfect India', 'SEOExperts Mumbai', 'ContentKing Delhi', 'SocialSavvy Bangalore',
  
  // Philippines
  'Manila Marketing Co', 'Cebu Digital Agency', 'Makati Media Group', 'Quezon Creative',
  'Philippine Marketing Pro', 'Manila Social Media', 'Cebu Content Studio', 'Makati Branding',
  'Digital Philippines', 'Manila Marketing Hub', 'Cebu Creative Agency', 'Makati Media Solutions',
  
  // Bangladesh
  'Dhaka Digital Solutions', 'Chittagong Marketing', 'Bangladesh Branding Co', 'Digital Dhaka',
  'Marketing Masters BD', 'Creative Bangladesh', 'Dhaka Social Media', 'Chittagong Content',
  
  // Pakistan
  'Karachi Marketing Pro', 'Lahore Digital Agency', 'Islamabad Creative', 'Pakistan Marketing Co',
  'Karachi Social Media', 'Lahore Branding', 'Digital Pakistan', 'Marketing Pro PK',
  
  // Vietnam
  'Ho Chi Minh Marketing', 'Hanoi Digital Agency', 'Vietnam Creative Co', 'Saigon Marketing',
  'Hanoi Social Media', 'Ho Chi Minh Branding', 'Vietnam Marketing Pro', 'Digital Vietnam',
  
  // Indonesia
  'Jakarta Marketing Co', 'Bali Digital Agency', 'Indonesia Creative', 'Jakarta Branding',
  'Digital Indonesia', 'Bali Marketing Pro', 'Jakarta Social Media', 'Indonesia Marketing Hub',
  
  // Thailand
  'Bangkok Marketing Co', 'Thailand Digital Agency', 'Bangkok Creative', 'Thai Marketing Pro',
  'Digital Thailand', 'Bangkok Branding', 'Thailand Social Media', 'Bangkok Marketing Hub',
  
  // Sri Lanka
  'Colombo Marketing Co', 'Sri Lanka Digital', 'Colombo Creative', 'Digital Sri Lanka',
  'Colombo Branding', 'Sri Lanka Marketing Pro', 'Colombo Social Media', 'Digital Colombo',
  
  // Nepal
  'Kathmandu Marketing', 'Nepal Digital Agency', 'Kathmandu Creative', 'Digital Nepal',
  'Nepal Marketing Pro', 'Kathmandu Branding', 'Nepal Social Media', 'Digital Kathmandu',
  
  // Malaysia
  'Kuala Lumpur Marketing', 'Malaysia Digital Agency', 'KL Creative Co', 'Digital Malaysia',
  'Malaysia Marketing Pro', 'KL Branding', 'Malaysia Social Media', 'Digital KL'
]

const jobTitles = [
  'Digital Marketing Specialist', 'Social Media Manager', 'Content Marketing Specialist',
  'SEO Specialist', 'PPC Specialist', 'Email Marketing Specialist', 'Content Writer',
  'Social Media Coordinator', 'Marketing Assistant', 'Digital Marketing Executive',
  'Content Creator', 'Social Media Specialist', 'Marketing Coordinator',
  'SEO Content Writer', 'PPC Account Manager', 'Email Marketing Coordinator',
  'Content Marketing Writer', 'Social Media Content Creator', 'Digital Marketing Associate',
  'Marketing Communications Specialist', 'Growth Marketing Associate', 'Brand Ambassador'
]

// Locations in freelancer-heavy countries
const locations = [
  // India
  'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India', 'Hyderabad, India',
  'Pune, India', 'Kolkata, India', 'Ahmedabad, India', 'Jaipur, India', 'Surat, India',
  
  // Philippines
  'Manila, Philippines', 'Cebu, Philippines', 'Makati, Philippines', 'Quezon City, Philippines',
  'Davao, Philippines', 'Cagayan de Oro, Philippines', 'Bacolod, Philippines', 'Iloilo, Philippines',
  
  // Bangladesh
  'Dhaka, Bangladesh', 'Chittagong, Bangladesh', 'Sylhet, Bangladesh', 'Rajshahi, Bangladesh',
  'Khulna, Bangladesh', 'Barisal, Bangladesh', 'Rangpur, Bangladesh', 'Comilla, Bangladesh',
  
  // Pakistan
  'Karachi, Pakistan', 'Lahore, Pakistan', 'Islamabad, Pakistan', 'Faisalabad, Pakistan',
  'Rawalpindi, Pakistan', 'Multan, Pakistan', 'Gujranwala, Pakistan', 'Peshawar, Pakistan',
  
  // Vietnam
  'Ho Chi Minh City, Vietnam', 'Hanoi, Vietnam', 'Da Nang, Vietnam', 'Hai Phong, Vietnam',
  'Can Tho, Vietnam', 'Hue, Vietnam', 'Nha Trang, Vietnam', 'Vung Tau, Vietnam',
  
  // Indonesia
  'Jakarta, Indonesia', 'Surabaya, Indonesia', 'Bandung, Indonesia', 'Medan, Indonesia',
  'Semarang, Indonesia', 'Makassar, Indonesia', 'Palembang, Indonesia', 'Bali, Indonesia',
  
  // Thailand
  'Bangkok, Thailand', 'Chiang Mai, Thailand', 'Pattaya, Thailand', 'Phuket, Thailand',
  'Nonthaburi, Thailand', 'Hat Yai, Thailand', 'Udon Thani, Thailand', 'Khon Kaen, Thailand',
  
  // Sri Lanka
  'Colombo, Sri Lanka', 'Kandy, Sri Lanka', 'Galle, Sri Lanka', 'Negombo, Sri Lanka',
  'Jaffna, Sri Lanka', 'Anuradhapura, Sri Lanka', 'Ratnapura, Sri Lanka', 'Matara, Sri Lanka',
  
  // Nepal
  'Kathmandu, Nepal', 'Pokhara, Nepal', 'Lalitpur, Nepal', 'Biratnagar, Nepal',
  'Bharatpur, Nepal', 'Birgunj, Nepal', 'Dharan, Nepal', 'Butwal, Nepal',
  
  // Malaysia
  'Kuala Lumpur, Malaysia', 'Penang, Malaysia', 'Johor Bahru, Malaysia', 'Ipoh, Malaysia',
  'Malacca, Malaysia', 'Kuching, Malaysia', 'Kota Kinabalu, Malaysia', 'Shah Alam, Malaysia'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['remote', 'hybrid', 'on-site'] // More remote-friendly

// Unique job descriptions for freelancer markets
function generateFreelancerJob(index) {
  const scenarios = [
    // Scenario 1: Remote-first agency
    () => ({
      desc: `<p>${companies[index]} is a remote-first digital marketing agency looking for talented marketers. We work with clients from around the world, and our team is distributed across multiple countries.</p>
      <p><strong>Remote work:</strong> This is a fully remote position. You'll work from home and collaborate with team members across different time zones. We use Slack, Zoom, and project management tools to stay connected.</p>
      <p><strong>Client work:</strong> You'll manage marketing campaigns for international clients, primarily in English. You'll need to be comfortable communicating with clients from different cultures and time zones.</p>
      <p><strong>Flexible hours:</strong> While we have core hours for team meetings, you have flexibility in when you work. This is perfect for freelancers looking for stable income with flexibility.</p>`,
      reqs: [
        '2+ years digital marketing experience',
        'Fluent English (written and spoken)',
        'Experience working with international clients',
        'Strong communication skills',
        'Reliable internet connection',
        'Self-motivated and organized'
      ],
      benefits: [
        'Fully remote work',
        'Flexible working hours',
        'Competitive salary in local currency',
        'Performance bonuses',
        'Professional development opportunities',
        'International exposure'
      ]
    }),
    
    // Scenario 2: Content writing for global clients
    () => ({
      desc: `<p>We're looking for content writers who can create high-quality English content for our international clients. ${companies[index]} works with businesses in the US, UK, Australia, and other English-speaking countries.</p>
      <p><strong>Content creation:</strong> You'll write blog posts, social media content, email newsletters, and website copy. Topics vary widely - from tech to healthcare to finance. You'll need to research thoroughly and write in clear, engaging English.</p>
      <p><strong>Client communication:</strong> You'll work directly with clients to understand their needs, receive feedback, and revise content. Strong English communication skills are essential.</p>
      <p><strong>Work schedule:</strong> Flexible hours, but you'll need to meet deadlines. Most clients are in Western time zones, so some evening work may be required.</p>`,
      reqs: [
        'Native or near-native English proficiency',
        'Portfolio of published writing samples',
        'Strong research skills',
        'Ability to write in different styles and tones',
        'Experience with SEO writing',
        'Reliable internet and computer'
      ],
      benefits: [
        'Work from home',
        'Flexible schedule',
        'Competitive pay per word/article',
        'Regular clients and steady work',
        'Opportunity to work with international brands',
        'Skill development in content marketing'
      ]
    }),
    
    // Scenario 3: Social media management
    () => ({
      desc: `<p>${companies[index]} manages social media accounts for small and medium businesses in North America and Europe. We're looking for social media specialists who can create engaging content and manage communities.</p>
      <p><strong>Account management:</strong> You'll manage 5-8 client accounts across Instagram, Facebook, LinkedIn, and Twitter. Each client has different needs - some want educational content, others want entertaining posts.</p>
      <p><strong>Content creation:</strong> Create posts, write captions, design graphics (we provide Canva Pro), and schedule content. You'll need to understand each client's brand voice and target audience.</p>
      <p><strong>Community management:</strong> Respond to comments, messages, and engage with followers. You'll need to represent each brand authentically while maintaining professionalism.</p>`,
      reqs: [
        '2+ years social media management experience',
        'Strong English writing skills',
        'Experience with major social platforms',
        'Basic graphic design skills',
        'Understanding of social media analytics',
        'Ability to work across time zones'
      ],
      benefits: [
        'Remote work',
        'Flexible hours',
        'Competitive monthly salary',
        'Performance bonuses',
        'Canva Pro subscription provided',
        'Training and support'
      ]
    }),
    
    // Scenario 4: SEO specialist
    () => ({
      desc: `<p>We help businesses improve their search engine rankings and drive organic traffic. ${companies[index]} works with clients globally, and we need SEO specialists who understand international SEO best practices.</p>
      <p><strong>SEO tasks:</strong> Conduct keyword research, optimize website content, build backlinks, manage technical SEO, and track rankings. You'll work with clients' websites to improve their visibility in search engines.</p>
      <p><strong>Reporting:</strong> Monthly reports showing keyword rankings, traffic growth, and recommendations for improvement. You'll need to explain SEO concepts to clients who may not be technical.</p>
      <p><strong>Tools:</strong> We provide access to SEO tools like Ahrefs, SEMrush, and Google Search Console. You'll learn to use these tools effectively.</p>`,
      reqs: [
        '2+ years SEO experience',
        'Understanding of on-page and off-page SEO',
        'Experience with SEO tools',
        'Strong analytical skills',
        'Good English communication',
        'Portfolio of successful SEO projects'
      ],
      benefits: [
        'Remote work',
        'Flexible schedule',
        'Competitive salary',
        'Access to premium SEO tools',
        'Professional development',
        'Performance-based bonuses'
      ]
    }),
    
    // Scenario 5: PPC management
    () => ({
      desc: `<p>${companies[index]} manages Google Ads and Facebook Ads campaigns for e-commerce and service businesses. We're looking for PPC specialists who can optimize campaigns and improve ROI.</p>
      <p><strong>Campaign management:</strong> Set up new campaigns, write ad copy, create ad groups, manage budgets, and optimize bids. You'll work with multiple clients and need to stay organized.</p>
      <p><strong>Optimization:</strong> Daily monitoring of campaigns, pausing underperformers, scaling winners, testing new creative. You'll need to make data-driven decisions quickly.</p>
      <p><strong>Client communication:</strong> Weekly or bi-weekly calls with clients to review performance and discuss strategy. You'll need to explain complex data in simple terms.</p>`,
      reqs: [
        'Google Ads certification preferred',
        '2+ years PPC management experience',
        'Experience with Facebook Ads',
        'Strong analytical skills',
        'Good English communication',
        'Experience with e-commerce'
      ],
      benefits: [
        'Remote work',
        'Competitive salary + bonuses',
        'Access to ad platforms',
        'Professional development',
        'Flexible hours',
        'Performance-based raises'
      ]
    }),
    
    // Scenario 6: Email marketing
    () => ({
      desc: `<p>We specialize in email marketing for subscription businesses and e-commerce brands. ${companies[index]} helps clients build email lists, create campaigns, and drive sales through email.</p>
      <p><strong>Campaign creation:</strong> Design email templates, write subject lines and copy, set up automation flows, and segment audiences. You'll work with platforms like Mailchimp, Klaviyo, and ConvertKit.</p>
      <p><strong>Automation:</strong> Build welcome series, abandoned cart flows, post-purchase sequences, and re-engagement campaigns. You'll need to think strategically about customer journeys.</p>
      <p><strong>Analysis:</strong> Track open rates, click rates, conversions, and revenue. Use data to optimize campaigns and improve performance over time.</p>`,
      reqs: [
        'Email marketing experience',
        'Experience with email platforms',
        'Basic HTML/CSS knowledge',
        'Strong copywriting skills',
        'Analytical mindset',
        'Good English writing'
      ],
      benefits: [
        'Remote work',
        'Flexible schedule',
        'Competitive salary',
        'Professional development',
        'Access to email tools',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 7: Graphic design + marketing
    () => ({
      desc: `<p>${companies[index]} is looking for a marketing specialist who can also create graphics. You'll handle both the strategy and visual creation for social media and digital campaigns.</p>
      <p><strong>Design work:</strong> Create social media graphics, infographics, ad creatives, and email templates. You'll use tools like Canva, Photoshop, or Figma. We provide access to design tools and stock photos.</p>
      <p><strong>Marketing strategy:</strong> Develop content calendars, plan campaigns, and ensure all visuals align with brand guidelines and marketing goals.</p>
      <p><strong>Versatility:</strong> You'll work on multiple projects simultaneously, switching between design and marketing tasks. This role is perfect for someone who enjoys both creative and strategic work.</p>`,
      reqs: [
        'Graphic design skills',
        'Marketing experience',
        'Proficiency in design tools',
        'Strong English communication',
        'Portfolio of design work',
        'Understanding of marketing principles'
      ],
      benefits: [
        'Remote work',
        'Design software provided',
        'Competitive salary',
        'Creative freedom',
        'Professional development',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 8: Video editing + marketing
    () => ({
      desc: `<p>We create video content for social media and YouTube. ${companies[index]} is looking for someone who can edit videos and understand video marketing strategy.</p>
      <p><strong>Video editing:</strong> Edit videos for Instagram, TikTok, YouTube, and Facebook. You'll work with raw footage, add graphics, music, captions, and create engaging final products.</p>
      <p><strong>Content strategy:</strong> Understand what makes videos perform well on each platform. Create thumbnails, write titles and descriptions, and optimize for each platform's algorithm.</p>
      <p><strong>Tools:</strong> We use Premiere Pro, After Effects, and other video editing software. You'll need your own computer capable of video editing, but we can help with software licenses.</p>`,
      reqs: [
        'Video editing experience',
        'Proficiency in editing software',
        'Understanding of video marketing',
        'Portfolio of video work',
        'Strong English communication',
        'Reliable computer for editing'
      ],
      benefits: [
        'Remote work',
        'Flexible schedule',
        'Competitive pay per project',
        'Software licenses provided',
        'Creative projects',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 9: Data entry + marketing
    () => ({
      desc: `<p>${companies[index]} needs a marketing assistant who can handle data entry, research, and basic marketing tasks. This is a great entry-level position for someone looking to start in digital marketing.</p>
      <p><strong>Data tasks:</strong> Enter data into spreadsheets, update client databases, organize files, and maintain records. You'll need to be detail-oriented and accurate.</p>
      <p><strong>Research:</strong> Research competitors, keywords, trends, and potential clients. Compile findings into reports that help the team make decisions.</p>
      <p><strong>Marketing support:</strong> Assist with social media scheduling, email list management, and basic content creation. You'll learn marketing skills while supporting the team.</p>`,
      reqs: [
        'Basic computer skills',
        'Proficiency in Excel/Google Sheets',
        'Good English writing',
        'Attention to detail',
        'Willingness to learn',
        'Reliable internet connection'
      ],
      benefits: [
        'Remote work',
        'Flexible hours',
        'Entry-level friendly',
        'Training provided',
        'Opportunity to learn marketing',
        'Competitive starting salary'
      ]
    }),
    
    // Scenario 10: Multi-channel marketing
    () => ({
      desc: `<p>${companies[index]} is looking for a versatile marketer who can work across multiple channels - social media, email, content, and paid ads. You'll manage integrated campaigns for clients.</p>
      <p><strong>Campaign management:</strong> Develop multi-channel marketing strategies, coordinate efforts across platforms, and ensure consistent messaging. You'll need to see the big picture while managing details.</p>
      <p><strong>Channel expertise:</strong> While you don't need to be an expert in everything, you should have experience with at least 3-4 marketing channels and be willing to learn others.</p>
      <p><strong>Client management:</strong> Work directly with clients to understand their goals, develop strategies, execute campaigns, and report results. Strong communication is essential.</p>`,
      reqs: [
        '3+ years marketing experience',
        'Experience with multiple channels',
        'Strong strategic thinking',
        'Excellent English communication',
        'Project management skills',
        'Portfolio of integrated campaigns'
      ],
      benefits: [
        'Remote work',
        'Competitive salary',
        'Performance bonuses',
        'Professional development',
        'Flexible schedule',
        'International clients'
      ]
    })
  ]
  
  const scenarioIndex = index % scenarios.length
  const base = scenarios[scenarioIndex]()
  
  // Add variations
  const variations = [
    (b) => ({ ...b, desc: b.desc.replace('We', companies[index]) }),
    (b) => ({ ...b, desc: '<h3>Remote Marketing Opportunity</h3>' + b.desc }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>International team:</strong> Work with team members and clients from around the world.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('looking for', 'seeking') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Growth opportunity:</strong> This role offers opportunities for advancement as you gain experience.</p>' }),
    (b) => ({ ...b, desc: '<p>Join ' + companies[index] + '. ' + b.desc.substring(3) }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Flexible work:</strong> Perfect for freelancers looking for stable income with flexibility.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('You\'ll', 'In this role, you\'ll') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Payment:</strong> Competitive salary paid in USD or local currency via bank transfer or PayPal.</p>' }),
    (b) => ({ ...b, desc: '<h3>Work From Home Opportunity</h3>' + b.desc })
  ]
  
  const variation = variations[index % variations.length]
  return variation(base)
}

// Create 100 jobs from freelancer countries
const jobs = []

for (let i = 0; i < 100; i++) {
  const company = companies[i % companies.length]
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
  // More remote-friendly
  const workModel = Math.random() < 0.7 ? 'remote' : (Math.random() < 0.5 ? 'hybrid' : 'on-site')
  
  // Salary ranges adjusted for these markets (still competitive but realistic)
  let salaryMin, salaryMax
  if (title.includes('Manager') || title.includes('Specialist')) {
    salaryMin = 40000 + Math.floor(Math.random() * 20000)
    salaryMax = salaryMin + 25000 + Math.floor(Math.random() * 20000)
  } else if (title.includes('Coordinator') || title.includes('Associate')) {
    salaryMin = 25000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 20000 + Math.floor(Math.random() * 15000)
  } else {
    salaryMin = 20000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 15000 + Math.floor(Math.random() * 15000)
  }
  
  // Very few verified (only 5%)
  const isVerified = Math.random() < 0.05
  
  const uniqueContent = generateFreelancerJob(i)
  
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
  console.log('🚀 Adding 100 jobs from freelancer-heavy countries...')
  console.log(`   Countries: India, Philippines, Bangladesh, Pakistan, Vietnam, Indonesia, Thailand, Sri Lanka, Nepal, Malaysia`)
  console.log(`   Mostly remote positions (70%+)`)
  console.log(`   Verified: Only ~5%`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    try {
      const verifiedBadge = job.is_verified ? '✓' : ''
      const remoteBadge = job.work_model === 'remote' ? '🌐' : ''
      console.log(`[${i + 1}/100] ${job.company} - ${job.title} ${job.location} ${remoteBadge} ${verifiedBadge}`)
      
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
    
    // Small delay every 10 jobs
    if (i < jobs.length - 1 && (i + 1) % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  console.log('')
  console.log('='.repeat(50))
  console.log(`✅ Added: ${successCount} jobs from freelancer countries`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log(`📊 Total jobs in database: ${successCount + 200} (previous 200 + new ${successCount})`)
  console.log('='.repeat(50))
}

createJobs().catch(console.error)

