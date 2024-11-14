import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required: [true, "Please enter product name"],
        trim: true
},
    price:{
        type : String,
        required: [true, "Please enter product price"],
        
    },
    image :{
        type : String,
        required : [true, "Please enter product image"],

    }
},{timestamps : true})

const Product = mongoose.model("Product" , productSchema)

export default Product