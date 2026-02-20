"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Product, getProductId } from "@/lib/types";

function TryOnContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all products for the gallery
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);

          // If product ID is in URL, find it in the products list
          if (productId) {
            const initial = data.data.find(
              (p: Product) => getProductId(p) === productId,
            );
            if (initial) setSelectedProduct(initial);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products for try-on:", err);
      } finally {
        setFetchingProducts(false);
      }
    };
    fetchProducts();
  }, [productId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!userImage || !selectedProduct) return;

    setLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const response = await fetch("/api/try-on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage,
          productImage: selectedProduct.image,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.generatedImage);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to generate image");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center uppercase tracking-tight">
          Virtual <span className="text-neutral-500 italic">Try-On</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* User Image Upload */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 dark:text-neutral-400">
                1. Upload Your Photo
              </h2>
              <div
                className="group border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center cursor-pointer hover:border-black dark:hover:border-white transition-all bg-neutral-50 dark:bg-neutral-900/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {userImage ? (
                  <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-sm">
                    <Image
                      src={userImage}
                      alt="User uploaded"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-neutral-500 dark:text-neutral-500 py-10">
                    <p className="font-medium text-black dark:text-white mb-1">
                      Upload Portrait
                    </p>
                    <p className="text-xs uppercase tracking-tighter">
                      Full body view preferred for accuracy
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 dark:text-neutral-400">
                2. Select Product
              </h2>
              {selectedProduct ? (
                <div className="flex items-center space-x-4 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="relative w-20 h-28 shrink-0 bg-white dark:bg-neutral-800 rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-700">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-sm dark:text-white capitalize">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-xs font-bold text-black dark:text-white underline underline-offset-4 mt-2 hover:opacity-60 transition-opacity"
                    >
                      Change Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {fetchingProducts ? (
                    <div className="col-span-4 py-10 text-center text-xs text-neutral-500 italic">
                      Finding latest pieces...
                    </div>
                  ) : products.length === 0 ? (
                    <div className="col-span-4 py-10 text-center text-xs text-neutral-500">
                      No products available.
                    </div>
                  ) : (
                    products.map((product) => (
                      <div
                        key={getProductId(product)}
                        onClick={() => setSelectedProduct(product)}
                        className="group cursor-pointer relative aspect-3/4 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden border border-transparent hover:border-black dark:hover:border-white transition-all shadow-sm"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!userImage || !selectedProduct || loading}
              className={`w-full py-4 px-6 rounded-2xl text-white dark:text-black font-black text-sm uppercase tracking-widest transition-all shadow-xl ${
                !userImage || !selectedProduct || loading
                  ? "bg-neutral-300 dark:bg-neutral-700 cursor-not-allowed"
                  : "bg-black dark:bg-white hover:opacity-90 active:scale-[0.98]"
              }`}
            >
              {loading ? "Generating Outfit..." : "Generate Magic"}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center min-h-[500px]">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 dark:text-neutral-400 w-full text-left">
              3. Visual Confirmation
            </h2>
            {loading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-64 w-64 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-6 blur-2xl animate-pulse"></div>
                <p className="text-sm text-neutral-500 font-medium animate-bounce">
                  AI Tailoring in progress...
                </p>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-[550px] group">
                <Image
                  src={generatedImage}
                  alt="Virtual Try-On Result"
                  fill
                  className="object-contain rounded-xl"
                />
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = generatedImage;
                    link.download = "my-new-look.png";
                    link.click();
                  }}
                  className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-neutral-400 dark:text-neutral-500 text-center max-w-xs transition-all duration-700">
                {error ? (
                  <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <p className="text-red-500 font-bold text-sm uppercase mb-2">
                      Technical Fault
                    </p>
                    <p className="text-red-400 text-xs italic">{error}</p>
                    <button
                      onClick={handleGenerate}
                      className="mt-4 text-xs font-bold underline underline-offset-4 text-red-600 dark:text-red-400"
                    >
                      Retry Generation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-300"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Upload your picture and choose a style to visualize your
                      new look.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TryOnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Tailoring environment...
        </div>
      }
    >
      <TryOnContent />
    </Suspense>
  );
}
