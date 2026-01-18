# Code Standards & Project Structure

**Last Updated**: 2026-01-18 | **Version**: 1.0

## Codebase Structure

```
premium-bio-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout wrapper
│   │   ├── page.tsx                  # Home/bio page
│   │   ├── not-found.tsx             # 404 page
│   │   ├── providers.tsx             # Global providers (React Context)
│   │   ├── admin/                    # Admin panel pages
│   │   │   └── page.tsx              # Admin dashboard
│   │   └── api/                      # API routes
│   │       ├── config/               # GET /api/config
│   │       └── admin/                # Admin operations
│   │           ├── update/           # POST /api/admin/update
│   │           ├── import/           # POST /api/admin/import
│   │           └── export/           # GET /api/admin/export
│   ├── components/
│   │   ├── ui/                       # shadcn/ui + Radix UI components
│   │   │   └── *.tsx                 # Reusable UI components
│   │   ├── AIToolsCarousel.tsx       # AI tools showcase carousel
│   │   ├── HeroSection.tsx           # Landing hero section
│   │   ├── LinkPill.tsx              # Bio link display component
│   │   ├── ProductCard.tsx           # Product showcase card
│   │   ├── SegmentSwitch.tsx         # UI segment switcher
│   │   ├── ShopPreviewCard.tsx       # Shop preview
│   │   ├── ShopSection.tsx           # Shop display section
│   │   └── *.tsx                     # Feature-specific components
│   ├── data/                         # Data definitions and constants
│   │   ├── links.ts                  # Sample bio links
│   │   ├── products.ts               # Sample products
│   │   ├── profile.ts                # Sample profile data
│   │   └── tools.ts                  # AI tools catalog
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-mobile.tsx            # Mobile detection hook
│   │   └── use-toast.ts              # Toast notification hook
│   ├── lib/                          # Utility functions and types
│   │   ├── types.ts                  # Shared TypeScript types
│   │   └── utils.ts                  # Helper functions
│   └── globals.css                   # Global Tailwind CSS
├── public/                           # Static assets
│   ├── avatar.jpg                    # Default avatar
│   ├── favicon.ico                   # Site icon
│   ├── robots.txt                    # SEO robots
│   └── placeholder.svg               # Placeholder images
├── .dev.vars                         # Local dev secrets (NOT COMMITTED)
├── wrangler.toml                     # Cloudflare Pages configuration
├── next.config.js                    # Next.js configuration (static export)
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.js                 # PostCSS configuration
├── components.json                   # shadcn/ui component registry
├── package.json                      # Dependencies and scripts
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore rules
└── README.md                         # Project overview
```

## File Naming Conventions

### TypeScript/React Files
- **Components**: PascalCase (e.g., `ProfileCard.tsx`, `AdminPanel.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMobile.tsx`, `useToast.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Types**: PascalCase (e.g., `types.ts`, `models.ts`)

### API Routes
- **Endpoints**: kebab-case in paths (e.g., `/api/config`, `/api/admin/update`)
- **Files**: Match endpoint structure

### Styling
- **CSS Classes**: kebab-case (e.g., `.hero-section`, `.admin-panel`)
- **Tailwind utility usage**: Inline in JSX

## Code Style Guidelines

### TypeScript Best Practices

```typescript
// DO: Use explicit type annotations for public APIs
export interface BioConfig {
  profile: ProfileData;
  links: BioLink[];
  products: Product[];
}

// DO: Use const for immutable data
const DEFAULT_TIMEOUT = 5000;

// AVOID: Any type usage, use union types or generics
// DO: Type-safe error handling
try {
  // operation
} catch (error) {
  if (error instanceof SpecificError) {
    // handle
  }
}
```

### React Component Patterns

```typescript
// DO: Use functional components with hooks
export function ProfileCard({ data }: { data: ProfileData }) {
  return <div className="profile-card">{data.name}</div>;
}

// DO: Extract complex logic into custom hooks
function useProfileData(domain: string) {
  const [data, setData] = useState<ProfileData | null>(null);
  useEffect(() => {
    fetchProfile(domain).then(setData);
  }, [domain]);
  return data;
}

// DO: Use proper prop typing
interface ProfileCardProps {
  data: ProfileData;
  onUpdate?: (data: ProfileData) => void;
}

// AVOID: prop drilling, use Context API for global state
```

### Form Handling

```typescript
// DO: Use React Hook Form + Zod for validation
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ProfileSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
  });

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* */}</form>;
}
```

### Error Handling

```typescript
// DO: Implement proper error boundaries
export class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    return this.props.children;
  }
}

// DO: Use try-catch in async operations
async function updateConfig(config: BioConfig) {
  try {
    const response = await fetch('/api/admin/update', {
      method: 'POST',
      body: JSON.stringify(config),
    });
    if (!response.ok) throw new Error('Update failed');
    return await response.json();
  } catch (error) {
    console.error('Config update error:', error);
    throw error;
  }
}
```

## Styling Standards

### Tailwind CSS Usage

```typescript
// DO: Use Tailwind classes for styling
<div className="flex items-center justify-between gap-4 p-4 rounded-lg border bg-white">
  {/* content */}
</div>

// DO: Extract complex styles into components
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      {children}
    </div>
  );
}

// AVOID: Inline styles unless necessary
// AVOID: CSS-in-JS for simple utility-based styling
```

### Responsive Design

```typescript
// DO: Use Tailwind breakpoints
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>
```

## API Design

### Endpoint Conventions

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/config` | Fetch bio configuration | No |
| POST | `/api/admin/update` | Update configuration | Yes (ADMIN_SECRET) |
| POST | `/api/admin/import` | Import bio data | Yes (ADMIN_SECRET) |
| GET | `/api/admin/export` | Export bio data | Yes (ADMIN_SECRET) |

### Response Format

```json
{
  "success": true,
  "data": { /* actual data */ },
  "error": null
}
```

### Error Responses

```json
{
  "success": false,
  "data": null,
  "error": "Descriptive error message"
}
```

## Environment Variables

### Development (.env.local or .dev.vars)

```env
# Admin Authentication
ADMIN_SECRET=your_secure_secret_here

# Domain Configuration
DOMAIN=localhost

# Environment
NODE_ENV=development
```

### Production (Cloudflare Dashboard)

```env
ADMIN_SECRET=<production_secret>
DOMAIN=<your_domain>
NODE_ENV=production
```

## Configuration Files

### wrangler.toml
Cloudflare Pages configuration with bindings for D1 (database), KV (cache), and R2 (storage).

**Current Status**: Basic setup complete with placeholder comments for future bindings.

### next.config.js
- `output: 'export'` - Static export for Cloudflare Pages compatibility
- `typescript.ignoreBuildErrors: true` - Type checking skipped during build (use `tsc` separately)
- `eslint.ignoreDuringBuilds: true` - ESLint skipped during build
- Remote image patterns configured for Unsplash and Cloudinary

## Testing Standards

### Unit Tests
- Location: Co-located with source files as `*.test.ts(x)`
- Framework: Jest or Vitest
- Coverage target: > 80% for critical paths
- Pattern: Given-When-Then (BDD style)

### Integration Tests
- Location: `__tests__` directory
- Test API endpoints with real database/storage
- Test component interactions

### E2E Tests
- Tools: Playwright or Cypress
- Scenarios: Admin workflows, data migration, checkout flow

## Build & Deployment

### Build Process
```bash
npm run build    # Compiles Next.js, generates static export in ./out
```

### Local Development
```bash
npm run dev      # Next.js dev server on http://localhost:3000
npx wrangler pages dev ./out  # Cloudflare Pages emulation on http://localhost:8788
```

### Production Deployment
```bash
# Via Cloudflare Pages (automatic on git push to main)
# Manual deployment:
wrangler pages deploy ./out
```

## Performance Guidelines

### Optimization Checklist
- [ ] Images: Use Next.js Image component or Cloudflare Image Optimization
- [ ] Code splitting: Lazy load heavy components
- [ ] Bundling: Monitor bundle size with `next/bundle-analyzer`
- [ ] Caching: Configure cache headers for static assets
- [ ] Database: Use indexes, avoid N+1 queries

### Monitoring
- CDN cache hit ratio
- API response times
- Build times
- Deployment frequency

## Security Standards

### Authentication
- Admin operations require `ADMIN_SECRET` header validation
- Secrets never exposed in client-side code
- Environment variables validated at startup

### Data Protection
- Validation with Zod schemas for all inputs
- CSRF protection via SameSite cookies
- XSS prevention through React's automatic escaping
- Rate limiting on admin endpoints

### Secrets Management
- Never commit `.env.local`, `.dev.vars`, or API keys
- Use `.gitignore` patterns for sensitive files
- Rotate secrets regularly
- Audit secret access via Cloudflare dashboard

## Version Management

**Current Version**: 1.0.0

- **Breaking Changes**: Major version bump (1.0.0 → 2.0.0)
- **Features**: Minor version bump (1.0.0 → 1.1.0)
- **Fixes**: Patch version bump (1.0.0 → 1.0.1)

See `release-manifest.json` for release history.

---

## Enforcement

- **Linting**: Run eslint before commits (optional, not enforced during build)
- **Type Safety**: Use `tsc --noEmit` for type checking
- **Testing**: Required for critical paths before merging
- **Code Review**: All PRs require review before merge
