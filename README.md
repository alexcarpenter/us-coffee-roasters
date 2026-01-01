# US Coffee Roasters

A comprehensive list of US Coffee Roasters.

## Install

```bash
npm install @alexcarpenter/us-coffee-roasters
```

## Usage

```javascript
import roasters from "@alexcarpenter/us-coffee-roasters";

console.log(roasters.length); // 319
console.log(roasters[0]);
// {
//   name: "Mama Mocha's Coffee Emporium",
//   state: "Alabama",
//   address: "414 S Gay Street Auburn, AL  36830",
//   website: "https://mamamocha.com"
// }
```

### TypeScript

```typescript
import roasters, { Roaster, State } from "@alexcarpenter/us-coffee-roasters";

const alabamaRoasters: Roaster[] = roasters.filter(
  (roaster) => roaster.state === "Alabama"
);

// State type provides type safety for state values
const filterByState = (state: State) => {
  return roasters.filter((roaster) => roaster.state === state);
};
```

## Data Structure

Each roaster object contains:

- `name` (string): The name of the coffee roaster
- `state` (State): One of 44 US states where the roaster is located
- `address` (string): The physical address
- `website` (string): The roaster's website URL

The `State` type is exported for TypeScript users and provides type safety for state values.

## License

MIT
