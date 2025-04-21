import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts=  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.error("Error in fetching products", error);
        res.status(500).json({ success: false ,message: "Server Error" });
    }
}  

export const createProducts = async (req, res) => {
    const product=req.body;//user send data

    if (!product.name || !product.price) {
        return res.status(400).json({ success:false,message:"Provide all details" });
        console.error("Provffide all details",error);
    }
    const newProduct = new Product(product);

    try {
      await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }
    catch (error) {
        console.error("Error in Creating rpoduct",error);
        res.status(500).json({success:false,message:"Server Error"});
    }

}

export const updateProduct = async(req,res)=>{
    const{id}=req.params;
    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }

    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true});        //new:true return updated data
        res.status(200).json({success:true,data:updatedProduct});
    }
    catch(error){
        console.error("Error in Updating Product",error);
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const deleteProduct = async(req,res)=>{
    const{id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"invalid product id"});
    }


    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted"});
    }
    catch(error){
        
        res.status(500).json({success:false,message:"Server Error , Product not found"});
    }
}