import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    image: string;
    category: "men" | "women";
    description?: string;
    sizes?: string[];
    inStock?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        image: {
            type: String,
            required: [true, "Product image is required"],
        },
        category: {
            type: String,
            enum: ["men", "women"],
            required: [true, "Category is required"],
        },
        description: {
            type: String,
            default: "",
        },
        sizes: {
            type: [String],
            default: ["XS", "S", "M", "L", "XL"],
        },
        inStock: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

// Prevent model re-compilation in dev (Next.js hot reload)
const Product: Model<IProduct> =
    mongoose.models.Product ||
    mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
