Here is the content for the SPEC-v2.md file. You can copy the text below directly.

Project Specification: Sri Lanka Travel Agency (Recovery & Polish)
1. Visual Identity & UI Standards (The "GoFly" Look)
Theme: Clean, modern, trustworthy. Mimics the "GoFly" aesthetic with ample white space and rounded corners.

Colors:

Primary Blue: #0EA5E9 (Sky Blue 500) - Used for primary buttons, active states, and links.

Secondary Amber: #F59E0B (Amber 500) - Used for "Sale" tags, star ratings, and accents.

Text: #0F172A (Slate 900) for Headings, #64748B (Slate 500) for body text.

Backgrounds: White #FFFFFF for main cards, #F8FAFC (Slate 50) for alternate sections.

Typography:

Headings: Poppins (Bold/SemiBold).

Body: Inter (Regular/Medium).

Layout Rules:

Containers: ALL page content (except full-width Hero) must be inside a container mx-auto px-4 md:px-6 wrapper.

Spacing: Sections must be vertically separated by py-16 or py-20.

Cards: Must use shadow-lg, rounded-xl, overflow-hidden, and border border-slate-100.

Images: MUST use aspect-[4/3] or aspect-video with object-cover to prevent layout shifts.

2. Core Pages & Routing
/ (Home):

Hero: Full-width background image (Sri Lankan beach/nature) with a dark overlay (bg-black/40).

Search Widget: A floating card overlapping the bottom of the Hero. Contains Tabs for "Tours", "Hotels", "Visa".

Featured Destinations: A horizontal scroll/carousel of circular or rounded location images.

Popular Packages: A 3-column grid of package cards.

/packages (List): A grid of all available packages with a sidebar for filtering (Price, Duration, Location).

/packages/[slug] (Detail): CRITICAL MISSING PAGE.

Hero: 50vh height image header.

Content: Tabs for "Overview", "Itinerary" (Vertical Timeline), "Inclusions".

Booking Sidebar: Sticky card with Price, Date Picker, and "Book Now" button.

/destinations: A clean grid of locations (Sigiriya, Ella, Kandy, etc.).

/contact: Simple contact form + Map placeholder.

/admin: (Protected) Dashboard, Bookings Table, CMS Editor (SiteConfig), Package Management.

3. Database & Data Integrity (Prisma)
Images: All seed data MUST use high-quality Unsplash Source URLs. NO placeholders.

SiteConfig: Dynamic content for the Home Page (Hero Title, Hero Image) is fetched from the SiteConfig table.

Auth: NextAuth v5 (Credentials).

Super Admin: Seeded via script (admin@travel.lk).

Regular Admins: Created only by Super Admin.

Customers: Sign up via Email/Password or Google.

4. Components (shadcn/ui)
Required: Button, Card, Carousel, Tabs, Dialog, Input, Select, Textarea, Form, Calendar, Popover, Sheet (Mobile Menu), Table (Admin), Badge (Status).

Icons: lucide-react for all UI icons.

5. Deployment Prep
Config: next.config.js must allow images from images.unsplash.com.

Loading: loading.tsx must be present for root and admin layouts.

Error: error.tsx must be present to handle crashes gracefully.