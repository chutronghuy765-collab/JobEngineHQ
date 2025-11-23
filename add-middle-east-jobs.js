const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Companies from Middle East countries
const companies = [
  // UAE
  'Dubai Digital Marketing', 'Abu Dhabi Media Group', 'Sharjah Creative Agency', 'Dubai Branding Co',
  'UAE Marketing Solutions', 'Dubai Social Media', 'Abu Dhabi Digital', 'Dubai Marketing Hub',
  'Emirates Marketing', 'Dubai Creative Agency', 'Abu Dhabi Branding', 'Dubai Media Solutions',
  
  // Saudi Arabia
  'Riyadh Marketing Co', 'Jeddah Digital Agency', 'Dammam Creative', 'Riyadh Branding',
  'Saudi Marketing Pro', 'Jeddah Media Group', 'Riyadh Digital Solutions', 'Saudi Creative Agency',
  'Riyadh Marketing Hub', 'Jeddah Branding Co', 'Saudi Digital Marketing', 'Riyadh Media Agency',
  
  // Israel
  'Tel Aviv Marketing', 'Jerusalem Digital', 'Haifa Creative', 'Tel Aviv Branding',
  'Israel Marketing Co', 'Tel Aviv Media Group', 'Jerusalem Marketing', 'Haifa Digital Agency',
  'Israel Digital Solutions', 'Tel Aviv Creative', 'Jerusalem Branding', 'Haifa Marketing',
  
  // Turkey
  'Istanbul Marketing', 'Ankara Digital', 'Izmir Creative', 'Istanbul Branding',
  'Turkey Marketing Co', 'Istanbul Media Group', 'Ankara Digital Agency', 'Izmir Marketing',
  'Turkey Digital Solutions', 'Istanbul Creative', 'Ankara Branding', 'Izmir Media Agency',
  
  // Egypt
  'Cairo Marketing Co', 'Alexandria Digital', 'Giza Creative', 'Cairo Branding',
  'Egypt Marketing Pro', 'Cairo Digital Agency', 'Alexandria Marketing', 'Giza Media Group',
  'Egypt Digital Solutions', 'Cairo Creative', 'Alexandria Branding', 'Giza Marketing',
  
  // Jordan
  'Amman Marketing', 'Jordan Digital Agency', 'Amman Creative', 'Jordan Branding',
  'Amman Media Group', 'Jordan Marketing Co', 'Amman Digital Solutions', 'Jordan Creative Agency',
  
  // Lebanon
  'Beirut Marketing', 'Lebanon Digital', 'Beirut Creative', 'Lebanon Branding',
  'Beirut Media Group', 'Lebanon Marketing Co', 'Beirut Digital Agency', 'Lebanon Creative',
  
  // Qatar
  'Doha Marketing Co', 'Qatar Digital Agency', 'Doha Creative', 'Qatar Branding',
  'Doha Media Group', 'Qatar Marketing Pro', 'Doha Digital Solutions', 'Qatar Creative Agency',
  
  // Kuwait
  'Kuwait City Marketing', 'Kuwait Digital', 'Kuwait Creative', 'Kuwait Branding',
  'Kuwait Media Group', 'Kuwait Marketing Co', 'Kuwait Digital Agency', 'Kuwait Creative Agency',
  
  // Bahrain
  'Manama Marketing', 'Bahrain Digital', 'Manama Creative', 'Bahrain Branding',
  'Manama Media Group', 'Bahrain Marketing Co', 'Manama Digital Agency', 'Bahrain Creative',
  
  // Oman
  'Muscat Marketing', 'Oman Digital', 'Muscat Creative', 'Oman Branding',
  'Muscat Media Group', 'Oman Marketing Co', 'Muscat Digital Agency', 'Oman Creative Agency',
  
  // Iran
  'Tehran Marketing', 'Iran Digital', 'Tehran Creative', 'Iran Branding',
  'Tehran Media Group', 'Iran Marketing Co', 'Tehran Digital Agency', 'Iran Creative',
  
  // Iraq
  'Baghdad Marketing', 'Iraq Digital', 'Baghdad Creative', 'Iraq Branding',
  'Baghdad Media Group', 'Iraq Marketing Co', 'Baghdad Digital Agency', 'Iraq Creative Agency'
]

const jobTitles = [
  'Digital Marketing Manager', 'Social Media Manager', 'Content Marketing Specialist',
  'SEO Specialist', 'PPC Specialist', 'Email Marketing Manager', 'Marketing Coordinator',
  'Digital Marketing Executive', 'Content Creator', 'Social Media Coordinator',
  'Marketing Communications Manager', 'Brand Manager', 'Marketing Analyst',
  'Digital Marketing Consultant', 'Marketing Assistant', 'Growth Marketing Manager',
  'Content Strategist', 'Social Media Strategist', 'Digital Marketing Specialist',
  'Marketing Operations Manager', 'Digital Campaign Manager', 'E-commerce Marketing Manager'
]

// Middle East locations
const locations = [
  // UAE
  'Dubai, UAE', 'Abu Dhabi, UAE', 'Sharjah, UAE', 'Ajman, UAE',
  'Ras Al Khaimah, UAE', 'Fujairah, UAE', 'Umm Al Quwain, UAE',
  
  // Saudi Arabia
  'Riyadh, Saudi Arabia', 'Jeddah, Saudi Arabia', 'Dammam, Saudi Arabia', 'Mecca, Saudi Arabia',
  'Medina, Saudi Arabia', 'Tabuk, Saudi Arabia', 'Abha, Saudi Arabia', 'Khobar, Saudi Arabia',
  
  // Israel
  'Tel Aviv, Israel', 'Jerusalem, Israel', 'Haifa, Israel', 'Beersheba, Israel',
  'Netanya, Israel', 'Ashdod, Israel', 'Rishon LeZion, Israel', 'Petah Tikva, Israel',
  
  // Turkey
  'Istanbul, Turkey', 'Ankara, Turkey', 'Izmir, Turkey', 'Bursa, Turkey',
  'Antalya, Turkey', 'Adana, Turkey', 'Gaziantep, Turkey', 'Konya, Turkey',
  
  // Egypt
  'Cairo, Egypt', 'Alexandria, Egypt', 'Giza, Egypt', 'Shubra El Kheima, Egypt',
  'Port Said, Egypt', 'Suez, Egypt', 'Luxor, Egypt', 'Aswan, Egypt',
  
  // Jordan
  'Amman, Jordan', 'Zarqa, Jordan', 'Irbid, Jordan', 'Aqaba, Jordan',
  'Madaba, Jordan', 'Karak, Jordan', 'Mafraq, Jordan', 'Salt, Jordan',
  
  // Lebanon
  'Beirut, Lebanon', 'Tripoli, Lebanon', 'Sidon, Lebanon', 'Tyre, Lebanon',
  'Byblos, Lebanon', 'Zahle, Lebanon', 'Baalbek, Lebanon', 'Jounieh, Lebanon',
  
  // Qatar
  'Doha, Qatar', 'Al Rayyan, Qatar', 'Al Wakrah, Qatar', 'Al Khor, Qatar',
  'Dukhan, Qatar', 'Mesaieed, Qatar', 'Lusail, Qatar', 'Al Shamal, Qatar',
  
  // Kuwait
  'Kuwait City, Kuwait', 'Al Ahmadi, Kuwait', 'Hawalli, Kuwait', 'Farwaniya, Kuwait',
  'Jahra, Kuwait', 'Mubarak Al-Kabeer, Kuwait', 'Al Asimah, Kuwait',
  
  // Bahrain
  'Manama, Bahrain', 'Riffa, Bahrain', 'Muharraq, Bahrain', 'Hamad Town, Bahrain',
  'Isa Town, Bahrain', 'Sitra, Bahrain', 'Budaiya, Bahrain', 'Jidhafs, Bahrain',
  
  // Oman
  'Muscat, Oman', 'Salalah, Oman', 'Sohar, Oman', 'Nizwa, Oman',
  'Sur, Oman', 'Barka, Oman', 'Rustaq, Oman', 'Ibri, Oman',
  
  // Iran
  'Tehran, Iran', 'Mashhad, Iran', 'Isfahan, Iran', 'Karaj, Iran',
  'Shiraz, Iran', 'Tabriz, Iran', 'Qom, Iran', 'Ahvaz, Iran',
  
  // Iraq
  'Baghdad, Iraq', 'Basra, Iraq', 'Mosul, Iraq', 'Erbil, Iraq',
  'Najaf, Iraq', 'Karbala, Iraq', 'Sulaymaniyah, Iraq', 'Kirkuk, Iraq'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'hybrid', 'remote'] // Mix for Middle East

// Unique job descriptions for Middle East market
function generateMiddleEastJob(index) {
  const scenarios = [
    // Scenario 1: E-commerce marketing
    () => ({
      desc: `<p>${companies[index]} specializes in e-commerce marketing for Middle Eastern brands. We help online retailers grow their sales through digital marketing strategies tailored to regional markets.</p>
      <p><strong>Campaign management:</strong> Manage paid advertising campaigns on Google, Facebook, Instagram, and TikTok. You'll work with Arabic and English content, understanding cultural nuances and local consumer behavior.</p>
      <p><strong>Regional expertise:</strong> Understanding of Middle Eastern e-commerce landscape, payment methods (cash on delivery, local payment gateways), and shipping logistics is important.</p>
      <p><strong>Multi-language:</strong> Many campaigns require Arabic and English content. You'll work with translators and ensure messaging resonates with local audiences.</p>`,
      reqs: [
        '3+ years e-commerce marketing experience',
        'Understanding of Middle Eastern markets',
        'Experience with paid advertising platforms',
        'Arabic language skills preferred',
        'Understanding of local payment methods',
        'Strong analytical skills'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Annual flight allowance',
        '30 days annual leave',
        'Professional development',
        'Hybrid work model'
      ]
    }),
    
    // Scenario 2: Social media management
    () => ({
      desc: `<p>We manage social media for luxury brands, restaurants, and hospitality businesses across the Middle East. ${companies[index]} helps brands build engaged communities and drive foot traffic.</p>
      <p><strong>Content creation:</strong> Create visually stunning content for Instagram, TikTok, and Snapchat. You'll work with photographers, videographers, and influencers to create compelling brand stories.</p>
      <p><strong>Community management:</strong> Respond to comments and DMs in Arabic and English. You'll need to understand cultural context and maintain brand voice across languages.</p>
      <p><strong>Influencer partnerships:</strong> Work with Middle Eastern influencers and content creators. Build relationships and manage partnerships that drive brand awareness.</p>`,
      reqs: [
        '2+ years social media management',
        'Experience with luxury/hospitality brands',
        'Arabic and English language skills',
        'Understanding of Middle Eastern culture',
        'Content creation skills',
        'Portfolio of social media work'
      ],
      benefits: [
        'Hybrid work',
        'Competitive salary',
        'Health insurance',
        'Annual leave',
        'Brand partnerships',
        'Creative environment'
      ]
    }),
    
    // Scenario 3: B2B marketing
    () => ({
      desc: `<p>${companies[index]} helps B2B companies in technology, finance, and professional services grow in the Middle East. We develop marketing strategies that resonate with regional business audiences.</p>
      <p><strong>Content marketing:</strong> Create thought leadership content, case studies, and whitepapers. You'll write in English and work with translators for Arabic versions.</p>
      <p><strong>Event marketing:</strong> Plan and execute participation in regional trade shows, conferences, and networking events. Build relationships with potential clients.</p>
      <p><strong>Lead generation:</strong> Develop campaigns that generate qualified leads. Understand the B2B sales cycle in Middle Eastern markets.</p>`,
      reqs: [
        'B2B marketing experience',
        'Understanding of regional business culture',
        'Strong English communication',
        'Arabic language preferred',
        'Experience with marketing automation',
        'Event marketing experience'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Professional development',
        'Conference attendance',
        'Hybrid work',
        'Annual bonus'
      ]
    }),
    
    // Scenario 4: Real estate marketing
    () => ({
      desc: `<p>We help real estate developers and agencies market luxury properties across the Middle East. ${companies[index]} creates campaigns that attract high-net-worth buyers and investors.</p>
      <p><strong>Property marketing:</strong> Create marketing materials for luxury developments, villas, and commercial properties. Work with photographers and videographers to showcase properties.</p>
      <p><strong>Digital campaigns:</strong> Run targeted campaigns on Google, Facebook, and LinkedIn to reach potential buyers. Understand the luxury real estate market in the region.</p>
      <p><strong>Client relations:</strong> Work directly with developers and agents. Understand their properties and create marketing that highlights unique selling points.</p>`,
      reqs: [
        'Real estate marketing experience',
        'Understanding of luxury market',
        'Strong visual sense',
        'Experience with property marketing',
        'Arabic and English skills preferred',
        'Portfolio of real estate campaigns'
      ],
      benefits: [
        'Competitive salary + commission',
        'Health insurance',
        'Car allowance',
        'Flexible schedule',
        'Luxury industry exposure',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 5: Tourism marketing
    () => ({
      desc: `<p>${companies[index]} markets hotels, resorts, and tourism destinations across the Middle East. We help properties attract international and regional travelers.</p>
      <p><strong>Destination marketing:</strong> Create campaigns that showcase destinations, hotels, and experiences. Work with travel influencers and content creators.</p>
      <p><strong>Multi-market approach:</strong> Target travelers from Europe, Asia, and regional markets. Understand different travel preferences and booking behaviors.</p>
      <p><strong>Content creation:</strong> Create stunning visual content - photos, videos, virtual tours. Showcase properties and experiences that inspire bookings.</p>`,
      reqs: [
        'Tourism/hospitality marketing experience',
        'Understanding of travel industry',
        'Content creation skills',
        'Experience with booking platforms',
        'Multi-language skills preferred',
        'Portfolio of tourism campaigns'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Travel opportunities',
        'Hotel stays',
        'Flexible work',
        'Annual bonus'
      ]
    }),
    
    // Scenario 6: Fashion/luxury marketing
    () => ({
      desc: `<p>We work with fashion brands, luxury retailers, and jewelry companies in the Middle East. ${companies[index]} helps brands connect with affluent consumers.</p>
      <p><strong>Brand campaigns:</strong> Develop seasonal campaigns, product launches, and brand awareness initiatives. Work with fashion photographers and stylists.</p>
      <p><strong>Influencer partnerships:</strong> Partner with fashion influencers, celebrities, and content creators. Manage relationships and track campaign performance.</p>
      <p><strong>Luxury positioning:</strong> Understand luxury brand positioning and messaging. Create content that resonates with high-end consumers.</p>`,
      reqs: [
        'Fashion/luxury marketing experience',
        'Understanding of luxury market',
        'Strong visual sense',
        'Influencer marketing experience',
        'Arabic and English skills',
        'Portfolio of luxury campaigns'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Brand partnerships',
        'Product samples',
        'Fashion events',
        'Creative environment'
      ]
    }),
    
    // Scenario 7: Fintech marketing
    () => ({
      desc: `<p>${companies[index]} helps fintech companies launch and grow in Middle Eastern markets. We develop marketing strategies for payment apps, digital banks, and financial services.</p>
      <p><strong>Product marketing:</strong> Create campaigns that explain fintech products to consumers. Make complex financial services accessible and appealing.</p>
      <p><strong>Regulatory awareness:</strong> Understand financial regulations in different Middle Eastern countries. Ensure marketing complies with local requirements.</p>
      <p><strong>User acquisition:</strong> Develop strategies to acquire users for fintech apps. Test different channels and optimize for cost per acquisition.</p>`,
      reqs: [
        'Fintech marketing experience',
        'Understanding of financial services',
        'Experience with app marketing',
        'Regulatory awareness',
        'Strong analytical skills',
        'Arabic language preferred'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Stock options',
        'Professional development',
        'Hybrid work',
        'Annual bonus'
      ]
    }),
    
    // Scenario 8: Healthcare marketing
    () => ({
      desc: `<p>We help hospitals, clinics, and healthcare providers market their services across the Middle East. ${companies[index]} creates campaigns that build trust and attract patients.</p>
      <p><strong>Healthcare content:</strong> Create educational content about treatments, procedures, and wellness. Ensure accuracy and compliance with healthcare regulations.</p>
      <p><strong>Patient acquisition:</strong> Develop campaigns that attract patients for specific specialties. Understand healthcare decision-making in the region.</p>
      <p><strong>Trust building:</strong> Build trust through testimonials, doctor profiles, and facility showcases. Healthcare marketing requires sensitivity and accuracy.</p>`,
      reqs: [
        'Healthcare marketing experience',
        'Understanding of healthcare industry',
        'Regulatory compliance knowledge',
        'Strong communication skills',
        'Arabic and English skills',
        'Portfolio of healthcare campaigns'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Professional development',
        'Hybrid work',
        'Annual leave',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 9: Education marketing
    () => ({
      desc: `<p>${companies[index]} markets schools, universities, and training centers across the Middle East. We help educational institutions attract students and build their reputation.</p>
      <p><strong>Student recruitment:</strong> Develop campaigns targeting students and parents. Create content that showcases academic programs, facilities, and outcomes.</p>
      <p><strong>Content marketing:</strong> Create blog posts, videos, and social content that positions institutions as thought leaders. Share success stories and achievements.</p>
      <p><strong>Event marketing:</strong> Plan open houses, information sessions, and recruitment events. Coordinate with admissions teams to convert inquiries to enrollments.</p>`,
      reqs: [
        'Education marketing experience',
        'Understanding of education sector',
        'Experience with student recruitment',
        'Strong communication skills',
        'Arabic and English skills',
        'Portfolio of education campaigns'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Professional development',
        'Hybrid work',
        'Annual leave',
        'Performance bonuses'
      ]
    }),
    
    // Scenario 10: Food & beverage marketing
    () => ({
      desc: `<p>We help restaurants, cafes, and food brands grow in Middle Eastern markets. ${companies[index]} creates campaigns that drive foot traffic and build brand loyalty.</p>
      <p><strong>Restaurant marketing:</strong> Create social media content, run promotions, manage online reviews, and drive reservations. Work with restaurant owners to understand their brand.</p>
      <p><strong>Food photography:</strong> Create mouth-watering food photography and videos. Showcase dishes, ambiance, and dining experiences that attract customers.</p>
      <p><strong>Local partnerships:</strong> Partner with food influencers, food bloggers, and delivery platforms. Build relationships that drive awareness and orders.</p>`,
      reqs: [
        'F&B marketing experience',
        'Understanding of restaurant industry',
        'Food photography skills',
        'Social media expertise',
        'Arabic and English skills',
        'Portfolio of F&B campaigns'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Restaurant discounts',
        'Flexible schedule',
        'Creative work',
        'Performance bonuses'
      ]
    })
  ]
  
  const scenarioIndex = index % scenarios.length
  const base = scenarios[scenarioIndex]()
  
  // Add variations
  const variations = [
    (b) => ({ ...b, desc: b.desc.replace('We', companies[index]) }),
    (b) => ({ ...b, desc: '<h3>Middle East Marketing Opportunity</h3>' + b.desc }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Regional focus:</strong> Work with clients across the Middle East and understand diverse markets.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('looking for', 'seeking') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Cultural understanding:</strong> Understanding of Middle Eastern business culture and consumer behavior is essential.</p>' }),
    (b) => ({ ...b, desc: '<p>At ' + companies[index] + ', ' + b.desc.substring(3) }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Language skills:</strong> Arabic language skills are highly valued for this role.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('You\'ll', 'In this role, you\'ll') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Growth opportunity:</strong> Join a growing team in one of the world\'s fastest-growing marketing markets.</p>' }),
    (b) => ({ ...b, desc: '<h3>Join Our Middle East Team</h3>' + b.desc })
  ]
  
  const variation = variations[index % variations.length]
  return variation(base)
}

// Create 100 jobs from Middle East
const jobs = []

for (let i = 0; i < 100; i++) {
  const company = companies[i % companies.length]
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
  // Mix of work models (40% on-site, 40% hybrid, 20% remote)
  const rand = Math.random()
  const workModel = rand < 0.4 ? 'on-site' : (rand < 0.8 ? 'hybrid' : 'remote')
  
  // Salary ranges for Middle East (competitive regional salaries)
  let salaryMin, salaryMax
  if (title.includes('Manager') || title.includes('Specialist')) {
    salaryMin = 40000 + Math.floor(Math.random() * 30000)
    salaryMax = salaryMin + 35000 + Math.floor(Math.random() * 30000)
  } else if (title.includes('Coordinator') || title.includes('Executive')) {
    salaryMin = 25000 + Math.floor(Math.random() * 20000)
    salaryMax = salaryMin + 25000 + Math.floor(Math.random() * 20000)
  } else {
    salaryMin = 20000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 20000 + Math.floor(Math.random() * 15000)
  }
  
  // Only 8-10% verified
  const isVerified = Math.random() < 0.09
  
  const uniqueContent = generateMiddleEastJob(i)
  
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
  console.log('🚀 Adding 100 jobs from Middle East countries...')
  console.log(`   Countries: UAE, Saudi Arabia, Israel, Turkey, Egypt, Jordan, Lebanon, Qatar, Kuwait, Bahrain, Oman, Iran, Iraq`)
  console.log(`   Mix of on-site, hybrid, and remote`)
  console.log(`   Verified: Only ~9%`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i]
    try {
      const verifiedBadge = job.is_verified ? '✓' : ''
      const workBadge = job.work_model === 'remote' ? '🌐' : (job.work_model === 'hybrid' ? '🏢' : '📍')
      console.log(`[${i + 1}/100] ${job.company} - ${job.title} ${job.location} ${workBadge} ${verifiedBadge}`)
      
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
  console.log(`✅ Added: ${successCount} jobs from Middle East`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log(`📊 Total jobs in database: ${successCount + 400} (previous 400 + new ${successCount})`)
  console.log('='.repeat(50))
}

createJobs().catch(console.error)

