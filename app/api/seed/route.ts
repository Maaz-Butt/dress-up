import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";

// Your existing static product data — used for the initial seed
const initialProducts = [
    {
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "/Classic White T-Shirt.webp",
        category: "men",
        description: "A timeless classic white t-shirt for everyday wear.",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
    },
    {
        name: "Denim Jacket",
        price: 89.99,
        image:
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        category: "men",
        description: "A rugged and stylish denim jacket perfect for layering.",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
    },
    {
        name: "Summer Floral Dress",
        price: 59.99,
        image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=746&q=80",
        category: "women",
        description: "A beautiful floral dress perfect for summer days.",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
    },
    {
        name: "Leather Boots",
        price: 120.0,
        image:
            "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        category: "men",
        description: "Premium leather boots built for style and durability.",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
    },
    {
        name: "Elegant Evening Gown",
        price: 150.0,
        image:
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=783&q=80",
        category: "women",
        description: "An elegant evening gown for special occasions.",
        sizes: ["XS", "S", "M", "L"],
        inStock: true,
    },
    {
        name: "Casual Chinos",
        price: 45.0,
        image:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
        category: "men",
        description: "Comfortable casual chinos ideal for everyday wear.",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
    },
    {
        name: "Silk Blouse",
        price: 75.0,
        image:
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1372&q=80",
        category: "women",
        description: "A luxurious silk blouse for a refined, polished look.",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
    },
];

// POST /api/seed — Seed the database with initial products
// ⚠️ Only available in development. Remove or protect in production.
export async function POST() {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { success: false, error: "Seed route is disabled in production" },
            { status: 403 }
        );
    }

    try {
        await dbConnect();

        // Clear existing products first
        await Product.deleteMany({});

        // Insert seed data
        const products = await Product.insertMany(initialProducts);

        return NextResponse.json(
            {
                success: true,
                message: `✅ Database seeded with ${products.length} products`,
                data: products,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/seed error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to seed database" },
            { status: 500 }
        );
    }
}
