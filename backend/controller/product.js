import mongoose from "mongoose";
import Product from "../models/product.js"


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message:"Products not found"});
        
    }
}
const getProduct =  async(req,res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"Product not found"});
        }
    }
}

const createProduct = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({message:"All fields are required"});
    }
    const newProduct = await Product.create(product);
    res.status(201).json(newProduct);
}

const updateProduct = async (req , res)=>{
    const id = req.params.id;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Product not found"});
    }
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate({_id : id}, product , {new : true ,runValidators : true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(404).json({message:"Product not found"});
    }
   
}
const deleteProduct =  async (req, res) => {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);
    
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(404).json({message:"Product not found"});
        
    }
    
}
export {getAllProducts , getProduct , createProduct , updateProduct , deleteProduct}