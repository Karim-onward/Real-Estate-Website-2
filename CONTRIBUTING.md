# Contributing to BuildEstate

Thank you for considering contributing to BuildEstate! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be courteous and respectful in your interactions.

## How to Contribute

There are several ways you can contribute to the BuildEstate project:

1. **Reporting Bugs**: Open an issue describing the bug, how to reproduce it, and any potential solutions.
2. **Suggesting Features**: Open an issue describing your feature idea and how it would benefit the project.
3. **Submitting Code**: Make a pull request with your code changes.
4. **Improving Documentation**: Help improve the documentation through pull requests.

## Development Process

### Setup Local Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/AAYUSH412/Real-Estate-Website.git
   cd buildEstate
   ```
3. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install

   # Install admin dependencies
   cd ../admin
   npm install
   ```
4. Create your `.env.local` files as described in the [README.md](README.md)

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Test your changes thoroughly
4. Commit your changes:
   ```bash
   git commit -m "Brief description of changes"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Create a pull request from your branch to the main repository

## Pull Request Guidelines

- Ensure your code follows the existing style patterns and practices
- Include clear descriptions of the changes made
- Update documentation if necessary
- Make sure all tests pass
- Keep pull requests focused on a single concern/feature

## Code Style

- Follow the existing code style and formatting
- Use meaningful variable and function names
- Write comments for complex logic
- Include JSDoc comments for functions

## Testing

- Add appropriate tests for new features
- Ensure all existing tests pass
- Manual testing should be performed on different devices and browsers

## Documentation

- Update the README.md if necessary
- Document API changes in the appropriate documentation files
- Keep code comments up-to-date

## Questions?

If you have any questions or need help, feel free to open an issue or contact the maintainers.

Thank you for contributing to BuildEstate!