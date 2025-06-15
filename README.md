# Bio Link App with Dynamic Configuration

A modern bio link application built with Next.js that supports dynamic configuration updates through Vercel Edge Config API.

## Features

- 🎨 Modern, responsive design
- 🔧 Dynamic configuration updates without redeployment
- 🔒 Secure admin panel with secret authentication
- 📱 Mobile-first design
- ⚡ Fast loading with Edge Config
- 🎯 Support for:
  - Profile information
  - Social links
  - Bio links
  - Products showcase
  - AI tools carousel

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Configure the following environment variables in `.env.local`:

```env
# Admin secret for form submission
ADMIN_SECRET=your_secure_admin_secret

# Vercel Edge Config settings
EDGE_CONFIG=your_edge_config_connection_string
EDGE_CONFIG_ID=your_edge_config_id
EDGE_CONFIG_TOKEN=your_vercel_api_token
```

### 3. Vercel Edge Config Setup

1. Create an Edge Config in your Vercel dashboard
2. Get your Edge Config ID and connection string
3. Generate a Vercel API token with Edge Config permissions
4. Add these values to your environment variables

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your bio page.

## Admin Panel

Access the admin panel at `/admin` to update your bio information dynamically.

### Admin Features

- **Profile Management**: Update name, tagline, avatar, and cover image
- **Social Links**: Add/edit/remove social media links
- **Bio Links**: Manage your bio links with descriptions and images
- **Products**: Showcase your products with images and pricing
- **AI Tools**: Display your favorite AI tools

### Security

- Admin panel is protected by a secret key
- All updates require authentication
- Data validation with Zod schemas

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The app will automatically use Edge Config for dynamic updates.

## API Endpoints

- `GET /api/config` - Fetch current bio configuration
- `POST /api/admin/update` - Update bio configuration (requires admin secret)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Configuration**: Vercel Edge Config
- **Animations**: Framer Motion

## License

MIT License - feel free to use this for your own bio page!

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/181cfc6e-f6f4-4037-b223-55da6edb3b1d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
