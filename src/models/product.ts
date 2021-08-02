import { Schema, model } from "mongoose";

interface Product {
    id: string;
    title: string;
    category: string;
    description: string;
    images: string[];
    variants: string[];
    price: string;
    tags: string[];

};

const productSchema = new Schema({
    id: String,
    title: String,
    category: String,
    description: String,
    images: [String],
    variants: [String],
    price: String,
    tags: [String]

});

export default model<Product>('Product', productSchema);
