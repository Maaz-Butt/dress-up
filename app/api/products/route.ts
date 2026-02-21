import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";

// GET /api/products — Fetch all products (with optional ?category=men|women filter)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        const filter = category ? { category } : {};
        const products = await Product.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error: any) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST /api/products — Create a new product
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const product = await Product.create(body);

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/products error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to create product" },
            { status: 400 }
        );
    }
}
