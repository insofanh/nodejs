import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
    description: String
});

export default mongoose.model("Product", productSchema);