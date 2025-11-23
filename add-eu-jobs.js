const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Companies from EU countries
const companies = [
  // Germany
  'Berlin Digital Marketing', 'Munich Creative Agency', 'Hamburg Media Group', 'Frankfurt Marketing Pro',
  'Cologne Branding Co', 'Stuttgart Digital Solutions', 'Düsseldorf Marketing', 'Dresden Creative',
  'Leipzig Media Agency', 'Bremen Marketing Hub', 'Hannover Digital', 'Nuremberg Creative',
  
  // France
  'Paris Marketing Co', 'Lyon Digital Agency', 'Marseille Creative', 'Toulouse Marketing',
  'Nice Branding Agency', 'Nantes Digital Solutions', 'Strasbourg Marketing', 'Bordeaux Creative',
  'Lille Media Group', 'Rennes Marketing Pro', 'Reims Digital', 'Montpellier Creative',
  
  // UK (pre-Brexit context, but still relevant)
  'London Marketing Agency', 'Manchester Digital', 'Birmingham Creative', 'Leeds Marketing Co',
  'Glasgow Digital Solutions', 'Edinburgh Creative', 'Liverpool Marketing', 'Bristol Branding',
  'Sheffield Digital', 'Newcastle Marketing', 'Cardiff Creative', 'Belfast Digital',
  
  // Italy
  'Milan Marketing Agency', 'Rome Digital Solutions', 'Turin Creative Co', 'Naples Marketing',
  'Florence Branding', 'Bologna Digital', 'Venice Creative', 'Genoa Marketing',
  'Palermo Digital', 'Catania Marketing', 'Verona Creative', 'Bari Digital',
  
  // Spain
  'Madrid Marketing Co', 'Barcelona Digital Agency', 'Valencia Creative', 'Seville Marketing',
  'Bilbao Branding', 'Málaga Digital', 'Murcia Marketing', 'Zaragoza Creative',
  'Las Palmas Digital', 'Granada Marketing', 'Alicante Creative', 'Córdoba Digital',
  
  // Netherlands
  'Amsterdam Marketing', 'Rotterdam Digital', 'The Hague Creative', 'Utrecht Marketing',
  'Eindhoven Digital', 'Groningen Creative', 'Tilburg Marketing', 'Almere Digital',
  
  // Belgium
  'Brussels Marketing Co', 'Antwerp Digital', 'Ghent Creative', 'Bruges Marketing',
  'Liège Digital', 'Charleroi Marketing', 'Leuven Creative', 'Namur Digital',
  
  // Poland
  'Warsaw Marketing', 'Krakow Digital', 'Wroclaw Creative', 'Poznan Marketing',
  'Gdansk Digital', 'Lodz Marketing', 'Katowice Creative', 'Lublin Digital',
  
  // Portugal
  'Lisbon Marketing Co', 'Porto Digital Agency', 'Coimbra Creative', 'Braga Marketing',
  'Faro Digital', 'Aveiro Marketing', 'Setubal Creative', 'Evora Digital',
  
  // Austria
  'Vienna Marketing', 'Graz Digital', 'Linz Creative', 'Salzburg Marketing',
  'Innsbruck Digital', 'Klagenfurt Marketing', 'Villach Creative', 'Wels Digital',
  
  // Sweden
  'Stockholm Marketing', 'Gothenburg Digital', 'Malmö Creative', 'Uppsala Marketing',
  'Linköping Digital', 'Örebro Marketing', 'Västerås Creative', 'Helsingborg Digital',
  
  // Denmark
  'Copenhagen Marketing', 'Aarhus Digital', 'Odense Creative', 'Aalborg Marketing',
  'Esbjerg Digital', 'Randers Marketing', 'Kolding Creative', 'Horsens Digital',
  
  // Finland
  'Helsinki Marketing', 'Espoo Digital', 'Tampere Creative', 'Vantaa Marketing',
  'Oulu Digital', 'Turku Marketing', 'Jyväskylä Creative', 'Lahti Digital',
  
  // Ireland
  'Dublin Marketing Co', 'Cork Digital', 'Limerick Creative', 'Galway Marketing',
  'Waterford Digital', 'Drogheda Marketing', 'Dundalk Creative', 'Swords Digital',
  
  // Czech Republic
  'Prague Marketing', 'Brno Digital', 'Ostrava Creative', 'Plzen Marketing',
  'Liberec Digital', 'Olomouc Marketing', 'Ceske Budejovice Creative', 'Hradec Kralove Digital',
  
  // Romania
  'Bucharest Marketing', 'Cluj-Napoca Digital', 'Timisoara Creative', 'Iasi Marketing',
  'Constanta Digital', 'Craiova Marketing', 'Brasov Creative', 'Galati Digital',
  
  // Greece
  'Athens Marketing', 'Thessaloniki Digital', 'Patras Creative', 'Heraklion Marketing',
  'Larissa Digital', 'Volos Marketing', 'Rhodes Creative', 'Ioannina Digital',
  
  // Hungary
  'Budapest Marketing', 'Debrecen Digital', 'Szeged Creative', 'Miskolc Marketing',
  'Pécs Digital', 'Győr Marketing', 'Nyíregyháza Creative', 'Kecskemét Digital'
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

// EU locations
const locations = [
  // Germany
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Frankfurt, Germany',
  'Cologne, Germany', 'Stuttgart, Germany', 'Düsseldorf, Germany', 'Dresden, Germany',
  
  // France
  'Paris, France', 'Lyon, France', 'Marseille, France', 'Toulouse, France',
  'Nice, France', 'Nantes, France', 'Strasbourg, France', 'Bordeaux, France',
  
  // UK
  'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Leeds, UK',
  'Glasgow, UK', 'Edinburgh, UK', 'Liverpool, UK', 'Bristol, UK',
  
  // Italy
  'Milan, Italy', 'Rome, Italy', 'Turin, Italy', 'Naples, Italy',
  'Florence, Italy', 'Bologna, Italy', 'Venice, Italy', 'Genoa, Italy',
  
  // Spain
  'Madrid, Spain', 'Barcelona, Spain', 'Valencia, Spain', 'Seville, Spain',
  'Bilbao, Spain', 'Málaga, Spain', 'Murcia, Spain', 'Zaragoza, Spain',
  
  // Netherlands
  'Amsterdam, Netherlands', 'Rotterdam, Netherlands', 'The Hague, Netherlands', 'Utrecht, Netherlands',
  'Eindhoven, Netherlands', 'Groningen, Netherlands', 'Tilburg, Netherlands', 'Almere, Netherlands',
  
  // Belgium
  'Brussels, Belgium', 'Antwerp, Belgium', 'Ghent, Belgium', 'Bruges, Belgium',
  'Liège, Belgium', 'Charleroi, Belgium', 'Leuven, Belgium', 'Namur, Belgium',
  
  // Poland
  'Warsaw, Poland', 'Krakow, Poland', 'Wroclaw, Poland', 'Poznan, Poland',
  'Gdansk, Poland', 'Lodz, Poland', 'Katowice, Poland', 'Lublin, Poland',
  
  // Portugal
  'Lisbon, Portugal', 'Porto, Portugal', 'Coimbra, Portugal', 'Braga, Portugal',
  'Faro, Portugal', 'Aveiro, Portugal', 'Setubal, Portugal', 'Evora, Portugal',
  
  // Austria
  'Vienna, Austria', 'Graz, Austria', 'Linz, Austria', 'Salzburg, Austria',
  'Innsbruck, Austria', 'Klagenfurt, Austria', 'Villach, Austria', 'Wels, Austria',
  
  // Sweden
  'Stockholm, Sweden', 'Gothenburg, Sweden', 'Malmö, Sweden', 'Uppsala, Sweden',
  'Linköping, Sweden', 'Örebro, Sweden', 'Västerås, Sweden', 'Helsingborg, Sweden',
  
  // Denmark
  'Copenhagen, Denmark', 'Aarhus, Denmark', 'Odense, Denmark', 'Aalborg, Denmark',
  'Esbjerg, Denmark', 'Randers, Denmark', 'Kolding, Denmark', 'Horsens, Denmark',
  
  // Finland
  'Helsinki, Finland', 'Espoo, Finland', 'Tampere, Finland', 'Vantaa, Finland',
  'Oulu, Finland', 'Turku, Finland', 'Jyväskylä, Finland', 'Lahti, Finland',
  
  // Ireland
  'Dublin, Ireland', 'Cork, Ireland', 'Limerick, Ireland', 'Galway, Ireland',
  'Waterford, Ireland', 'Drogheda, Ireland', 'Dundalk, Ireland', 'Swords, Ireland',
  
  // Czech Republic
  'Prague, Czech Republic', 'Brno, Czech Republic', 'Ostrava, Czech Republic', 'Plzen, Czech Republic',
  'Liberec, Czech Republic', 'Olomouc, Czech Republic', 'Ceske Budejovice, Czech Republic', 'Hradec Kralove, Czech Republic',
  
  // Romania
  'Bucharest, Romania', 'Cluj-Napoca, Romania', 'Timisoara, Romania', 'Iasi, Romania',
  'Constanta, Romania', 'Craiova, Romania', 'Brasov, Romania', 'Galati, Romania',
  
  // Greece
  'Athens, Greece', 'Thessaloniki, Greece', 'Patras, Greece', 'Heraklion, Greece',
  'Larissa, Greece', 'Volos, Greece', 'Rhodes, Greece', 'Ioannina, Greece',
  
  // Hungary
  'Budapest, Hungary', 'Debrecen, Hungary', 'Szeged, Hungary', 'Miskolc, Hungary',
  'Pécs, Hungary', 'Győr, Hungary', 'Nyíregyháza, Hungary', 'Kecskemét, Hungary'
]

const workTypes = ['full-time', 'part-time', 'contract', 'internship']
const workModels = ['on-site', 'hybrid', 'remote'] // More hybrid/on-site for EU

// Unique job descriptions for EU market
function generateEUJob(index) {
  const scenarios = [
    // Scenario 1: B2B marketing agency
    () => ({
      desc: `<p>${companies[index]} is a leading B2B marketing agency serving clients across Europe. We specialize in helping technology companies and professional services firms grow through digital marketing.</p>
      <p><strong>Client work:</strong> You'll manage marketing campaigns for B2B clients, primarily in tech, finance, and consulting. You'll work with European companies looking to expand their reach.</p>
      <p><strong>Team collaboration:</strong> Our team is distributed across Europe, so you'll collaborate with colleagues in different countries. We value diverse perspectives and international experience.</p>
      <p><strong>Professional development:</strong> We invest in our team's growth through training, conferences, and certifications. You'll have opportunities to attend industry events across Europe.</p>`,
      reqs: [
        '3+ years B2B marketing experience',
        'Experience with European markets',
        'Strong English communication (additional EU languages a plus)',
        'Understanding of GDPR and EU regulations',
        'Experience with marketing automation platforms',
        'Analytical mindset'
      ],
      benefits: [
        'Competitive EU salary',
        'Health insurance',
        '25+ days annual leave',
        'Professional development budget',
        'Hybrid work model',
        'Pension contribution'
      ]
    }),
    
    // Scenario 2: E-commerce marketing
    () => ({
      desc: `<p>We help European e-commerce brands grow their online sales through performance marketing. ${companies[index]} works with fashion, beauty, home goods, and lifestyle brands across the EU.</p>
      <p><strong>Campaign management:</strong> Manage paid advertising campaigns across Google, Facebook, Instagram, and TikTok. You'll optimize for ROAS and work with budgets ranging from €5k to €50k per month.</p>
      <p><strong>Multi-market approach:</strong> Many of our clients sell across multiple EU countries. You'll need to understand different markets, languages, and consumer behaviors.</p>
      <p><strong>Data-driven:</strong> We're data-obsessed. You'll analyze performance daily, run A/B tests, and make decisions based on metrics. Experience with analytics tools is essential.</p>`,
      reqs: [
        '2+ years e-commerce marketing experience',
        'Experience with paid advertising platforms',
        'Understanding of European e-commerce landscape',
        'Strong analytical skills',
        'Experience with Shopify, WooCommerce, or similar',
        'English fluency (other EU languages preferred)'
      ],
      benefits: [
        'Competitive salary',
        'Performance bonuses',
        'Health insurance',
        'Flexible working hours',
        'Remote work options',
        'Annual team retreat'
      ]
    }),
    
    // Scenario 3: Content marketing
    () => ({
      desc: `<p>${companies[index]} creates content for European brands looking to build thought leadership and engage audiences. We work with SaaS companies, professional services, and B2B brands.</p>
      <p><strong>Content creation:</strong> Write blog posts, whitepapers, case studies, and social content. You'll interview subject matter experts, research topics, and create content that resonates with European audiences.</p>
      <p><strong>SEO focus:</strong> All content is optimized for search. You'll conduct keyword research, optimize for multiple languages, and track rankings across European markets.</p>
      <p><strong>Content strategy:</strong> Develop content calendars, plan editorial themes, and ensure content aligns with business goals. You'll work closely with clients to understand their objectives.</p>`,
      reqs: [
        'Content marketing experience',
        'Strong writing skills in English',
        'Understanding of SEO',
        'Experience with content management systems',
        'Portfolio of published work',
        'Additional EU languages a plus'
      ],
      benefits: [
        'Hybrid work model',
        'Competitive salary',
        'Health insurance',
        '25 days annual leave',
        'Content creation budget',
        'Professional development'
      ]
    }),
    
    // Scenario 4: Social media management
    () => ({
      desc: `<p>We manage social media for European brands across Instagram, LinkedIn, Twitter, and TikTok. ${companies[index]} helps companies build engaged communities and drive brand awareness.</p>
      <p><strong>Account management:</strong> Manage 6-8 client accounts, creating content, scheduling posts, and engaging with audiences. Each client has different goals - some want brand awareness, others want lead generation.</p>
      <p><strong>Content creation:</strong> Create visual content, write captions, and develop campaigns. You'll work with designers and sometimes create graphics yourself using Canva or similar tools.</p>
      <p><strong>Community management:</strong> Respond to comments, messages, and engage with followers. You'll need to represent each brand authentically while maintaining professionalism.</p>`,
      reqs: [
        '2+ years social media management',
        'Experience with major platforms',
        'Content creation skills',
        'Understanding of social media analytics',
        'Strong English communication',
        'Additional EU languages preferred'
      ],
      benefits: [
        'Hybrid work',
        'Competitive salary',
        'Health insurance',
        'Flexible PTO',
        'Social media tools provided',
        'Creative freedom'
      ]
    }),
    
    // Scenario 5: Marketing automation
    () => ({
      desc: `<p>${companies[index]} specializes in marketing automation for B2B companies. We help clients set up and optimize HubSpot, Marketo, and Pardot to nurture leads and drive revenue.</p>
      <p><strong>Automation setup:</strong> Build email sequences, lead nurturing flows, and scoring models. You'll work with sales teams to align marketing and sales processes.</p>
      <p><strong>Platform expertise:</strong> Become an expert in marketing automation platforms. You'll configure systems, train users, and optimize performance based on data.</p>
      <p><strong>Integration work:</strong> Connect marketing automation with CRM systems, websites, and other tools. You'll need technical skills and attention to detail.</p>`,
      reqs: [
        'Marketing automation experience',
        'HubSpot or Marketo certification preferred',
        'Understanding of lead nurturing',
        'Technical aptitude',
        'Experience with CRM systems',
        'Strong English communication'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Certification support',
        'Hybrid work',
        'Professional development',
        '25+ days annual leave'
      ]
    }),
    
    // Scenario 6: Brand marketing
    () => ({
      desc: `<p>We help European brands build strong brand identities and connect with consumers. ${companies[index]} works with fashion, lifestyle, and consumer goods companies across the EU.</p>
      <p><strong>Brand strategy:</strong> Develop brand positioning, messaging, and visual identity guidelines. You'll work with creative teams to ensure consistent brand expression.</p>
      <p><strong>Campaign development:</strong> Create integrated marketing campaigns that span digital, social, and sometimes traditional media. You'll manage campaigns from concept to execution.</p>
      <p><strong>Market research:</strong> Conduct research to understand target audiences, competitive landscape, and market trends. Use insights to inform brand and marketing decisions.</p>`,
      reqs: [
        'Brand marketing experience',
        'Understanding of European consumer markets',
        'Strong strategic thinking',
        'Experience with brand campaigns',
        'Excellent communication skills',
        'Additional EU languages preferred'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Creative environment',
        'Hybrid work model',
        '25+ days annual leave',
        'Brand/product samples'
      ]
    }),
    
    // Scenario 7: Local SEO
    () => ({
      desc: `<p>${companies[index]} helps local businesses across Europe improve their online visibility. We work with restaurants, hotels, retail stores, and service businesses in multiple EU countries.</p>
      <p><strong>Local SEO:</strong> Optimize Google Business Profiles, build local citations, manage reviews, and create location-based content. You'll work with businesses in different countries and languages.</p>
      <p><strong>Multi-language:</strong> Many clients operate in multiple EU countries. You'll need to understand local search behavior and optimize for different languages and markets.</p>
      <p><strong>Client communication:</strong> Work directly with business owners to understand their needs, explain SEO concepts, and show results. Strong communication skills are essential.</p>`,
      reqs: [
        'Local SEO experience',
        'Understanding of European local search',
        'Experience with Google Business Profile',
        'Multi-language SEO knowledge preferred',
        'Client-facing experience',
        'Strong English (other EU languages a plus)'
      ],
      benefits: [
        'Hybrid work',
        'Competitive salary',
        'Health insurance',
        'Flexible schedule',
        'Professional development',
        'Travel opportunities'
      ]
    }),
    
    // Scenario 8: Influencer marketing
    () => ({
      desc: `<p>We manage influencer campaigns for European brands. ${companies[index]} connects brands with creators across Instagram, TikTok, YouTube, and other platforms.</p>
      <p><strong>Influencer outreach:</strong> Find and recruit influencers who match our clients' target audiences. You'll negotiate partnerships, manage contracts, and track campaign performance.</p>
      <p><strong>Campaign management:</strong> Coordinate influencer campaigns from brief to execution. You'll ensure content aligns with brand guidelines and meets campaign objectives.</p>
      <p><strong>Relationship building:</strong> Build long-term relationships with influencers and agencies. You'll work with creators from across Europe, so understanding different markets is important.</p>`,
      reqs: [
        'Influencer marketing experience',
        'Understanding of European influencer landscape',
        'Strong negotiation skills',
        'Experience with influencer platforms',
        'Excellent communication',
        'Additional EU languages preferred'
      ],
      benefits: [
        'Competitive salary',
        'Commission on campaigns',
        'Health insurance',
        'Flexible work',
        'Industry events',
        'Product samples'
      ]
    }),
    
    // Scenario 9: Marketing analytics
    () => ({
      desc: `<p>${companies[index]} provides marketing analytics and insights for European companies. We help clients understand their marketing performance and make data-driven decisions.</p>
      <p><strong>Data analysis:</strong> Analyze marketing data from multiple sources - Google Analytics, ad platforms, CRM systems. You'll create dashboards, reports, and insights.</p>
      <p><strong>Reporting:</strong> Create monthly and quarterly reports for clients. You'll need to translate complex data into clear insights and recommendations.</p>
      <p><strong>Tool expertise:</strong> Become expert in analytics tools like Google Analytics, Tableau, Power BI, and marketing attribution platforms.</p>`,
      reqs: [
        'Marketing analytics experience',
        'Strong analytical skills',
        'Experience with analytics tools',
        'Understanding of marketing metrics',
        'Data visualization skills',
        'Strong English communication'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Analytics tool access',
        'Professional development',
        'Hybrid work',
        '25+ days annual leave'
      ]
    }),
    
    // Scenario 10: Growth marketing
    () => ({
      desc: `<p>We help European startups and scale-ups grow through growth marketing. ${companies[index]} works with tech companies looking to acquire customers and scale quickly.</p>
      <p><strong>Growth experiments:</strong> Design and run growth experiments across acquisition, activation, retention, and referral. You'll test new channels, tactics, and strategies.</p>
      <p><strong>Multi-channel:</strong> Work across multiple marketing channels - paid ads, content, email, partnerships. You'll need to understand how channels work together.</p>
      <p><strong>Data-driven:</strong> Everything is measured. You'll track metrics, analyze results, and optimize based on data. Experience with analytics and experimentation is essential.</p>`,
      reqs: [
        'Growth marketing experience',
        'Experience with startups or scale-ups',
        'Strong analytical skills',
        'Understanding of growth frameworks',
        'Experience with experimentation',
        'Strong English communication'
      ],
      benefits: [
        'Competitive salary + equity options',
        'Health insurance',
        'Flexible work',
        'Professional development',
        'Startup environment',
        '25+ days annual leave'
      ]
    })
  ]
  
  const scenarioIndex = index % scenarios.length
  const base = scenarios[scenarioIndex]()
  
  // Add variations
  const variations = [
    (b) => ({ ...b, desc: b.desc.replace('We', companies[index]) }),
    (b) => ({ ...b, desc: '<h3>Join Our European Team</h3>' + b.desc }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>EU benefits:</strong> Competitive salary, health insurance, generous annual leave, and pension contributions.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('looking for', 'seeking') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>International exposure:</strong> Work with clients and colleagues across Europe.</p>' }),
    (b) => ({ ...b, desc: '<p>At ' + companies[index] + ', ' + b.desc.substring(3) }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Work-life balance:</strong> We value work-life balance and offer flexible working arrangements.</p>' }),
    (b) => ({ ...b, desc: b.desc.replace('You\'ll', 'In this role, you\'ll') }),
    (b) => ({ ...b, desc: b.desc + '<p><strong>Career growth:</strong> Opportunities for advancement and professional development.</p>' }),
    (b) => ({ ...b, desc: '<h3>European Marketing Opportunity</h3>' + b.desc })
  ]
  
  const variation = variations[index % variations.length]
  return variation(base)
}

// Create 100 jobs from EU
const jobs = []

for (let i = 0; i < 100; i++) {
  const company = companies[i % companies.length]
  const title = jobTitles[Math.floor(Math.random() * jobTitles.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const workType = workTypes[Math.floor(Math.random() * workTypes.length)]
  // More hybrid/on-site for EU (60% hybrid, 30% on-site, 10% remote)
  const rand = Math.random()
  const workModel = rand < 0.6 ? 'hybrid' : (rand < 0.9 ? 'on-site' : 'remote')
  
  // Salary ranges for EU (competitive EU salaries)
  let salaryMin, salaryMax
  if (title.includes('Manager') || title.includes('Specialist')) {
    salaryMin = 45000 + Math.floor(Math.random() * 25000)
    salaryMax = salaryMin + 30000 + Math.floor(Math.random() * 25000)
  } else if (title.includes('Coordinator') || title.includes('Executive')) {
    salaryMin = 30000 + Math.floor(Math.random() * 20000)
    salaryMax = salaryMin + 25000 + Math.floor(Math.random() * 20000)
  } else {
    salaryMin = 25000 + Math.floor(Math.random() * 15000)
    salaryMax = salaryMin + 20000 + Math.floor(Math.random() * 15000)
  }
  
  // Only 8-10% verified
  const isVerified = Math.random() < 0.09
  
  const uniqueContent = generateEUJob(i)
  
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
  console.log('🚀 Adding 100 jobs from EU countries...')
  console.log(`   Countries: Germany, France, UK, Italy, Spain, Netherlands, Belgium, Poland, Portugal, Austria, Sweden, Denmark, Finland, Ireland, Czech Republic, Romania, Greece, Hungary`)
  console.log(`   Mostly hybrid/on-site positions`)
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
  console.log(`✅ Added: ${successCount} jobs from EU countries`)
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} jobs`)
  }
  console.log(`📊 Total jobs in database: ${successCount + 300} (previous 300 + new ${successCount})`)
  console.log('='.repeat(50))
}

createJobs().catch(console.error)

