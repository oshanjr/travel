# Project Specification: Travel Agency App (TiDB + Vercel)

## 1. Project Overview
A full-stack Travel Agency application with two portals:
1.  **Public Portal**: Customers browse packages, view details, and book.
2.  **Admin Panel**: Staff manage packages, view bookings, and update statuses.

## 2. Tech Stack
* **Framework**: Next.js 14+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **UI Library**: shadcn/ui (Radix UI based)
* **Database**: MySQL (Hosted on TiDB Cloud Serverless)
* **ORM**: Prisma
* **Auth**: Clerk (Next.js SDK)
* **State**: React Query (TanStack Query) for data fetching
* **Icons**: Lucide React

## 3. Database Schema (Prisma Models)

* **User** (Synced from Clerk via Webhook or verified on request):
    * `id` (String, @id, matches Clerk ID)
    * `email` (String, @unique)
    * `role` (Enum: USER, ADMIN, STAFF)
    * `createdAt` (DateTime @default(now()))

* **TravelPackage**:
    * `id` (Int @id @default(autoincrement()))
    * `title` (String)
    * `slug` (String @unique)
    * `description` (String @db.Text)
    * `price` (Decimal)
    * `durationDays` (Int)
    * `imageUrls` (Json) // Store array of strings
    * `isFeatured` (Boolean @default(false))
    * `availableDates` (Json) // Array of Date strings
    * `createdAt` (DateTime @default(now()))

* **Booking**:
    * `id` (Int @id @default(autoincrement()))
    * `userId` (String)
    * `packageId` (Int)
    * `status` (Enum: PENDING, CONFIRMED, CANCELLED, COMPLETED)
    * `totalAmount` (Decimal)
    * `travelDate` (DateTime)
    * `createdAt` (DateTime @default(now()))
    * *Relations: User, TravelPackage*

## 4. Implementation Phases

### Phase 1: Setup & Infrastructure
* Initialize Next.js app with TypeScript, Tailwind, ESLint.
* Install `shadcn-ui` and add core components: `button`, `input`, `card`, `table`, `dialog`, `sheet`, `form`, `select`, `badge`.
* Set up Prisma with MySQL provider.
* **Environment**: Configure `.env` for `DATABASE_URL` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.

### Phase 2: Authentication & Layouts
* Install `@clerk/nextjs`.
* Wrap app in `<ClerkProvider>`.
* Create `middleware.ts` to protect `/admin` routes (allow only users with specific metadata or email addresses).
* **Layouts**:
    * `(public)`: Standard Navbar (Logo, Links, UserButton).
    * `(admin)`: Sidebar layout (Dashboard, Packages, Bookings, Users).

### Phase 3: Admin Features (Protected)
* **Dashboard**: Stats cards (Total Revenue, Active Bookings).
* **Packages**:
    * Data Table with pagination.
    * "Add Package" Dialog/Page with form validation (Zod).
    * Server Action: `createPackage`, `updatePackage`, `deletePackage`.
* **Bookings**:
    * List view of all bookings with status badges.
    * Action to change status (e.g., Mark as Confirmed).

### Phase 4: Public Features
* **Home**: Hero section, "Featured Packages" grid.
* **Package Details**: `/packages/[slug]` page with gallery, info, and "Book Now" button.
* **Booking Flow**:
    * If not logged in -> Redirect to Sign In.
    * If logged in -> Show confirmation modal -> Create Booking record.
    * **User Dashboard**: `/my-bookings` showing their history.
