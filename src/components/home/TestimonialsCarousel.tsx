"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Tendai Moyo",
    role: "Operations Director",
    company: "Harare Logistics Group",
    quote:
      "Tyflex re-cabled our entire warehouse network and rolled out barcode scanning across three depots without a single day of downtime. Support has been rock solid ever since.",
    rating: 5,
  },
  {
    name: "Rutendo Chikafu",
    role: "IT Manager",
    company: "Zimbank Retail Division",
    quote:
      "The 3CX rollout cut our phone costs by more than half and gave every branch a proper call center. Their engineers actually understand how our business runs.",
    rating: 5,
  },
  {
    name: "Farai Ndlovu",
    role: "General Manager",
    company: "Cranborne Retail Group",
    quote:
      "We moved our tills, printers and POS terminals to Tyflex two years ago. Every install has been on time, and their 24/7 support line always picks up.",
    rating: 5,
  },
  {
    name: "Chipo Mutasa",
    role: "Finance Director",
    company: "Bluffhill Manufacturing",
    quote:
      "Their ERP implementation team took the time to understand our finance and inventory workflows before writing a single line of configuration. Genuinely impressive.",
    rating: 5,
  },
];

const AUTOPLAY_MS = 6000;

export default function TestimonialsCarousel() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const paginate = (dir: number) => {
    setState(([prev]) => [(prev + dir + testimonials.length) % testimonials.length, dir]);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [index]);

  const active = testimonials[index];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="relative min-h-[280px] sm:min-h-[240px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-white/5 bg-brand-card p-8 sm:p-10"
          >
            <Quote className="h-8 w-8 text-brand-red/70 mb-4" />
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6">
              &ldquo;{active.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-white">{active.name}</p>
                <p className="text-sm text-gray-400">
                  {active.role}, {active.company}
                </p>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-red text-brand-red" />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous testimonial"
          className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-brand-red/40 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-brand-red" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => paginate(1)}
          aria-label="Next testimonial"
          className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-brand-red/40 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
