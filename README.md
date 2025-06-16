
# Premium Bio Website Open Source

- Live: [https://pandev00.sitehub.bio](https://pandev00.sitehub.bio)

- This is a new open-source project that marks the beginning of my real journey into affiliate marketing (AI saas, website services) that COMMITED TO SUCCESS.
My goal is simple: to help people with no coding skills canbuild better bio websites easily, free forever.

- NO MONTHLY FEE OR SETUP FEE NEEDED.

- A modern bio link application built with Next.js that supports dynamic configuration updates through Vercel Edge Config API, deploy on your own account with full ability for customizing and integrating.

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
  - Swipable carousel
  - Lightweight but powerful mini e-commerce module for creators and small sellers.

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
DOMAIN=your_domain_or_namespace
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
- **Products**: Showcase your products with images and pricing, user can see the detail product and do checkout (Stripe/Paypal/Bank Transfer)
- **Swipable carousel**: Display your favorite things in a swipable carousel

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


## 🤝 Contributing

We welcome all contributions to make this bio link app better!

Whether you're fixing bugs, adding new features, improving documentation, or suggesting ideas — **we'd love your help**.

### How to Contribute

1. 🍴 Fork the repo and clone it
2. 🌱 Create a new branch: `git checkout -b my-feature`
3. 🔧 Make your changes
4. ✅ Test everything thoroughly
5. 📬 Submit a pull request with a clear description of what you’ve done

### Suggestions & Issues

Have an idea or found a bug?
Open an [issue](https://github.com/LaBanHSPO/premium-bio-website/issues) — we’re always open to feedback and new perspectives.

### Contribution Ideas

* 🛠 Add new UI components or animations
* 🌐 Support for more social platforms
* 📦 Improve Edge Config structure or performance
* 🧪 Add tests for API endpoints or components
* 🌈 Theming and personalization improvements
* 💬 Localization / i18n support

---

> ⭐ **Every contribution counts — small or big.
> Let’s build an amazing open-source bio link platform together!**


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
