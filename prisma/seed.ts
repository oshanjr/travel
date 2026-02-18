import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Clear existing data
    await prisma.booking.deleteMany();
    await prisma.package.deleteMany();
    await prisma.siteConfig.deleteMany();
    await prisma.user.deleteMany();
    await prisma.inquiry.deleteMany();

    console.log('Cleared existing data.');

    // 2. Create Super Admin
    const password = await hash('password123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@travel.lk',
            name: 'Super Admin',
            password,
            role: 'SUPER_ADMIN',
        },
    });
    console.log('Created Super Admin:', admin.email);

    // 3. Seed SiteConfig (Hero Section)
    await prisma.siteConfig.createMany({
        data: [
            { key: 'hero_title', value: 'Discover the Wondrous Sri Lanka', type: 'TEXT' },
            { key: 'hero_image', value: 'https://images.unsplash.com/photo-1586861635167-e5223aeb4228?auto=format&fit=crop&w=1920', type: 'IMAGE_URL' },
            { key: 'hero_subtitle', value: 'Experience the pearl of the Indian Ocean with our curated journeys.', type: 'TEXT' },
        ],
    });
    console.log('Seeded SiteConfig.');

    // 4. Seed Packages
    const packages = [
        {
            title: 'Sigiriya Rock Fortress Tour',
            slug: 'sigiriya-rock-fortress',
            price: 150.00,
            duration: '1 Day',
            location: 'Sigiriya',
            images: [
                'https://images.unsplash.com/photo-1580882583849-c96769e6931a?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=800'
            ],
            itinerary: [
                { day: 1, title: 'Climb the Lion Rock', description: 'Visit the ancient palace fortress built by King Kashyapa.' }
            ],
            inclusions: ['Entrance Fees', 'Lunch', 'Guide'],
            isFeatured: true,
        },
        {
            title: 'Ella Scenic Train Journey',
            slug: 'ella-train-journey',
            price: 220.00,
            duration: '2 Days / 1 Night',
            location: 'Ella',
            images: [
                'https://images.unsplash.com/photo-1588258524675-c637c3588975?auto=format&fit=crop&w=800', // Note: specific URL from prompt
                'https://images.unsplash.com/photo-1560662131-77884d5f4702?auto=format&fit=crop&w=800'
            ],
            itinerary: [
                { day: 1, title: 'Nine Arch Bridge', description: 'Visit the famous bridge and watch the train pass.' },
                { day: 2, title: 'Little Adams Peak', description: 'Morning hike for a stunning sunrise.' }
            ],
            inclusions: ['Train Tickets', 'Accommodation', 'Breakfast'],
            isFeatured: true,
        },
        {
            title: 'Mirissa Whale Watching',
            slug: 'mirissa-whale-watching',
            price: 180.00,
            duration: '2 Days',
            location: 'Mirissa',
            images: [
                'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=800'
            ],
            itinerary: [
                { day: 1, title: 'Beach Relaxation', description: 'Enjoy the sunset at Mirissa beach.' },
                { day: 2, title: 'Whale Watching', description: 'Early morning boat ride to see Blue Whales.' }
            ],
            inclusions: ['Boat Ride', 'Hotel Transfer', 'Breakfast'],
            isFeatured: true,
        },
        {
            title: 'Kandy Cultural Tour',
            slug: 'kandy-cultural-tour',
            price: 130.00,
            duration: '1 Day',
            location: 'Kandy',
            images: [
                'https://images.unsplash.com/photo-1588669527299-b9ee03222e23?auto=format&fit=crop&w=800',
                'https://images.unsplash.com/photo-1625757783935-d2274488b39c?auto=format&fit=crop&w=800'
            ],
            itinerary: [
                { day: 1, title: 'Temple of the Tooth', description: 'Visit the sacred Sri Dalada Maligawa.' },
                { day: 1, title: 'Peradeniya Gardens', description: 'Walk through the Royal Botanical Gardens.' }
            ],
            inclusions: ['Entrance Fees', 'Lunch', 'Guide'],
            isFeatured: true,
        },
        {
            title: 'Galle Fort & Coastal History',
            slug: 'galle-fort-history',
            price: 160.00,
            duration: '1 Day',
            location: 'Galle',
            images: [
                'https://images.unsplash.com/photo-1578564969242-70678d3805ba?q=80&w=2072&auto=format&fit=crop', // Galle image from carousel
                'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800'
            ],
            itinerary: [
                { day: 1, title: 'Galle Dutch Fort', description: 'Explore the UNESCO World Heritage site.' }
            ],
            inclusions: ['Guide', 'Lunch', 'Transport'],
            isFeatured: false,
        },
    ];

    for (const pkg of packages) {
        await prisma.package.create({
            data: pkg,
        });
    }
    console.log(`Seeded ${packages.length} packages.`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
