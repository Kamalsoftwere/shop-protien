# 🤝 Contributing to Kamal Dallasheh Health Supplements Store

Thank you for your interest in contributing to our project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB
- Git
- npm or yarn

### Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/shop-protien.git
cd shop-protien

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/shop-protien.git
```

## 🛠️ Development Setup

### 1. Install Dependencies
```bash
# Install all dependencies
npm run install:all
```

### 2. Environment Setup
```bash
# Create environment files
cp .env.example .env
cp server/.env.example server/.env

# Configure your environment variables
```

### 3. Database Setup
```bash
# Start MongoDB
mongod

# Seed the database
npm run seed
```

### 4. Start Development Servers
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run client
```

## 📝 Code Style

### General Guidelines
- Use meaningful variable and function names
- Write clear and concise comments
- Follow the existing code structure
- Keep functions small and focused
- Use TypeScript for type safety

### Frontend (React/TypeScript)
```typescript
// ✅ Good
const handleUserLogin = async (credentials: LoginCredentials) => {
  try {
    const response = await loginUser(credentials);
    setUser(response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// ❌ Bad
const login = async (data) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  const user = await res.json();
  setUser(user);
};
```

### Backend (Node.js/Express)
```javascript
// ✅ Good
const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    const product = new Product({
      name,
      price,
      category
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Bad
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) format:

### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
# ✅ Good commits
feat: add user authentication system
fix: resolve login token validation issue
docs: update README with deployment instructions
style: format code with prettier
refactor: improve error handling in API routes
test: add unit tests for user model
chore: update dependencies

# ❌ Bad commits
updated stuff
fixed bug
added feature
```

## 🔄 Pull Request Process

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes
- Write your code following the style guidelines
- Add tests if applicable
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run tests
npm test

# Check linting
npm run lint

# Build the project
npm run build
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

### 6. Pull Request Guidelines
- Use a clear and descriptive title
- Provide a detailed description of changes
- Include screenshots for UI changes
- Reference any related issues
- Ensure all tests pass

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Search for similar problems
- Test with the latest version

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.1.0]

**Additional Context**
Any other context about the problem.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Use Case**
How would this feature be used?

**Proposed Solution**
Any ideas on how to implement this?

**Alternative Solutions**
Any alternative solutions you've considered?

**Additional Context**
Any other context or screenshots.
```

## 🔧 Development Workflow

### 1. Keep Your Fork Updated
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### 2. Create Feature Branches
```bash
git checkout -b feature/feature-name
# Make changes
git add .
git commit -m "feat: add feature description"
git push origin feature/feature-name
```

### 3. Submit Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Select your feature branch
- Fill out the PR template
- Submit for review

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [MongoDB Documentation](https://docs.mongodb.com/)

## 🎯 Areas for Contribution

### High Priority
- [ ] Performance optimization
- [ ] Security improvements
- [ ] Test coverage
- [ ] Documentation updates

### Medium Priority
- [ ] UI/UX improvements
- [ ] New features
- [ ] Bug fixes
- [ ] Code refactoring

### Low Priority
- [ ] Code style improvements
- [ ] Minor documentation updates
- [ ] Dependency updates

## 📞 Contact

If you have questions or need help:
- Open an issue on GitHub
- Contact the maintainer directly
- Join our community discussions

---

**Thank you for contributing to our project! 🚀**
