"use client";
import React from "react";
import { NavbarButton } from "@/components/ui/resizable-navbar";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Image & Info */}
        <div className="lg:w-1/2 relative bg-neutral-900 flex flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=3388&auto=format&fit=crop"
              alt="Fashion Model"
              fill
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-neutral-300 max-w-md">
              We'd love to hear from you. Let's create something beautiful
              together.
            </p>
          </div>

          <div className="relative z-10 space-y-6 mt-12 lg:mt-0">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <IconMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-neutral-300">support@dressup.fashion</p>
                <p className="text-neutral-400 text-sm">
                  Response within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <IconPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-neutral-300">+1 (555) 123-4567</p>
                <p className="text-neutral-400 text-sm">
                  Mon-Fri, 9am - 6pm EST
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <IconMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Studio</h3>
                <p className="text-neutral-300">
                  123 Fashion Ave, Suite 400
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 bg-white dark:bg-neutral-950 p-8 lg:p-24 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="p-3 bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-primary outline-none transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="p-3 bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-primary outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-3 bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-primary outline-none transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="p-3 bg-neutral-50 dark:bg-neutral-900 border-b-2 border-neutral-200 dark:border-neutral-800 focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="pt-4">
                <NavbarButton
                  variant="primary"
                  className="w-full py-4 text-base"
                >
                  Send Message
                </NavbarButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section (Bottom) */}
      <div className="bg-neutral-50 dark:bg-neutral-900 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for all unused items in their original packaging.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. Shipping rates may vary.",
              },
              {
                q: "How can I track my order?",
                a: "Once your order ships, you will receive a tracking number via email.",
              },
              {
                q: "Are your clothes sustainable?",
                a: "We are committed to sustainability and use eco-friendly materials whenever possible.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-neutral-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
