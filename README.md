# Nextaar - Next.js Application with Payload CMS and PostgreSQL

A modern, multilingual web application built with Next.js 15, Payload CMS, and PostgreSQL.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Docker** and **Docker Compose** (for PostgreSQL database)
- **Git** (for version control)

## Tech Stack

- **Frontend**: Next.js 15.2.4 with React 19
- **CMS**: Payload CMS 3.54.0
- **Database**: PostgreSQL 16 (Alpine)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Animations**: Framer Motion, GSAP
- **Language Support**: English, Persian (Farsi), Arabic

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Nextaar
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URI=postgresql://nextaar:nextaar@localhost:5432/nextaar

# Payload CMS Secret (generate a secure random string)
PAYLOAD_SECRET=your-secret-key-here-min-32-chars

# Next.js Configuration
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional: Payload Cloud (if using)
PAYLOAD_CLOUD=false
```

**Important Security Notes:**
- Generate a secure `PAYLOAD_SECRET` with at least 32 characters
- Never commit `.env.local` to version control
- Use strong passwords in production

### 4. Start PostgreSQL with Docker

Start the PostgreSQL database using Docker Compose:

```bash
# Start PostgreSQL in the background
docker-compose up -d

# Verify the database is running
docker ps

# Check database logs (optional)
docker-compose logs postgres
```

The PostgreSQL database will be available at:
- **Host**: localhost
- **Port**: 5432
- **Database**: nextaar
- **Username**: nextaar
- **Password**: nextaar

### 5. Initialize Payload CMS

On first run, Payload CMS will automatically:
1. Create necessary database tables
2. Set up the admin interface
3. Configure collections (Users, Media, Posts, Categories, Portfolio)

### 6. Run the Development Server

```bash
# Using pnpm (with Turbopack for faster builds)
pnpm dev

# Or using npm
npm run dev
```

The application will be available at:
- **Application**: http://localhost:3000
- **Payload Admin**: http://localhost:3000/admin

### 7. Create Admin User

On first visit to `/admin`, you'll be prompted to create an admin user. This will be your login for the Payload CMS dashboard.

## Project Structure

```
Nextaar/
├── app/                    # Next.js app directory
│   ├── (app)/             # Public-facing routes
│   │   └── [locale]/      # Internationalized routes
│   │       ├── about/
│   │       ├── blog/
│   │       ├── contact/
│   │       ├── portfolio/
│   │       └── services/
│   ├── (payload)/         # Payload CMS routes
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # API endpoints
├── collections/           # Payload CMS collections
│   ├── Media.ts
│   ├── Posts.ts
│   └── Users.ts
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
├── docker-compose.yml     # Docker configuration
├── payload.config.ts      # Payload CMS configuration
└── next.config.mjs        # Next.js configuration
```

## Available Scripts

```bash
# Development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Docker Management

### Common Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: Deletes all data)
docker-compose down -v

# View logs
docker-compose logs -f postgres

# Access PostgreSQL shell
docker exec -it nextaar-postgres psql -U nextaar -d nextaar

# Backup database
docker exec nextaar-postgres pg_dump -U nextaar nextaar > backup.sql

# Restore database
docker exec -i nextaar-postgres psql -U nextaar nextaar < backup.sql
```

## Features

### Multilingual Support
- English (default)
- Persian (Farsi) with RTL support
- Arabic with RTL support

### Content Management
- **Posts**: Blog articles with rich text editing
- **Media**: Image and file management
- **Users**: User authentication and management

### UI Components
- Fully responsive design
- Dark/Light mode support
- Radix UI components
- Smooth animations with Framer Motion and GSAP

## Production Deployment

### Environment Variables for Production

```env
# Production Database (use a secure connection string)
DATABASE_URI=postgresql://username:password@your-db-host:5432/database

# Strong secret key (generate with: openssl rand -base64 32)
PAYLOAD_SECRET=your-production-secret-key

# Your production URL
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# Enable Payload Cloud (optional)
PAYLOAD_CLOUD=true
```

### Build and Deploy

1. **Build the application:**
   ```bash
   pnpm build
   ```

2. **Start the production server:**
   ```bash
   pnpm start
   ```

### Docker Production Setup

For production, update `docker-compose.yml` with:
- Strong passwords
- Volume backups
- Network security
- SSL/TLS configuration

## Troubleshooting

### Database Connection Issues
- Ensure Docker is running: `docker ps`
- Check database logs: `docker-compose logs postgres`
- Verify DATABASE_URI in `.env.local`

### Port Conflicts
- If port 5432 is in use, modify `docker-compose.yml`
- If port 3000 is in use, run: `pnpm dev -- -p 3001`

### Payload CMS Issues
- Clear Next.js cache: `rm -rf .next`
- Regenerate types: Check `payload-types.ts` is generated
- Verify PAYLOAD_SECRET is set

### Module Not Found Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Clear pnpm cache: `pnpm store prune`

## Development Tips

1. **Hot Reload**: The development server supports hot module replacement
2. **TypeScript**: Full TypeScript support with generated Payload types
3. **API Routes**: Access Payload API at `/api/[collection]`
4. **GraphQL**: GraphQL playground available at `/api/graphql-playground`

## Security Considerations

- Always use strong passwords in production
- Keep `PAYLOAD_SECRET` secure and never expose it
- Use HTTPS in production
- Regularly update dependencies
- Configure proper CORS settings for production
- Enable rate limiting for API endpoints

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Your License Here]

## Support

For issues or questions, please open an issue in the repository.