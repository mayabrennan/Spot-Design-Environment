# Spot AI Dashboard

A responsive SaaS dashboard built with Next.js, TypeScript, and Tailwind CSS, based on a Figma design.

## Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with consistent design system
- **Interactive Components**: Collapsible sidebar, tabs, search functionality
- **Data Visualization**: Charts, metrics cards, and data tables
- **AI Assistant**: Integrated Iris AI sidebar for intelligent insights

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
saas-dashboard/
├── app/
│   ├── components/
│   │   ├── Dashboard.tsx      # Main dashboard component
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Header.tsx         # Top header with search
│   │   ├── MainContent.tsx    # Main content area
│   │   ├── MetricsCards.tsx   # Score and phase metrics
│   │   ├── ChartSection.tsx   # Time analysis chart
│   │   ├── DataTable.tsx      # Data table with filters
│   │   └── IrisSidebar.tsx    # AI assistant sidebar
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Design System

The dashboard uses a consistent design system with:

- **Colors**: Primary (#313a45), Accent (#5857e8), Success (#00b070), Warning (#ff950a)
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Tailwind's spacing scale
- **Components**: Reusable UI components with consistent styling

## Responsive Features

- **Sidebar**: Collapsible navigation that adapts to screen size
- **Grid Layout**: Responsive grid system for metrics and charts
- **Table**: Horizontal scrolling on mobile devices
- **Typography**: Responsive text sizing
- **Spacing**: Adaptive padding and margins

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Customization

The dashboard is highly customizable through:

- **Tailwind Config**: Modify colors, fonts, and spacing
- **Component Props**: Pass custom data and configurations
- **CSS Variables**: Override design tokens
- **Theme System**: Extend with additional design tokens

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own applications. 