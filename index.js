import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const roasters = JSON.parse(readFileSync(join(__dirname, 'data.json'), 'utf-8'))

export default roasters
