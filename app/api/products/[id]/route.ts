import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/lib/models/Product";

interface RouteContext {
    params: Promise<{ id: string }>;
}

// GET /api/products/[id] — Fetch a single product
export async function GET(_request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();

        const { id } = await context.params;
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// PUT /api/products/[id] — Update a product
export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();

        const { id } = await context.params;
        const body = await request.json();

        const product = await Product.findByIdAndUpdate(id, body, {
            new: true,        // return updated document
            runValidators: true,
        });

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: product }, { status: 200 });
    } catch (error) {
        console.error("PUT /api/products/[id] error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update product" },
            { status: 400 }
        );
    }
}

// DELETE /api/products/[id] — Delete a product
export async function DELETE(_request: NextRequest, context: RouteContext) {
    try {
        await dbConnect();

        const { id } = await context.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE /api/products/[id] error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete product" },
            { status: 500 }
        );
    }
}
