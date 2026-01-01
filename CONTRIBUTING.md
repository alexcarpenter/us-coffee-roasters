# Contributing to US Coffee Roasters

Thank you for your interest in contributing! This document provides guidelines for contributing to the US Coffee Roasters dataset.

## How to Contribute

### Adding a New Roaster

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/us-coffee-roasters.git
   cd us-coffee-roasters
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Add a roaster using the CLI**

   ```bash
   bun run cli add "Roaster Name" "State" "Address" "https://website.com"
   ```

   Or manually edit `data.json` following the existing format:

   ```json
   {
     "name": "Roaster Name",
     "state": "State Name",
     "address": "Full Address",
     "website": "https://website.com"
   }
   ```

4. **Validate your changes**

   ```bash
   bun run cli validate
   ```

   This will check:

   - Schema validation (required fields, valid state names, URL format)
   - Duplicate detection (no duplicate name + website combinations)
   - Link checking (website URLs are reachable)

5. **Submit a Pull Request**
   - Ensure all validations pass
   - Write a clear PR description
   - Include the roaster name and state in the PR title

### Removing a Roaster

Use the CLI to remove a roaster:

```bash
bun run cli remove "Roaster Name"
# or
bun run cli remove "https://website.com"
```

Then validate and submit a PR.

### Validation Requirements

All contributions must pass validation:

1. **Schema Validation**

   - All required fields must be present: `name`, `state`, `address`, `website`
   - `state` must be a valid US state name (full name, not abbreviation)
   - `website` must be a valid URL format
   - `thumbnail` is optional

2. **No Duplicates**

   - No two entries can have the same name AND website
   - Comparison is case-insensitive and normalizes URLs

3. **Link Checking**
   - All website URLs must be reachable (HTTP 2xx or 3xx status)
   - Links are checked during CI/CD

### Data Format Guidelines

- **Name**: Use the official business name
- **State**: Use full state name (e.g., "California", not "CA")
- **Address**: Include full street address
- **Website**: Must be a valid HTTPS URL

### Running Validations Locally

```bash
# Run all validations (including link checks)
bun run cli validate

# Skip link checks for faster validation
bun run cli validate --skip-links
```

### PR Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validations: `bun run cli validate`
5. Ensure all checks pass
6. Submit a pull request
7. Wait for review and CI/CD validation

### Code of Conduct

- Be respectful and constructive
- Focus on the data quality
- Follow the existing data format
- Ensure all validations pass before submitting

## Questions?

If you have questions about contributing, please open an issue on GitHub.
