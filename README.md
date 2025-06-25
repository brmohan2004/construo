# Project Nexus

A modern web application built with React, TypeScript, and Vite.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

The project uses:
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- ESLint for code linting

## Building for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

## Custom Domain Setup

To set up a custom domain:

1. Build your project for production
2. Deploy the contents of the `dist` directory to your hosting provider
3. Configure your domain's DNS settings to point to your hosting provider

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `lib/` - Utility functions and shared code
  - `hooks/` - Custom React hooks

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
