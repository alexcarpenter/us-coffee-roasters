import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const US_STATES = [
  'Alabama',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Delaware',
  'Florida',
  'Georgia',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'Wisconsin',
  'Wyoming'
]

function isValidUrl(string) {
  try {
    const url = new URL(string)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const dataPath = join(__dirname, '..', 'data.json')
const data = JSON.parse(readFileSync(dataPath, 'utf-8'))

let errors = []

// Validate it's an array
if (!Array.isArray(data)) {
  errors.push('Data must be an array')
  process.exit(1)
}

// Validate each roaster
data.forEach((roaster, index) => {
  const prefix = `Roaster ${index + 1}`

  // Check required fields
  if (!roaster.name || typeof roaster.name !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'name' field`)
  }
  if (!roaster.state || typeof roaster.state !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'state' field`)
  } else if (!US_STATES.includes(roaster.state)) {
    errors.push(`${prefix}: Invalid state '${roaster.state}'`)
  }
  if (!roaster.address || typeof roaster.address !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'address' field`)
  }
  if (!roaster.website || typeof roaster.website !== 'string') {
    errors.push(`${prefix}: Missing or invalid 'website' field`)
  } else if (!isValidUrl(roaster.website)) {
    errors.push(`${prefix}: Invalid website URL '${roaster.website}'`)
  }

  // Check for extra fields
  const allowedFields = ['name', 'state', 'address', 'website']
  const extraFields = Object.keys(roaster).filter(
    key => !allowedFields.includes(key)
  )
  if (extraFields.length > 0) {
    errors.push(`${prefix}: Unexpected fields: ${extraFields.join(', ')}`)
  }
})

// Check for duplicates (by name and state)
const seen = new Set()
data.forEach((roaster, index) => {
  const key = `${roaster.name}|${roaster.state}`
  if (seen.has(key)) {
    errors.push(
      `Roaster ${index + 1}: Duplicate entry for '${roaster.name}' in ${
        roaster.state
      }`
    )
  }
  seen.add(key)
})

if (errors.length > 0) {
  console.error('Validation failed:\n')
  errors.forEach(error => console.error(`  ✗ ${error}`))
  process.exit(1)
}

console.log(`✓ Validated ${data.length} roasters`)
console.log('✓ All roasters have valid structure')
console.log('✓ All states are valid US states')
console.log('✓ All websites are valid URLs')
console.log('✓ No duplicate entries')
