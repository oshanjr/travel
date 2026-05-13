"use client";

import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    date: "2 weeks ago",
    avatar: "S",
    avatarColor: "bg-pink-600",
    text: "Absolutely incredible experience! The curated tour was flawless, and our guide was so knowledgeable about the local culture. Exploring the tea estates in Nuwara Eliya was a dream come true.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mark O'Connor",
    date: "1 month ago",
    avatar: "M",
    avatarColor: "bg-amber-600",
    text: "A&S Pearl Lanka Tours organized the perfect family vacation. We saw elephants in Yala and spent amazing days on the southern beaches. Their attention to detail and customer service is unmatched.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rostova",
    date: "3 months ago",
    avatar: "E",
    avatarColor: "bg-stone-600",
    text: "A magical journey through Sri Lanka. The hike up Adam's Peak was challenging but the sunrise made it worth every step. Highly recommend their services for anyone visiting.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    date: "4 months ago",
    avatar: "D",
    avatarColor: "bg-amber-600",
    text: "Everything was perfectly arranged. The hotels were top-notch and transportation was always on time. If you want a stress-free trip to Sri Lanka, this is the company to go with.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emma Wilson",
    date: "5 months ago",
    avatar: "E",
    avatarColor: "bg-purple-600",
    text: "We booked our honeymoon with them and it was spectacular. The private villa in Galle and the romantic dinner on the beach were unforgettable. Thank you for the memories!",
    rating: 5,
  },
];

export function GoogleReviews() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Google Logo / Icon representation */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-950 font-serif mb-3">
            What Our Travelers Say
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">5.0</span>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-stone-500">Based on Google Reviews</p>
        </div>

        <div className="max-w-6xl mx-auto relative px-4 md:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {REVIEWS.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${review.avatarColor}`}
                      >
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="ml-auto w-5 h-5 flex items-center justify-center">
                        {/* Small Google icon */}
                        <svg viewBox="0 0 24 24" className="w-4 h-4 opacity-70">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-3 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      "{review.text}"
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white text-stone-950 border-stone-200 hover:bg-stone-50 hover:text-stone-700" />
            <CarouselNext className="hidden md:flex -right-12 bg-white text-stone-950 border-stone-200 hover:bg-stone-50 hover:text-stone-700" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
