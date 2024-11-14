import { create } from "zustand";
import axios from 'axios'
export interface Product {
  name: string;
  image: string;
  price: string;
  _id?: string;
}
interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct:(product: Product) => Promise<{ success: boolean; message: string }>,
  fetchProduct : ()=> void
  deleteProduct : (id : any)=> Promise<({success : boolean , message : string})>
  updateProduct : (id : any , product : Product)=> Promise<({success : boolean , message : string})>
}
export const useProduct = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  createProduct: async (product: Product) =>{
    if(!product.name || !product.price || !product.image){
      return {success : false , message : "All fields are required"};
    }
    const res = await axios.post('/api/v1/products' , product)
    console.log(res);
    
   set((state)=>({
    products : [...state.products , res.data]
   
    
   }) )
   return {success : true , message : "Product created successfully"};
  },
  fetchProduct : async()=> {
    try {
        const res = await axios.get('/api/v1/products')
        set({products : res.data})
    } catch (error) {
        console.log(error);
        
    }
  },
  deleteProduct : async(id : any)=>{
     await axios.delete(`/api/v1/products/${id}`)
    
  set((state)=> ({
    products : state.products.filter((product)=>
    product._id !==id)
  }))
  return {success : true , message : "Product deleted successfully"};
 
},
    updateProduct : async(id : any , product : Product)=>{
        try {
            const res = await axios.patch(`/api/v1/products/${id}` , product)
            
            set((state)=>({
                products : state.products.map((product : any)=>
                product._id ===id? res.data : product)
            }))
            return {success : true , message : "Product updated successfully"}
        } catch (error) {
            console.log(error);
            return {success : false , message : "Product not updated "}
            
        }
    }
}
));
