// Shared product type used across the frontend
// Compatible with both MongoDB documents (_id) and the legacy static data (id)
export interface Product {
    _id?: string;
    id?: string;
    name: string;
    price: number;
    image: string;
    category: "men" | "women";
    description?: string;
    sizes?: string[];
    inStock?: boolean;
}

// Helper to get the product ID regardless of source
export function getProductId(product: Product): string {
    return (product._id ?? product.id) as string;
}
