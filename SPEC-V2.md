Context: We are upgrading the existing Sri Lanka Travel Agency web app. The client wants to add a "Custom Trip Builder" for foreigners who don't know exactly where to go and want a fully customized package. Do NOT change the existing design theme (GoFly style, clean, blue/white/amber).

Phase 1: Database Update
Update the schema.prisma file to include a new model called CustomTripRequest. It should include:

id (String or Int)

customerName (String)

customerEmail (String)

guestCount (Int)

durationDays (Int)

destinations (Json) - To store an array of selected destinations.

vehicleType (String) - Enum or String (Car, Mini Car, Van, Van Highroof, Bus).

needsAccommodation (Boolean) - Default false.

activitiesOfInterest (String) - Text area for custom requests.

status (String) - Default 'PENDING' (Can be PENDING, QUOTED, ACCEPTED).

quotedPrice (Decimal?) - Optional, for the admin to fill later.

createdAt (DateTime)
After updating the schema, run npx prisma db push or create a migration.

Phase 2: The Public "Custom Trip" Page (/custom-trip)
Create a new page at app/custom-trip/page.tsx.

UI Design: Use a clean, centered layout with a shadcn Card. It must match the existing site's typography and spacing.

The Form: Build a comprehensive form using react-hook-form and zod.

Fields required: Name, Email, Guest Count (Number input), Duration (Number input), Vehicle Type (shadcn Select with options: Car, Mini Car, Van, Van Highroof, Bus).

Destinations (Multi-Select): Create a multi-select field (you can use shadcn Command with badges) pre-loaded with popular Sri Lankan destinations (Colombo, Kandy, Ella, Sigiriya, Galle, Mirissa, Nuwara Eliya, Yala, Trincomalee, Anuradhapura). Allow multiple selections.

Accommodation: A simple shadcn Checkbox: "Do you want us to arrange your accommodation?" with a helper text explaining that we will calculate the cost and notify them.

Activities: A shadcn Textarea for "What kind of activities are you interested in? (e.g., Hiking, Wildlife Safari, Beach relaxing)".

Action: On submit, save this to the database using a Server Action and show a success message ("We will contact you shortly with a customized quote!").

Navigation: Link the "Custom Itinerary" text on the Home page Hero widget to this new /custom-trip page.

Phase 3: The Admin Integration (/admin/custom-requests)

Create a new page in the Admin panel to list these CustomTripRequests using a shadcn Table.

Show a badge for the status (Pending = Yellow, Quoted = Blue, Accepted = Green).

Add an "Action" button that opens a Dialog. Inside the Dialog, the admin can view all the user's requirements, type in a quotedPrice, and click "Send Quote" (which updates the database status to QUOTED and saves the price).

How this works for your business flow:
The Visitor: Goes to /custom-trip, selects 3 Guests, 7 Days, [Kandy, Ella, Galle], Van, Needs Accommodation, "We love hiking".

The System: Saves this as "PENDING" and you get it in your Admin Panel.

You (The Admin): You read the request, call your hotel contacts for Kandy/Ella/Galle, calculate the van cost, come up with a price (e.g., $1,200). You enter $1,200 in the Admin panel and update it to "QUOTED".

Next step (Later): Once this is built, you can easily add an email integration (like Resend or SendGrid) so that when you hit "Send Quote" in the admin panel, it automatically emails the customized itinerary and price directly to the customer.