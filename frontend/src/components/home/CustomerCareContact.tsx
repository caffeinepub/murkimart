import React from 'react';
import { Phone, PhoneCall, Headphones } from 'lucide-react';

export default function CustomerCareContact() {
  return (
    <section className="mx-4 my-4">
      {/* Banner container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange/80 shadow-lg">
        {/* Decorative background circles */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-brand-green/20 pointer-events-none" />
        <div className="absolute top-2 right-16 w-10 h-10 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 px-4 pt-4 pb-4">
          {/* Phone number display — moved to top */}
          <a
            href="tel:+917348050803"
            className="flex items-center justify-center gap-2 bg-white/15 rounded-xl py-2.5 mb-3 hover:bg-white/25 transition-colors active:scale-[0.98]"
          >
            <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-white text-xl font-extrabold tracking-wide">
              +91 73480 50803
            </span>
          </a>

          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest leading-none">
                  MurkiMart Support
                </p>
                <p className="text-white text-sm font-bold leading-tight mt-0.5">
                  Need Help? Call Us Now!
                </p>
              </div>
            </div>
            {/* Available badge */}
            <div className="flex items-center gap-1.5 bg-brand-green rounded-full px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-bold text-white">Live</span>
            </div>
          </div>

          {/* Primary CTA button */}
          <a
            href="tel:+917348050803"
            className="flex items-center justify-center gap-3 w-full bg-white rounded-xl py-3.5 shadow-md hover:bg-white/90 active:scale-[0.98] transition-all duration-150"
          >
            <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-brand-orange text-base font-extrabold tracking-tight">
              Tap to Call &amp; Order
            </span>
          </a>

          {/* Sub-text */}
          <p className="text-center text-white/70 text-xs mt-2.5 font-medium">
            Available 9 AM – 9 PM · Mon to Sat
          </p>
        </div>
      </div>
    </section>
  );
}
