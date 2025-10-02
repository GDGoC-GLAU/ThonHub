# Contributing to ThonHub

Welcome to ThonHub! This guide will help you contribute to our GenAI-powered Hackathon Collaboration Hub.

## Why Contribute?

- Help students and developers worldwide find hackathon teams
- Work with modern tech stack (React, Flask, MongoDB, AI/ML)
- Participate in Hacktoberfest
- Join a community of developers passionate about collaboration

## Quick Start Guide

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/ThonHub.git
cd ThonHub
git remote add upstream https://github.com/GDGoC-GLAU/ThonHub.git
```

### 2. Set Up Environment

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

## How to Contribute

### For First-Time Contributors
Look for issues labeled: `good first issue`, `documentation`, `frontend`, `hacktoberfest`

### Finding Issues
1. Check the Issues tab
2. Comment to get assigned
3. Propose new features if needed

### Types of Contributions
- Bug fixes
- New features (teammate matching, AI improvements, UI)
- Documentation improvements
- Tests and code quality
- Accessibility improvements

## Development Guidelines

### Code Style

**Frontend (React):**
- Use ES6+ and React Hooks
- Use Tailwind CSS for styling
- Keep components small and reusable

**Backend (Python):**
- Follow PEP 8 guidelines
- Add docstrings and type hints
- Keep functions focused

### Testing
- Write tests for new features
- Ensure existing tests pass
- Test across different browsers/devices

## Pull Request Process

### Before Submitting
- Test your changes
- Run linters
- Update documentation
- Rebase with main branch

### Commit Messages
Use Conventional Commits format:
```
feat: add teammate matching algorithm
fix: resolve authentication bug
docs: update API documentation
```

### PR Requirements
Include in your PR:
- Description of changes
- Problem being solved
- Testing approach
- Screenshots for UI changes
- Link related issues

## Hacktoberfest Guidelines

- Make meaningful contributions (no spam)
- Quality over quantity
- Follow project guidelines
- Look for `hacktoberfest` labeled issues

### Hacktoberfest Ideas
- Frontend components
- AI feature improvements
- API documentation
- Accessibility features
- Comprehensive tests

## Getting Help

**Stuck?**
- Comment on your issue
- Check documentation in `/docs`
- Search existing issues
- Contact maintainers

**Common Issues:**
- Ensure MongoDB is running
- Check environment variables in `.env`
- Verify ports 3000/5000 are available

## Useful Commands

```bash
# Development
cd backend && python app.py     # Start backend
cd frontend && npm start        # Start frontend
npm test                        # Frontend tests
pytest                          # Backend tests

# Git workflow
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Code of Conduct

This project follows the Contributor Covenant code of conduct. Be respectful and inclusive in all interactions.

## Questions?

Open an issue with the `question` label for any questions about contributing.
