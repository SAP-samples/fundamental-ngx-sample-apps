# Fundamental NGX Demo - Performance Review System

A comprehensive Angular 21 demo application showcasing **Fundamental NGX** components in a realistic business scenario: an Employee Performance Review Management System.

## 🎯 Demo Concept

This application demonstrates a modern HR system for managing employee performance reviews, featuring:
- **Dashboard** with key performance metrics
- **Employee table** with detailed information and filtering
- **Performance review form** in a modal dialog with date pickers and validation
- **New employee form** with comprehensive validation and SAP Fundamental components
- **Theme switching** (Horizon Light/Dark/High Contrast)
- **Content density** toggle (Cozy/Compact)

## 📦 Installed Fundamental NGX Packages

- `@fundamental-ngx/core@0.62.3` - Core UI components
- `@fundamental-ngx/platform@0.62.3` - Platform-level components  
- `@fundamental-ngx/cdk@0.62.3` - Component Development Kit
- `@fundamental-ngx/ui5-webcomponents@latest` - UI5 Web Components for Angular
- `@fundamental-ngx/ui5-webcomponents-fiori@latest` - UI5 Fiori components (ShellBar)
- `fundamental-styles@0.41.6` - Base styles (auto-installed)
- `@sap-theming/theming-base-content@11.36.3` - SAP Horizon theme

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (default port 4200)
npm start

# If port 4200 is in use:
ng serve --port 4300

# Run tests
npm test

# Build for production
npm run build
```

## 🎨 Features Demonstrated

### ✅ Shell Layout & Navigation
- **UI5 ShellBar** - Top application bar with branding and user menu
- **Side Navigation** - Simple list-based navigation menu (Dashboard, Employees, New Employee)
- **User Menu Popover** - Settings dropdown with theme and density options

### ✅ Dashboard Page  
- **Tiles** (`fd-tile`) displaying key metrics:
  - Total Employees
  - Active Employees  
  - Average Performance Rating
  - Upcoming Reviews (next 30 days)
- Computed signals for reactive metrics

### ✅ Employees Table Page
**Components used:**
- `fd-table` - Data table with employee information
- `fd-rating-indicator` - Visual star rating display
- `fd-button` - Action button to open review dialog
- Custom status badges with semantic colors

**Table Features:**
- 8 employees with diverse data (names from different cultures)
- Columns: First Name, Last Name, Department, Position, Status, Performance Rating, Next Review Date, Actions
- Status indicators (Active, On Leave, Probation)
- Date formatting with Angular date pipe

### ✅ Performance Review Dialog
**Components used:**
- `fd-dialog` - Modal dialog container
- `fd-date-picker` - Date selection for review periods (3 date fields)
- `fd-rating-indicator` - Interactive rating input (1-5 stars)
- `fd-form-control` - Text inputs and textareas
- `fd-button` - Form actions (Cancel, Submit)
- Reactive Forms with validation

**Form Fields:**
- Review Date (date picker)
- Review Period Start/End (date pickers)
- Performance Rating (1-5 stars, interactive)
- Strengths (textarea)
- Areas for Improvement (textarea)
- Goals for Next Period (textarea)
- Reviewer Name (text input)

### ✅ New Employee Form Page
**Components used:**
- `fd-form-control` - Form field wrappers with labels and validation states
- `fd-input` - Text inputs for names, email, phone, position
- `fd-select` - Dropdowns for department, employment type, location
- `fd-date-picker` - Start date selection
- `fd-message-strip` - Validation error messages
- `fd-button` - Form actions (Cancel, Submit)
- Reactive Forms with comprehensive validation

**Form Fields:**
- Personal Information: First Name, Last Name, Email, Phone
- Position Details: Department (6 options), Position, Start Date, Employment Type
- Compensation: Salary (optional, numeric validation)
- Organizational: Manager (optional), Cost Center (optional), Location (7 options)
- Status: Active (default)

**Validation Features:**
- Required field validation with visual feedback
- Email format validation
- Phone number pattern validation (international formats)
- Minimum length validation (2 chars for names)
- Salary minimum value validation
- Real-time error messages
- Submit button disabled during processing

### ✅ Theme Management
**Theming Service** (`ThemeService`) with:
- Theme switching via `ThemingService` from `@fundamental-ngx/core/theming`
- 4 theme options:
  - Horizon Light (default)
  - Horizon Dark
  - High Contrast Black
  - High Contrast White
- Persisted to localStorage
- Applied via SAP theming CSS variables

### ✅ Content Density
- Toggle between **Cozy** (default, touch-friendly) and **Compact** (desktop-optimized)
- Applied globally via CSS classes on `<body>` and `<html>` elements
- Persisted to localStorage
- Affects spacing, sizing, and padding across all components

## 📁 Project Structure

```
src/app/
├── models/
│   ├── employee.model.ts          # TypeScript interfaces (legacy)
│   └── employee.ts                # Employee and Department types
├── services/
│   ├── employee.ts                # Employee data service (signal-based)
│   └── theme.ts                   # Theme & density management
├── pages/
│   ├── dashboard/                 # Landing page with metrics
│   │   ├── dashboard.ts
│   │   ├── dashboard.html
│   │   └── dashboard.scss
│   ├── employees/                 # Employee table & review dialog
│   │   ├── employees.ts
│   │   ├── employees.html
│   │   └── employees.scss
│   └── new-employee/              # New employee form
│       ├── new-employee.ts
│       ├── new-employee.html
│       └── new-employee.scss
├── app.ts                         # Root component with shell layout
├── app.html                       # ShellBar + side nav + router outlet
├── app.scss                       # App-level styles
├── app.config.ts                  # Angular configuration
└── app.routes.ts                  # Route definitions
```

## 🎓 Key Technical Highlights

### Modern Angular 21 Features
- **Standalone components** - No NgModules
- **Signals** for reactive state (`signal`, `computed`)
- **Control flow syntax** - `@if`, `@for` instead of `*ngIf`, `*ngFor`
- **Reactive Forms** with typed `FormBuilder`
- **inject()** function for dependency injection

### Fundamental NGX Best Practices
- Component imports directly in standalone components
- Semantic HTML with `fd-*` directives
- SAP Design System theming variables
- Responsive layouts with CSS Grid
- Accessibility attributes (aria-label, role)

### Data Management
- Service with signal-based store pattern
- Mock data with 8 employees (diverse international names)
- Computed values for derived metrics
- Form validation with Angular Validators

## 🎨 Theming & Styling

**Global Styles** (`src/styles.scss`):
```scss
@import '@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css';
@import 'fundamental-styles/dist/fundamental-styles.css';
```

**SAP Design Tokens** used throughout:
- `--sapBackgroundColor`
- `--sapList_Background`, `--sapList_BorderColor`
- `--sapHighlightColor`
- `--sapSuccessColor`, `--sapWarningColor`, `--sapInformationColor`
- `--sapNeutralTextColor`

## 🔄 Demo Workflow

1. **Landing on Dashboard**
   - View key metrics calculated from employee data
   - Metrics update reactively when data changes

2. **Navigate to Employees**  
   - Browse employee table with all information
   - Click "Review" button on any employee

3. **Submit Performance Review**
   - Fill out review form with date pickers
   - Set rating with interactive star component
   - Form validates required fields
   - Submission updates employee data

4. **Add New Employee**
   - Click "New Employee" in navigation
   - Fill out comprehensive employee form
   - Select department, location, employment type from dropdowns
   - Pick start date with date picker
   - Real-time validation with error messages
   - Submit to navigate back to employee list

5. **Customize Experience**
   - Click user avatar in ShellBar
   - Switch theme (Light/Dark/High Contrast)
   - Toggle content density (Cozy/Compact)
   - Settings persist across sessions

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
