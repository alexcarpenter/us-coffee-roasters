import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dataPath = join(__dirname, '..', 'data.json')
const data = JSON.parse(readFileSync(dataPath, 'utf-8'))

// Sort by state, then by name (case-insensitive)
data.sort((a, b) => {
  const stateCompare = a.state.localeCompare(b.state)
  if (stateCompare !== 0) return stateCompare
  return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
})

writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
console.log(`✓ Sorted ${data.length} roasters`)
