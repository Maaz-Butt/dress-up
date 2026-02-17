import React from "react";
import { IconBulb, IconHeart, IconRocket } from "@tabler/icons-react";

export default function AboutPage() {
  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries to bring you the latest styles.",
      icon: <IconBulb className="w-6 h-6 text-primary" />,
    },
    {
      title: "Passion",
      description: "We love what we do and it shows in our collections.",
      icon: <IconHeart className="w-6 h-6 text-primary" />,
    },
    {
      title: "Growth",
      description: "We are always learning and evolving to serve you better.",
      icon: <IconRocket className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="w-full relative overflow-hidden min-h-screen bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <div className="w-full h-[400px] relative flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-neutral-800 dark:text-neutral-200 z-10">
          About Dress Up
        </h1>
        <div className="absolute inset-0 bg-grid-black/[0.1] dark:bg-grid-white/[0.1] mask-image-b-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
              At <span className="font-bold text-primary">Dress Up</span>, our
              mission is simple: to empower individuals to express their unique
              identity through fashion. We believe that everyone deserves to
              look and feel their best, regardless of their budget or body type.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We are dedicated to sustainable practices, ethical sourcing, and
              creating a community where style meets conscience.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=3540&auto=format&fit=crop"
              alt="Team working"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 rounded-full mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-primary/5 rounded-3xl">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Join the Movement
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
            Follow us on social media and be part of our growing fashion
            community.
          </p>
        </div>
      </div>
    </div>
  );
}
