# RealDots

RealDots is a modern Real Estate application converted to Next.js. It allows users to browse properties, find amenities, and explore the best homes.

## Features

- **Next.js App Router**: Modern and fast architecture for React.
- **MongoDB**: Used for fetching and storing dynamic property listings.
- **Responsive Design**: Beautiful interface using CSS and functional components.

## Getting Started

First, make sure to set up your `.env.local` file at the root of the project:

```bash
MONGODB_URI="your_mongodb_connection_string"
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Seeding Properties

Currently, you can use a tool like MongoDB Compass or the `/api/properties` POST endpoint to populate your database. The `Property` model requires the following main fields:
- `title`
- `description`
- `price`
- `location`
- `image` (URL, e.g. `/images/property-1.jpg`)
- `bedrooms`
- `bathrooms`
- `squareFt`

## Architecture

Converted from a static HTML template into a modular Next.js application, making use of Server Components and Client Components where appropriate.
