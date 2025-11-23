const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Target senior roles (all remote)
const roles = [
  {
    key: 'marketing_director',
    title: 'Marketing Director / Head of Marketing',
    seniority: 'director',
    summary:
      'Lead the overall marketing strategy, own the funnel from awareness to revenue, and build a high-performing team.',
    coreFocus: [
      'Own company-wide marketing strategy and planning',
      'Lead brand positioning, messaging, and go‑to‑market campaigns',
      'Partner with Sales and Product on pipeline and revenue targets',
      'Build and coach a modern, data‑driven marketing team'
    ]
  },
  {
    key: 'digital_director',
    title: 'Digital Marketing Director / Head of Digital',
    seniority: 'director',
    summary:
      'Own all digital channels end‑to‑end and scale performance marketing, SEO, content, and lifecycle programs.',
    coreFocus: [
      'Lead paid media, SEO, content, marketing automation, and analytics',
      'Design full‑funnel digital strategies across web, email, and social',
      'Improve CAC, LTV, and ROAS across all digital campaigns',
      'Own experimentation roadmap (A/B tests, landing pages, nurture flows)'
    ]
  },
  {
    key: 'media_director',
    title: 'Media Director / Media Lead',
    seniority: 'director',
    summary:
      'Lead media strategy across performance and brand channels with strong ownership of media mix and investment.',
    coreFocus: [
      'Develop full‑funnel media strategy across digital, social, and offline',
      'Own media planning, buying, and optimization with clear KPIs',
      'Partner with creative teams on insight‑led campaigns',
      'Report on channel performance and investment recommendations'
    ]
  },
  {
    key: 'account_lead',
    title: 'Account Director / Senior Account Manager',
    seniority: 'senior_manager',
    summary:
      'Own key client relationships, translate business goals into marketing programs, and coordinate internal teams.',
    coreFocus: [
      'Act as main point of contact and strategic partner for clients',
      'Turn client objectives into clear briefs and roadmaps',
      'Coordinate internal specialists (media, creative, data)',
      'Own account P&L, forecasting, and retention'
    ]
  }
]

// Country configuration – remote roles, but salary & description tailored by country
const countryConfigs = [
  {
    code: 'IN',
    name: 'India',
    locationLabel: 'Remote, India',
    currencyLabel: 'INR',
    salary: {
      director: { min: 3500000, max: 5500000 },
      senior_manager: { min: 2200000, max: 3200000 }
    },
    marketNote:
      'You will collaborate closely with cross‑functional teams in India and global stakeholders across multiple time zones.'
  },
  {
    code: 'PH',
    name: 'Philippines',
    locationLabel: 'Remote, Philippines',
    currencyLabel: 'PHP',
    salary: {
      director: { min: 3500000, max: 5200000 },
      senior_manager: { min: 1800000, max: 2600000 }
    },
    marketNote:
      'You will lead programs for both local and international clients, working with distributed teams across APAC and North America.'
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    locationLabel: 'Remote, Bangladesh',
    currencyLabel: 'BDT',
    salary: {
      director: { min: 6500000, max: 9000000 },
      senior_manager: { min: 4200000, max: 5800000 }
    },
    marketNote:
      'You will help brands in Bangladesh and overseas scale modern digital channels while building strong local capability.'
  },
  {
    code: 'ES',
    name: 'Spain',
    locationLabel: 'Remote, Spain',
    currencyLabel: 'EUR',
    salary: {
      director: { min: 70000, max: 95000 },
      senior_manager: { min: 45000, max: 65000 }
    },
    marketNote:
      'You will partner with Spanish and pan‑European brands, leading multi‑market campaigns across EMEA.'
  },
  {
    code: 'US',
    name: 'United States',
    locationLabel: 'Remote, United States',
    currencyLabel: 'USD',
    salary: {
      director: { min: 140000, max: 190000 },
      senior_manager: { min: 95000, max: 135000 }
    },
    marketNote:
      'You will operate in a fast‑paced, growth‑oriented environment working with US‑based stakeholders and global teams.'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    locationLabel: 'Remote, United Kingdom',
    currencyLabel: 'GBP',
    salary: {
      director: { min: 95000, max: 130000 },
      senior_manager: { min: 65000, max: 90000 }
    },
    marketNote:
      'You will lead campaigns for UK and European markets, with a strong focus on measurable commercial impact.'
  },
  {
    code: 'ID',
    name: 'Indonesia',
    locationLabel: 'Remote, Indonesia',
    currencyLabel: 'IDR',
    salary: {
      director: { min: 750000000, max: 1100000000 },
      senior_manager: { min: 450000000, max: 700000000 }
    },
    marketNote:
      'You will drive growth for Indonesian and regional brands, balancing marketplace, e‑commerce, and performance channels.'
  },
  {
    code: 'CA',
    name: 'Canada',
    locationLabel: 'Remote, Canada',
    currencyLabel: 'CAD',
    salary: {
      director: { min: 125000, max: 165000 },
      senior_manager: { min: 90000, max: 125000 }
    },
    marketNote:
      'You will work with Canadian and North American stakeholders, operating in a data‑driven, test‑and‑learn culture.'
  },
  {
    code: 'AU',
    name: 'Australia',
    locationLabel: 'Remote, Australia',
    currencyLabel: 'AUD',
    salary: {
      director: { min: 130000, max: 180000 },
      senior_manager: { min: 95000, max: 130000 }
    },
    marketNote:
      'You will lead integrated marketing programs for Australian and APAC markets, collaborating with commercial and product teams.'
  }
]

const workTypes = ['full-time']
const workModel = 'remote'

// Company name suggestions per country (small/medium agencies, no big tech)
const companyNamesByCountry = {
  IN: [
    'Lotus Growth Labs',
    'Mumbai Performance Studio',
    'Bangalore Digital Collective',
    'Delhi Brand Partners'
  ],
  PH: [
    'Manila Growth Agency',
    'Cebu Digital Lab',
    'Philippines Performance Media',
    'Luzon Creative Partners'
  ],
  BD: [
    'Dhaka Digital Studio',
    'Bangladesh Growth Partners',
    'Chittagong Media Collective',
    'Summit Marketing Bangladesh'
  ],
  ES: [
    'Barcelona Growth Studio',
    'Madrid Digital Partners',
    'Valencia Performance Media',
    'Seville Brand Collective'
  ],
  US: [
    'Northbridge Growth Partners',
    'Summit Peak Digital',
    'OpenRoad Media Collective',
    'Brightline Performance Marketing'
  ],
  GB: [
    'London Signal Studio',
    'Thames Digital Partners',
    'Northstar Media UK',
    'Crownline Growth Agency'
  ],
  ID: [
    'Jakarta Growth Studio',
    'Nusantara Digital Collective',
    'Bali Performance Media',
    'Bandung Brand Partners'
  ],
  CA: [
    'Maple Leaf Growth Lab',
    'Toronto Digital Collective',
    'Pacific North Media',
    'Prairie Summit Marketing'
  ],
  AU: [
    'Sydney Growth Studio',
    'Melbourne Digital Partners',
    'Coastal Signal Media',
    'Outback Performance Marketing'
  ]
}

function buildDescription(country, role) {
  const salaryRange =
    country.salary[role.seniority] || country.salary.senior_manager

  const salaryLine = `<p><strong>Compensation:</strong> Competitive base salary in ${country.currencyLabel} (approx. ${salaryRange.min.toLocaleString()} - ${salaryRange.max.toLocaleString()} ${country.currencyLabel}) plus performance bonus and benefits, aligned with experience and local market benchmarks.</p>`

  const coreFocusList = role.coreFocus
    .map(item => `<li>${item}</li>`)
    .join('')

  return `
    <p>${role.summary}</p>
    <p>This is a <strong>remote ${country.name}</strong> position. ${country.marketNote}</p>
    <h3>Key Responsibilities</h3>
    <ul>
      ${coreFocusList}
      <li>Champion a test‑and‑learn culture and share learnings across markets and stakeholders.</li>
      <li>Partner closely with Sales, Product, and Finance to ensure marketing plans are realistic and measurable.</li>
      <li>Own clear reporting on pipeline, revenue impact, and channel performance.</li>
    </ul>
    <h3>Ideal Profile</h3>
    <ul>
      <li>5–8+ years of progressive experience in digital/brand/performance marketing (agency or in‑house).</li>
      <li>Proven experience leading teams or cross‑functional initiatives in ${country.name} or similar markets.</li>
      <li>Comfortable working fully remote, with excellent written and verbal communication.</li>
      <li>Hands‑on experience with modern marketing tools (Google Analytics, ad platforms, CRM/automation, etc.).</li>
      <li>Fluent in English; additional local languages are a strong advantage.</li>
    </ul>
    <h3>Why Join</h3>
    <ul>
      <li>High‑impact, senior role with ownership over strategy and outcomes.</li>
      <li>Fully remote setup with flexible hours and trust‑based culture.</li>
      <li>Budget for training, conferences, and certifications every year.</li>
      <li>Collaborative, low‑ego team that values clarity, feedback, and continuous improvement.</li>
    </ul>
    ${salaryLine}
  `
}

function buildRequirements() {
  return [
    '5+ years in digital or integrated marketing roles, with at least 2 years in a leadership capacity',
    'Track record of building and executing measurable marketing programs',
    'Ability to work cross‑functionally with Sales, Product, and Leadership',
    'Excellent written and verbal communication in English',
    'Strong analytical skills and experience with marketing analytics tools',
    'Comfortable working in a remote, distributed team environment'
  ]
}

function buildBenefits(country) {
  return [
    `Fully remote role based in ${country.name} with flexible working hours`,
    'Annual performance bonus tied to company and individual results',
    'Budget for learning, conferences, and certifications',
    'Laptop and home‑office allowance',
    'Collaborative international team with clear growth paths'
  ]
}

async function updateCompanyNames() {
  console.log('🔧 Updating company names for senior remote marketing jobs...\\n')

  for (const country of countryConfigs) {
    const companyPool =
      companyNamesByCountry[country.code] ||
      [`${country.name} Growth Studio`, `${country.name} Digital Lab`, `${country.name} Marketing Collective`]

    const { data, error } = await supabase
      .from('jobs')
      .select('id, title, company, location')
      .eq('location', country.locationLabel)
      .in(
        'title',
        roles.map((r) => r.title)
      )

    if (error) {
      console.error(`❌ Error fetching jobs for ${country.name}:`, error)
      continue
    }

    if (!data || data.length === 0) {
      console.log(`ℹ️ No existing senior jobs found for ${country.name}, skipping.`)
      continue
    }

    console.log(`✏️ ${country.name}: updating ${data.length} jobs...`)

    for (let i = 0; i < data.length; i++) {
      const jobRow = data[i]
      const newCompany = companyPool[i % companyPool.length]

      if (jobRow.company === newCompany) {
        continue
      }

      const { error: updateError } = await supabase
        .from('jobs')
        .update({ company: newCompany })
        .eq('id', jobRow.id)

      if (updateError) {
        console.error(`  ❌ Failed to update job ${jobRow.id} (${jobRow.title}) in ${country.name}:`, updateError)
      } else {
        console.log(`  ✅ ${jobRow.title} → ${newCompany}`)
      }
    }
  }

  console.log('\\n✅ Finished updating company names for senior remote roles.')
}

updateCompanyNames().catch((err) => {
  console.error('❌ Unexpected error:', err)
})


