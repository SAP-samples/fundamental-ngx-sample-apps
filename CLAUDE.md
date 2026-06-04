# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 application using standalone components, signals, and the new application builder. Uses Vitest for unit testing instead of Karma/Jasmine.

## Essential Commands

### Development
```bash
npm start              # Start dev server at http://localhost:4200
ng serve              # Alternative to npm start
ng build --watch      # Watch mode build for development
```

### Building
```bash
npm run build         # Production build (outputs to dist/)
ng build              # Same as npm run build
```

### Testing
```bash
npm test              # Run all tests with Vitest
ng test               # Alternative to npm test
```

### Code Generation
```bash
ng generate component <name>    # Generate new component
ng generate --help               # List all available schematics
```

## Architecture

### Modern Angular Features
- **Standalone components**: No NgModules - components declare their own imports
- **Signals**: Reactive primitives (see `App.title` signal in app.ts)
- **New application builder**: Uses `@angular/build:application` instead of legacy webpack builder
- **Vitest**: Modern test runner with better performance than Karma

### Project Structure
- `src/app/app.ts` - Root component class
- `src/app/app.html` - Root component template
- `src/app/app.config.ts` - Application configuration (providers, router setup)
- `src/app/app.routes.ts` - Route definitions
- `src/main.ts` - Bootstrap entry point

### Configuration
- **Component prefix**: `app` (set in angular.json)
- **Style language**: SCSS (configured in angular.json schematics)
- **TypeScript**: Strict mode enabled with additional safety flags (noImplicitReturns, noFallthroughCasesInSwitch, etc.)
- **Prettier**: 100 char line width, single quotes, uses Angular parser for HTML

### Bundle Budgets
Production builds enforce:
- Initial bundle: 500kB warning, 1MB error
- Component styles: 4kB warning, 8kB error

## Component Development

When creating components:
- Use standalone: true (default in this project)
- Import dependencies directly in the component's `imports` array
- Use signals for reactive state where appropriate
- Keep template and styles in separate files (.html, .scss)
