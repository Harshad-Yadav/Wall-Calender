# Interactive Wall Calendar

A modern, responsive, and aesthetically pleasing interactive wall calendar built with React and Vite. The application features a "physical" wall calendar aesthetic, a functional date range selector with clear visual states, and an integrated notes section with client-side persistence.

## Features

- **Wall Calendar Aesthetic**: Visually authentic "wall-attached" calendar design with shadows, borders, and paper-like textures.
- **Interactive Calendar Grid**: Interactive monthly grid to select single dates or date ranges.
- **Notes Panel**: A side-panel for taking and saving notes for specific dates or ranges, persisting data using `localStorage`.
- **Responsive Design**: Adapts seamlessly from desktop to mobile screens.
- **Modern UI Components**: Built using accessible and customizable Radix UI and shadcn/ui components.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Date Utilities**: `date-fns`, `react-day-picker`
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

You can use npm, yarn, pnpm, or bun to manage dependencies. The project includes a `bun.lockb` file, suggesting Bun was used, but any of these will work.

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (optional, if using Bun)

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:

```bash
cd "Wall Calender"
```

3. Install dependencies:

```bash
npm install
# or
bun install
```

### Running the Application Local

To start the development server, run:

```bash
npm run dev
# or
bun run dev
```

The application will be available at [http://localhost:5173/](http://localhost:5173/) by default.

## Available Scripts

- `dev`: Starts the Vite development server.
- `build`: Builds the app for production.
- `preview`: Serves the production build locally.
- `lint`: Lints the codebase using ESLint.
- `test`: Runs unit tests using Vitest.
- `test:watch`: Runs tests in watch mode.

## Project Structure

- `src/`: Contains the main source code for the application.
  - Components, styles, utilities, and main UI views.
- `public/`: Static assets such as images and icons.
