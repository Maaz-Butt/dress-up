import { ProductCard } from "@/components/ProductCard";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { Product as ProductType } from "@/lib/types";

async function getMenProducts(): Promise<ProductType[]> {
  try {
    await dbConnect();
    const products = await Product.find({ category: "men" }).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to load men's products:", error);
    return [];
  }
}

export default async function MenPage() {
  const menProducts = await getMenProducts();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 h-fit">
            <h1 className="text-4xl font-serif text-neutral-900 dark:text-white mb-8">
              Men
            </h1>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
                  Category
                </h3>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      All Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      Tops
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      Bottoms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      Outerwear
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-4">
                  Size
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="border border-neutral-200 dark:border-neutral-800 text-xs py-2 hover:border-black dark:hover:border-white transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <span className="text-sm text-neutral-500">
                {menProducts.length} Products
              </span>
              <div className="flex gap-4 text-sm font-medium">
                <button className="flex items-center gap-2 hover:text-black dark:hover:text-white">
                  Sort by: Featured
                </button>
              </div>
            </div>

            {menProducts.length === 0 ? (
              <p className="text-neutral-400 text-sm">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {menProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
