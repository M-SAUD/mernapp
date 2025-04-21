import mongoose from "mongoose";    
const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    countInStock: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true //created at updted fields
});
const Product = mongoose.model('Product', productSchema);
export default Product;