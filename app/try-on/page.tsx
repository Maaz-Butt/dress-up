"use client";

import { useState, useRef } from "react";
import { products, Product } from "@/lib/data";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function TryOnPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const initialProduct = products.find((p) => p.id === productId) || null;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialProduct,
  );
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userImage || !selectedProduct) return;

    setLoading(true);
    setGeneratedImage(null);
    setError(null);

    // Mock API call
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
        console.error("Failed to generate image");
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Virtual Try-On
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* User Image Upload */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                1. Upload Your Photo
              </h2>
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                {userImage ? (
                  <div className="relative h-64 w-full">
                    <Image
                      src={userImage}
                      alt="User uploaded"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <p>Click to upload an image of yourself</p>
                    <p className="text-sm mt-2">(Full body preferred)</p>
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                2. Select Product
              </h2>
              {selectedProduct ? (
                <div className="flex items-center space-x-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium dark:text-white">
                      {selectedProduct.name}
                    </h3>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="cursor-pointer border border-transparent hover:border-blue-500 rounded-md p-1"
                    >
                      <div className="relative w-full h-20">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!userImage || !selectedProduct || loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg transition ${
                !userImage || !selectedProduct || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg"
              }`}
            >
              {loading ? "Generating..." : "Generate Magic"}
            </button>
          </div>

          {/* Right Column: Result */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[500px]">
            <h2 className="text-xl font-semibold mb-4 dark:text-white w-full text-left">
              3. Result
            </h2>
            {loading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-64 w-64 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">
                  AI is dressing you up...
                </p>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-[500px]">
                <Image
                  src={generatedImage}
                  alt="Virtual Try-On Result"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center">
                {error ? (
                  <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
                    <p className="font-semibold">Generation Failed</p>
                    <p>{error}</p>
                  </div>
                ) : (
                  <p>Upload an image and select a product to see the magic!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
