import { NextResponse } from "next/server";
import Replicate from "replicate";
import fs from "fs";
import path from "path";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
    try {
        const { userImage, productImage } = await req.json();

        if (!userImage || !productImage) {
            console.error("Missing inputs:", { userImage: !!userImage, productImage: !!productImage });
            return NextResponse.json(
                { error: "Missing user image or product image" },
                { status: 400 }
            );
        }

        if (!process.env.REPLICATE_API_TOKEN) {
            console.error("Missing API token");
            return NextResponse.json(
                { error: "Missing Replicate API token" },
                { status: 500 }
            );
        }

        console.log("Processing try-on request...");

        // Helper to process input images
        const processInputImage = async (image: string) => {
            // Case 1: Local file path (starts with /)
            if (image.startsWith("/")) {
                try {
                    // Remove leading slash to join correctly with process.cwd()
                    const relativePath = image.startsWith("/") ? image.slice(1) : image;
                    const filePath = path.join(process.cwd(), "public", relativePath);

                    const fileBuffer = await fs.promises.readFile(filePath);

                    // Determine mime type based on extension
                    const ext = path.extname(image).toLowerCase().substring(1); // e.g., 'webp'
                    const mimeType = ext === 'jpg' ? 'jpeg' : ext;

                    const base64 = fileBuffer.toString("base64");
                    return `data:image/${mimeType};base64,${base64}`;
                } catch (filesError) {
                    console.error("Error reading local product image:", filesError);
                    // Fallback: return original, maybe it works if it's a URL
                    return image;
                }
            }
            // Case 2: Base64 Data URI (User upload) or Public URL - return as is
            return image;
        };

        const processedUserImage = await processInputImage(userImage);
        const processedProductImage = await processInputImage(productImage);

        console.log("Calling Replicate with processed inputs...");

        const output = await replicate.run(
            "cuuupid/idm-vton:0513734a452173b8173e907e3a59d19a36266e55b48528559432bd21c7d7e985",
            {
                input: {
                    crop: false,
                    seed: 42,
                    steps: 30,
                    category: "upper_body",
                    force_dc: false,
                    garm_img: processedProductImage,
                    human_img: processedUserImage,
                    mask_only: false,
                    garment_des: "clothing",
                },
            }
        );

        console.log("Replicate output:", output);

        const resultImage = Array.isArray(output) ? output[0] : output;

        return NextResponse.json({ generatedImage: resultImage });
    } catch (error) {
        console.error("Error processing try-on request:", error);

        // Check for payment required error
        // @ts-ignore
        if (error?.response?.status === 402 || error?.message?.includes("Payment Required") || error?.message?.includes("insufficient credit")) {
            return NextResponse.json(
                { error: "Insufficient credits on Replicate. Please add funds to your account." },
                { status: 402 }
            );
        }

        return NextResponse.json(
            // @ts-ignore
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}
