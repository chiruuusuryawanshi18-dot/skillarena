# Contributing to SkillArena

Thank you for your interest in contributing to SkillArena! We welcome contributions from the community.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if bug already reported
2. Create issue with:
   - Clear description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details

### Suggesting Features

1. Check if feature already suggested
2. Create issue with:
   - Clear description
   - Use case
   - Proposed solution
   - Alternatives considered

### Code Contributions

1. Fork repository
2. Create feature branch from `develop`
3. Follow code standards (see Developer Guide)
4. Write tests for changes
5. Update documentation
6. Submit pull request

### Pull Request Process

1. Update README if needed
2. Follow commit message conventions
3. Ensure tests pass
4. Get review approval
5. Squash commits if needed
6. Merge to develop

## Development Setup

See [Developer Guide](./docs/DEVELOPER.md) for detailed setup instructions.

## Code Standards

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Unit tests required
- 80%+ code coverage target

## Commit Messages

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Build/tooling

Example:
```
feat: Add user authentication endpoint

Implement JWT-based authentication with refresh tokens.
Includes password hashing and validation.
```

## Testing

All contributions should include tests:

```bash
# Run tests
npm run test

# Coverage
npm run test:cov
```

## Questions?

- Check documentation
- Search existing issues
- Ask in discussions
- Email support@skillarena.com

Thank you for contributing! 🎉
