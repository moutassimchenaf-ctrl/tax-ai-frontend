# Testing & Performance Guide

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

**Run tests:**
```bash
npm test
```

**Run with coverage:**
```bash
npm run test:coverage
```

**Coverage targets:**
- Statements: 90%+
- Branches: 85%+
- Functions: 90%+
- Lines: 90%+

**Example test:**
```typescript
import { render, screen } from '@testing-library/react'
import { HeroCanvas } from '@/components/3d/HeroCanvas'

test('renders HeroCanvas', () => {
  render(<HeroCanvas />)
  const canvas = screen.getByRole('img') // Canvas has img role
  expect(canvas).toBeInTheDocument()
})
```

### E2E Tests (Playwright)

**Run E2E tests:**
```bash
npx playwright test
```

**Run with UI:**
```bash
npx playwright test --ui
```

**Debug mode:**
```bash
npx playwright test --debug
```

**Test files:** `e2e/*.spec.ts`

### Accessibility Tests

**Run axe tests:**
```bash
npx playwright test --grep @a11y
```

**Storybook a11y addon:**
```bash
npm run storybook
```
Check the "Accessibility" tab in each story.

---

## Performance Monitoring

### Web Vitals

Core Web Vitals are automatically tracked via `WebVitals` component:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTFB** (Time to First Byte): < 600ms

### Lighthouse Audit

**Run Lighthouse:**
```bash
npm run build
npm start
# In Chrome DevTools: Lighthouse tab → Generate report
```

**Target scores:**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Bundle Analysis

**Analyze bundle:**
```bash
ANALYZE=true npm run build
```

Opens interactive treemap showing:
- Bundle sizes
- Largest dependencies
- Optimization opportunities

**Optimization checklist:**
- [ ] Code splitting with `next/dynamic`
- [ ] Image optimization with `next/image`
- [ ] Font preloading
- [ ] Tree shaking unused code
- [ ] Lazy load heavy components (3D, animations)

---

## Performance Best Practices

### 1. Lazy Loading

```typescript
import dynamic from 'next/dynamic'

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>,
})
```

### 2. Image Optimization

```typescript
import Image from 'next/image'

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={630}
  priority // For above-the-fold images
  placeholder="blur"
/>
```

### 3. Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

const ExpensiveComponent = memo(({ data }) => {
  const processed = useMemo(() => processData(data), [data])
  const handler = useCallback(() => handleClick(), [])
  
  return <div onClick={handler}>{processed}</div>
})
```

### 4. Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Test & Deploy

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npx playwright install
      - run: npx playwright test
      
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: http://localhost:3000
          uploadArtifacts: true
```

---

## Debugging

### React DevTools Profiler

1. Install React DevTools extension
2. Open Profiler tab
3. Record interaction
4. Analyze render times

### Performance API

```typescript
// Measure custom metrics
performance.mark('start-render')
// ... render logic
performance.mark('end-render')
performance.measure('render-time', 'start-render', 'end-render')

const measure = performance.getEntriesByName('render-time')[0]
console.log(`Render took ${measure.duration}ms`)
```

### Chrome DevTools

- **Performance tab**: Record page load
- **Coverage tab**: Find unused code
- **Network tab**: Analyze bundle sizes
- **Lighthouse tab**: Run audits
