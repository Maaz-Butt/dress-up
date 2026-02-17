"use client";
import React from "react";
import Image from "next/image";
import { NavbarButton } from "./ui/resizable-navbar";

export function EditorialStory() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full md:w-1/2 relative h-[600px]">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-neutral-200 dark:border-neutral-800 z-0" />
            <div className="relative z-10 w-full h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=3464&auto=format&fit=crop"
                alt="Editorial"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-500 mb-6">
              The Story
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-neutral-900 dark:text-white mb-8">
              Sustainable Fashion for the Connoisseur
            </h3>
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                Fashion is more than just clothing; it's a statement of who you
                are and what you believe in. At Dress Up, we curate pieces that
                are not only timeless in design but ethical in their creation.
              </p>
              <p>
                Our commitment to sustainability implies that every stitch tells
                a story of craftsmanship, respect for the environment, and
                dedication to quality.
              </p>
            </div>
            <div className="mt-10">
              <NavbarButton
                variant="dark"
                className="px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold"
              >
                Read Our Manifesto
              </NavbarButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
