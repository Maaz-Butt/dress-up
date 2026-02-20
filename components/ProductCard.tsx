"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, getProductId } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const id = getProductId(product);

  return (
    <div className="group relative">
      <div className="aspect-3/4 w-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Overlay with Action */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-white/90 dark:bg-black/90 backdrop-blur-sm z-10 flex flex-col gap-2">
          <Link
            href={`/try-on?product=${id}`}
            className="w-full py-3 bg-black dark:bg-white text-white dark:text-black text-center text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
          >
            Try On
          </Link>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-neutral-900 dark:text-white group-hover:underline decoration-1 underline-offset-4">
            <Link href={`/try-on?product=${id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-medium text-neutral-900 dark:text-white">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
