"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Package,
  TrendingUp,
  Users,
  ShoppingBag,
  MoreVertical,
  X,
  Loader2,
} from "lucide-react";
import { Product, getProductId } from "@/lib/types";
import Image from "next/image";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => getProductId(p) !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    setIsSaving(true);
    try {
      const isEditing = !!currentProduct._id;
      const url = isEditing
        ? `/api/products/${currentProduct._id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct),
      });

      if (res.ok) {
        await fetchProducts();
        setIsModalOpen(false);
        setCurrentProduct(null);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentProduct({
      name: "",
      price: 0,
      image: "",
      category: "men",
      description: "",
      sizes: ["XS", "S", "M", "L", "XL"],
    });
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 text-neutral-900 dark:text-white p-4 md:p-8">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Products",
            value: products.length,
            icon: Package,
            color: "bg-blue-500",
          },
          {
            label: "Men's Wear",
            value: products.filter((p) => p.category === "men").length,
            icon: ShoppingBag,
            color: "bg-purple-500",
          },
          {
            label: "Women's Wear",
            value: products.filter((p) => p.category === "women").length,
            icon: ShoppingBag,
            color: "bg-pink-500",
          },
          {
            label: "Total Space",
            value: "92%",
            icon: TrendingUp,
            color: "bg-green-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon
                  size={20}
                  className={stat.color.replace("bg-", "text-")}
                />
              </div>
              <span className="text-xs font-bold text-green-500">+12.5%</span>
            </div>
            <h3 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
              {stat.label}
            </h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Product Inventory</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Manage your storefront catalog and inventory levels.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all w-full md:w-64"
              />
            </div>
            <button
              onClick={async () => {
                if (
                  !confirm(
                    "This will clear the current database and restore original sample products. Continue?",
                  )
                )
                  return;
                try {
                  setIsSaving(true);
                  const res = await fetch("/api/seed", { method: "POST" });
                  if (res.ok) {
                    await fetchProducts();
                    alert("Database seeded successfully!");
                  }
                } catch (error) {
                  console.error("Error seeding database:", error);
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={isSaving}
              className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity border border-neutral-200 dark:border-neutral-700"
            >
              <TrendingUp size={18} />
              Seed Data
            </button>
            <button
              onClick={openAddModal}
              className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-neutral-400 mb-2"
                      size={32}
                    />
                    <p className="text-neutral-500">Loading inventory...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-20 text-center text-neutral-500"
                  >
                    No products found Matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={getProductId(product)}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{product.name}</p>
                          <p className="text-xs text-neutral-500 truncate max-w-[200px]">
                            {product.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          product.category === "men"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-sm">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        In Stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors text-neutral-600 dark:text-neutral-400"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(getProductId(product))}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/50">
              <h3 className="text-xl font-bold">
                {currentProduct?._id ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Product Name
                  </label>
                  <input
                    required
                    type="text"
                    value={currentProduct?.name || ""}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Classic Silk Blouse"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Price ($)
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={currentProduct?.price || 0}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="29.99"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Category
                  </label>
                  <select
                    value={currentProduct?.category || "men"}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  >
                    <option value="men">Men's Wear</option>
                    <option value="women">Women's Wear</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                    Image URL
                  </label>
                  <input
                    required
                    type="text"
                    value={currentProduct?.image || ""}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        image: e.target.value,
                      })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={currentProduct?.description || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Tell us about the product materials, fit, and style..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {isSaving ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : null}
                  {currentProduct?._id ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
