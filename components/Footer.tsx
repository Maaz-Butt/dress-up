"use client";
import React from "react";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                Dress Up
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Your ultimate destination for contemporary fashion. Style tailored
              to you.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <IconBrandInstagram className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <IconBrandFacebook className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <IconBrandTwitter className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-neutral-600 hover:text-primary transition-colors"
              >
                <IconBrandYoutube className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/product/men"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/product/women"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-neutral-600 dark:text-neutral-400 hover:text-primary"
                >
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-8 text-center text-neutral-500 dark:text-neutral-400">
          <p>
            &copy; {new Date().getFullYear()} Dress Up. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
