# Contributing to Global Youth Wellness

Thank you for your interest in contributing to Global Youth Wellness! We welcome contributions from developers, designers, mental health professionals, youth advocates, and anyone passionate about improving youth wellness through technology.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Types of Contributions](#types-of-contributions)
- [Development Setup](#development-setup)
- [Submission Guidelines](#submission-guidelines)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@globalyouthwellness.org](mailto:conduct@globalyouthwellness.org).

## How to Contribute

### Reporting Issues
- Use the [Issue tracker](https://github.com/VNSWAMY123/google-gen/issues) to report bugs, request features, or ask questions
- Search existing issues before creating new ones
- Use clear, descriptive titles and detailed descriptions
- Include steps to reproduce for bug reports
- Add relevant labels to categorize your issue

### Suggesting Enhancements
We value your ideas! When suggesting enhancements:
- Check if the enhancement has already been suggested
- Explain why this enhancement would be useful to most users
- Provide examples and mockups when possible
- Consider the impact on youth users and accessibility

## Types of Contributions

### Development
- **Frontend Development**: React.js, TypeScript, Tailwind CSS
- **Backend Development**: Node.js, Express.js, PostgreSQL
- **Mobile Development**: React Native (future roadmap)
- **DevOps**: CI/CD, deployment, monitoring

### Design
- **UI/UX Design**: User interface and experience design
- **Accessibility**: Ensuring inclusive design for all users
- **Visual Design**: Graphics, illustrations, branding
- **User Research**: Conducting studies with youth users

### Content
- **Mental Health Content**: Evidence-based articles and resources
- **Documentation**: Technical and user documentation
- **Translations**: Multilingual support
- **Community Moderation**: Forum and discussion management

### Testing
- **Quality Assurance**: Manual testing and bug reporting
- **User Testing**: Gathering feedback from youth users
- **Performance Testing**: Load and stress testing
- **Accessibility Testing**: Ensuring compliance with WCAG guidelines

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- PostgreSQL (for backend development)

### Getting Started

1. **Fork the repository**
   ```bash
   # Fork on GitHub and clone your fork
   git clone https://github.com/YOUR_USERNAME/google-gen.git
   cd google-gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow our style guidelines
   - Add tests for new functionality
   - Ensure all tests pass

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new wellness tracking feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe your changes in detail
   - Include screenshots for UI changes

## Submission Guidelines

### Pull Request Requirements
- [ ] Code follows project style guidelines
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated if necessary
- [ ] Accessibility guidelines are followed
- [ ] Changes are tested on multiple devices/browsers
- [ ] Mental health content is reviewed by qualified professionals

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

## Style Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write self-documenting code with clear comments
- Follow React hooks best practices

### Design Guidelines
- Follow WCAG 2.1 AA accessibility standards
- Ensure high color contrast ratios
- Design for mobile-first responsive layouts
- Use consistent spacing and typography
- Consider users with different abilities and mental health conditions

### Content Guidelines
- Use inclusive, non-stigmatizing language
- Ensure mental health information is evidence-based
- Cite credible sources for health claims
- Write in clear, youth-friendly language
- Respect cultural differences and diversity

## Community

### Communication Channels
- **Discord**: [Join our community server](https://discord.gg/globalyouthwellness)
- **Email**: [dev@globalyouthwellness.org](mailto:dev@globalyouthwellness.org)
- **GitHub Discussions**: For longer conversations about features and ideas
- **Monthly Community Calls**: First Saturday of each month

### Recognition
We recognize contributors in several ways:
- Contributors section in README
- Annual contributor appreciation posts
- Conference speaking opportunities
- Reference letters for students and professionals
- Open source portfolio building

### Getting Help
- Check existing documentation and issues first
- Join our Discord for real-time help
- Attend our community calls for guidance
- Reach out to maintainers directly for complex questions

## Special Considerations

### Youth Privacy and Safety
- All contributors must respect youth privacy
- Follow COPPA and GDPR guidelines
- Report any safety concerns immediately
- Maintain confidentiality of user data

### Mental Health Content
- Mental health content must be reviewed by qualified professionals
- Avoid providing direct medical advice
- Include appropriate disclaimers and crisis resources
- Use trauma-informed language and approaches

Thank you for contributing to Global Youth Wellness! Together, we're building a healthier future for young people worldwide. 🌍💚
