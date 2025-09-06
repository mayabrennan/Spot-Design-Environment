# Spot AI Design System

A custom design system built for Spot AI applications, providing consistent, accessible, and reusable components.

## 🎨 Components

### Button
A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@spotai/design-system'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Secondary button with icon
<Button variant="secondary" size="md">
  <Icon className="w-4 h-4 mr-2" />
  With Icon
</Button>

// Outline button
<Button variant="outline" size="sm">
  Outline
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`
**Sizes:** `sm`, `md`, `lg`

### Card
A container component for grouping related content.

```tsx
import { Card } from '@spotai/design-system'

<Card variant="default">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

**Variants:** `default`, `elevated`, `outlined`

### Input
A form input component with various styles.

```tsx
import { Input } from '@spotai/design-system'

// Default input
<Input placeholder="Enter text..." />

// Search input
<Input variant="search" placeholder="Search..." />

// Error state
<Input variant="error" placeholder="Error input" />
```

**Variants:** `default`, `search`, `error`
**Sizes:** `sm`, `md`, `lg`

### Badge
A small component for displaying status, labels, or counts.

```tsx
import { Badge } from '@spotai/design-system'

<Badge variant="success" size="sm">
  Success
</Badge>

<Badge variant="warning" size="md">
  Warning
</Badge>
```

**Variants:** `default`, `success`, `warning`, `error`, `info`
**Sizes:** `sm`, `md`

### Avatar
A component for displaying user avatars with fallback support.

```tsx
import { Avatar } from '@spotai/design-system'

// With image
<Avatar src="/path/to/image.jpg" alt="User" size="md" />

// With fallback
<Avatar fallback="JD" size="lg" />

// Rounded variant
<Avatar fallback="CN" variant="rounded" size="md" />
```

**Sizes:** `sm`, `md`, `lg`, `xl`
**Variants:** `default`, `rounded`, `square`

### Modal
A modal dialog component with backdrop and keyboard support.

```tsx
import { Modal } from '@spotai/design-system'

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here...</p>
</Modal>
```

**Sizes:** `sm`, `md`, `lg`, `xl`

### Dropdown
A dropdown menu component with search and selection capabilities.

```tsx
import { Dropdown } from '@spotai/design-system'

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
]

<Dropdown
  trigger={<span>Select option</span>}
  items={items}
  onSelect={(item) => console.log(item)}
/>
```

### Tabs
A tab navigation component with multiple variants.

```tsx
import { Tabs } from '@spotai/design-system'

const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' }
]

<Tabs
  items={tabs}
  activeTab="tab1"
  onTabChange={(tabId) => setActiveTab(tabId)}
  variant="default"
>
  <div>Tab content</div>
</Tabs>
```

**Variants:** `default`, `pills`, `underline`

### Progress
A progress bar component for showing completion status.

```tsx
import { Progress } from '@spotai/design-system'

<Progress
  value={75}
  max={100}
  variant="success"
  showLabel={true}
  label="Upload Progress"
/>
```

**Variants:** `default`, `success`, `warning`, `error`
**Sizes:** `sm`, `md`, `lg`

### Alert
A component for displaying important messages and notifications.

```tsx
import { Alert } from '@spotai/design-system'

<Alert
  variant="success"
  title="Success!"
  onClose={() => setShowAlert(false)}
>
  Your action was completed successfully.
</Alert>
```

**Variants:** `default`, `success`, `warning`, `error`, `info`

### DataTable
A comprehensive data table component with sorting, searching, and filtering.

```tsx
import { DataTable } from '@spotai/design-system'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: false }
]

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]

<DataTable
  columns={columns}
  data={data}
  searchable={true}
  filterable={true}
  sortable={true}
  onSort={(column, direction) => console.log(column, direction)}
  onSearch={(query) => console.log(query)}
/>
```

### Chart
A simple chart component supporting bar, line, and pie charts.

```tsx
import { Chart } from '@spotai/design-system'

const data = [
  { label: 'Phase 1', value: 60, color: '#5857e8' },
  { label: 'Phase 2', value: 85, color: '#5857e8' },
  { label: 'Phase 3', value: 50, color: '#5857e8' }
]

<Chart
  data={data}
  title="Time Taken Per Phase"
  type="bar"
  height={256}
  showLegend={false}
/>
```

**Types:** `bar`, `line`, `pie`

### MetricsCard
A component for displaying key metrics with optional trends and icons.

```tsx
import { MetricsCard } from '@spotai/design-system'

<MetricsCard
  title="Overall Score"
  value="3.8/4"
  subtitle="Excellent performance"
  variant="success"
  size="lg"
  trend={{ value: 12, isPositive: true }}
/>
```

**Variants:** `default`, `success`, `warning`, `error`
**Sizes:** `sm`, `md`, `lg`

## 🎯 Usage

### Importing Components
```tsx
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Avatar, 
  Modal, 
  Dropdown, 
  Tabs, 
  Progress, 
  Alert, 
  DataTable, 
  Chart, 
  MetricsCard 
} from '@spotai/design-system'
```

### TypeScript Support
All components are fully typed with TypeScript interfaces for props.

### Styling
Components use Tailwind CSS classes and can be customized with the `className` prop:

```tsx
<Button className="custom-class" variant="primary">
  Custom Button
</Button>
```

## 🎨 Design Tokens

The design system uses consistent design tokens:

- **Colors:** Primary, accent, success, warning, error variants
- **Spacing:** Consistent spacing scale
- **Typography:** Inter font family with defined sizes
- **Border Radius:** Consistent rounded corners
- **Shadows:** Subtle elevation system

## 🔧 Development

### Adding New Components
1. Create the component in `components/`
2. Add TypeScript interfaces
3. Export from `index.ts`
4. Add to `index.d.ts` for type declarations

### Building
```bash
npm run build
```

## 📚 Integration

This design system integrates seamlessly with:
- Next.js 14
- TypeScript
- Tailwind CSS
- Lucide React icons

## 🎯 Best Practices

1. **Consistency:** Always use design system components for UI elements
2. **Accessibility:** All components include proper ARIA attributes
3. **Responsive:** Components are mobile-first and responsive
4. **Performance:** Components are optimized for bundle size
5. **TypeScript:** Full type safety for all props and variants

## 🚀 Features

- **13 Core Components** - Complete set of essential UI components
- **TypeScript Support** - Full type safety and IntelliSense
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Customizable** - Easy to extend and modify
- **Performance** - Optimized for production use 