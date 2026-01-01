# Contributing

Thank you for your interest in contributing to US Coffee Roasters!

## Adding or Updating Roaster Data

### Data Format

Each roaster entry in `data.json` must follow this structure:

```json
{
  "name": "Roaster Name",
  "state": "State Name",
  "address": "Full address",
  "website": "https://example.com"
}
```

### Requirements

- **name** (required): The official name of the coffee roaster
- **state** (required): Must be one of the 44 US states (see valid states below)
- **address** (required): The complete physical address (cannot be empty)
- **website** (required): A valid HTTPS or HTTP URL

### Valid US States

The `state` field must be one of these exact values:

Alabama, Arizona, Arkansas, California, Colorado, Delaware, Florida, Georgia, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, Tennessee, Texas, Utah, Vermont, Virginia, Washington, Wisconsin, Wyoming

### Adding a New Roaster

1. Open `data.json`
2. Add your roaster entry to the array (alphabetically by state, then by name)
3. Run `pnpm sort` to automatically sort the data (or sort manually)
4. Ensure all required fields are present and valid
5. Run the validation tests (see below)

### Updating an Existing Roaster

1. Find the roaster entry in `data.json`
2. Update the relevant fields
3. Ensure the data still passes validation

## Development Setup

1. Clone the repository
2. Install dependencies (if any):
   ```bash
   pnpm install
   ```

## Running Tests

Before submitting a pull request, ensure all tests pass:

```bash
pnpm test:all
```

This runs validation, linting, and format checks. You can also run them individually:

- `pnpm test` - Validates the data structure
- `pnpm test:lint` - Checks code style with ESLint
- `pnpm test:format` - Checks code formatting with Prettier
- `pnpm format` - Auto-formats code with Prettier
- `pnpm sort` - Automatically sorts data.json by state, then by name

The test suite validates:

- JSON structure is valid
- All required fields are present
- All fields are the correct type
- State values are valid US states
- Website URLs are valid
- No duplicate entries (by name + state)
- No unexpected fields
- Code follows linting rules
- Code is properly formatted

## Submitting Changes

1. Make your changes to `data.json`
2. Run `pnpm test:all` to ensure all checks pass
3. If formatting issues are found, run `pnpm format` to auto-fix them
4. Commit your changes with a clear message
5. Push to your fork
6. Open a pull request

### Pull Request Guidelines

- Keep changes focused on data updates
- Ensure all tests pass (validation, linting, and formatting)
- Code will be automatically formatted by Prettier if needed
- One roaster per commit is preferred for easier review

**Note:** Maintainers will handle updating the changelog and publishing new versions. You don't need to update `CHANGELOG.md` in your PR.

## Questions?

If you have questions about contributing, please open an issue on GitHub.
