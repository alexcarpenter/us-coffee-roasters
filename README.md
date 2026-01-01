# US Coffee Roasters

A comprehensive, validated list of US coffee roasters available as an npm package.

## Installation

```bash
npm install @alexcarpenter/us-coffee-roasters
```

## Usage

### Basic Import

```javascript
// Default import
import roasters from '@alexcarpenter/us-coffee-roasters';

// Named import
import { roasters } from '@alexcarpenter/us-coffee-roasters';
```

### TypeScript Support

```typescript
import { roasters, type Roaster } from '@alexcarpenter/us-coffee-roasters';

// Full type safety and autocomplete
const firstRoaster: Roaster = roasters[0];
```

### Using Utility Functions

```javascript
import {
  roasters,
  findByState,
  searchByName,
  getStats
} from '@alexcarpenter/us-coffee-roasters';

// Find roasters by state
const californiaRoasters = findByState(roasters, 'California');

// Search by name (case-insensitive)
const results = searchByName(roasters, 'coffee');

// Get statistics
const stats = getStats(roasters);
console.log(stats.total); // Total number of roasters
console.log(stats.byState); // Count per state
```

## Available Utilities

### Search Functions

- `findByState(roasters, state)` - Filter roasters by state name
- `searchByName(roasters, query)` - Case-insensitive name search
- `findByWebsite(roasters, url)` - Find roaster by exact website URL
- `filterByStates(roasters, states)` - Filter by multiple states

### Statistics Functions

- `getStats(roasters)` - Get total count and counts by state
- `getStateCounts(roasters)` - Get count per state
- `getStates(roasters)` - Get list of unique states

## Data Structure

Each roaster object has the following structure:

```typescript
interface Roaster {
  name: string;        // Roaster name
  state: string;       // US state name
  address: string;     // Physical address
  website: string;     // Website URL
  thumbnail?: string;  // Optional thumbnail image
}
```

## Validation

All data is validated for:
- ✅ JSON schema compliance
- ✅ No duplicate entries (by name and website)
- ✅ Website URL reachability

## CLI Tool

For maintainers and contributors, a CLI tool is available in the source repository:

```bash
# Add a roaster
bun run cli add "Coffee Shop" "California" "123 Main St" "https://example.com"

# Remove a roaster
bun run cli remove "Coffee Shop"

# Validate data
bun run cli validate

# List roasters
bun run cli list --state California
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

MIT

