"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const CollectionCard = ({
  title,
  image,
  link,
  size,
}: {
  title: string;
  image: string;
  link: string;
  size?: "large" | "normal";
}) => {
  return (
    <Link
      href={link}
      className={`group relative overflow-hidden block ${size === "large" ? "md:col-span-2 md:row-span-2 aspect-4/5 md:aspect-auto" : "aspect-3/4"}`}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-6 left-6 z-20">
        <h3 className="text-white text-2xl font-serif italic mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-white/90 text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Explore <MoveRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
};

export function FeaturedGrid() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-neutral-900 dark:text-white mb-2">
              Curated Collections
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400">
              Handpicked styles for the modern individual.
            </p>
          </div>
          <Link
            href="/product/men"
            className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            View All Collections <MoveRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CollectionCard
            title="Urban Minimalism"
            image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
            link="/product/women"
            size="large"
          />
          <CollectionCard
            title="Evening Wear"
            image="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2648&auto=format&fit=crop"
            link="/product/women"
          />
          <CollectionCard
            title="Street Style"
            image="/street-style.webp"
            link="/product/men"
          />
          <CollectionCard
            title="Accessories"
            image="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2187&auto=format&fit=crop"
            link="/product/accessories"
          />
          <CollectionCard
            title="Summer Essentials"
            image="/summer-essential.jpg"
            link="/product/women"
          />
        </div>
      </div>
    </section>
  );
}
