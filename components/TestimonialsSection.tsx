"use client";
import React from "react";
import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I absolutely love the quality of the clothes. The delivery was super fast too!",
      name: "Sarah Jenkins",
      title: "Fashion Blogger",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop",
    },
    {
      quote:
        "Dress Up has completely transformed my wardrobe. Highly recommended!",
      name: "Michael Chen",
      title: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop",
    },
    {
      quote:
        "The customer service is outstanding. They helped me find the perfect size.",
      name: "Emily Davis",
      title: "Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    },
  ];

  return (
    <div className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
