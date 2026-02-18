# Project Specification: Sri Lankan Travel Agency Platform

## 1. Visual Identity & UI Guidelines (Strict)
* **Design Reference**: mimic the clean, white-space dominant style of the "GoFly" theme.
* **Color Palette**:
    * Primary Blue: `#1D4ED8` (buttons, active tabs, "Book Now").
    * Secondary Yellow/Orange: `#F59E0B` (for "Sale on!", "Featured", and icon accents).
    * Backgrounds: White `#FFFFFF` for main content, Light Gray `#F3F4F6` for alternate sections (like Testimonials).
* **Typography**: Sans-serif, modern (Inter or Poppins).
* **Components**: Use `shadcn/ui` for everything.
    * *Hero Section*: Large background image, overlay text, and a **floating white card** for the Search Widget (Tabbed interface: "Tours", "Hotels", "Visa").
    * *Cards*: Rounded corners (xl), subtle shadows, image on top, price and "Book Now" at bottom.

## 2. Tech Stack
* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS + `shadcn/ui` + `lucide-react` icons.
* **Database**: MySQL (Hosted on TiDB Cloud).
* **ORM**: Prisma.
* **Auth**: **Auth.js (NextAuth v5)**.
    * *User Portal*: Email/Password or Google Provider.
    * *Admin Portal*: Credentials flow. **Strict Rule**: No public sign-up for Admins. Admins are created only by the Super Admin via database seeding or the Admin Panel.

## 3. Database Schema (Prisma)
* **User**: `id`, `name`, `email`, `password` (hashed), `role` (USER, ADMIN, SUPER_ADMIN), `phone`.
* **SiteConfig**: (For Admin to update text/images dynamically)
    * `key` (String, unique - e.g., "hero_title"), `value` (Text), `type` (TEXT, IMAGE_URL).
* **Package**: `id`, `title`, `slug`, `price`, `discountPrice`, `duration`, `location`, `images` (JSON), `itinerary` (JSON), `inclusions` (JSON), `isFeatured`.
* **Booking**: `id`, `userId`, `packageId`, `status` (PENDING, CONFIRMED, COMPLETED), `totalAmount`, `paymentStatus`.
* **Inquiry**: `id`, `name`, `phone`, `message`, `type` (General, CustomPackage).

## 4. Key Features & Implementation Phases

### Phase 1: Core Setup & CMS (Admin Control)
* **Dynamic Content**: The text on the Home Page (Hero Title, "Why Choose Us" text) must be fetched from the `SiteConfig` table, not hardcoded.
* **Admin Panel**:
    * **Dashboard**: Stats (Revenue, New Bookings).
    * **CMS Section**: A table to edit `SiteConfig` values (Update Hero Image, Change Welcome Text).
    * **Package Manager**: CRUD for Travel Packages.
    * **Admin Management**: Super Admin can create new Admin users.

### Phase 2: The Public "GoFly" UI
* **Hero Search Widget**:
    * Tabs for "Tours", "Hotels", "Visa".
    * Inputs: Destination (Combobox), Activity Type, Date Picker.
* **Sections**:
    * *Featured Destinations*: Horizontal scroll/carousel of circular or rounded images (Sri Lankan locations like Sigiriya, Ella, Galle).
    * *Popular Packages*: 3-column grid. Cards show "Sale" badges.
    * *Why Choose Us*: 3 icons with text (Local Guidance, Deals, Safety).
    * *Testimonials*: Carousel of user reviews.
    * *FAQ Accordion*: Collapsible questions.
* **Footer**: Links, Newsletter signup, Payment icons.

### Phase 3: Booking Engine
* **Package Detail Page**: Large Hero image, distinct "Overview", "Itinerary", and "Inclusions" tabs.
* **Booking Form**: Sticky sidebar on desktop. collects distinct passenger details.