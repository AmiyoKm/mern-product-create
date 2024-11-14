import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { type Product, useProduct } from '@/Store/product';
import { useToast } from "@/hooks/use-toast"


import { useState } from 'react'

const CreatePage = () => {
    const {toast} = useToast()
    const {createProduct} =useProduct()
    const [newProduct, setNewProduct] = useState<Product>({
        name: "",
        image: "",
        price: ""
    });
    const handleSubmit = async () => { 
       const res  =  await createProduct(newProduct)
       console.log("Success: " ,res.success  );
       console.log("Message: " ,res.message  );
       if(!res){
        toast({
            description : `Success : false`,
            title : "Product not created"
           })
           return
       } 
       toast({
        description : `Success : ${res.success}`,
        title : res.success ? "Product created successfully" : "Product not created"
       })

      setNewProduct({...newProduct , name : "" , image : '' , price: ''}) 
    };
  return (
    <div className='flex mt-10  flex-grow  items-center justify-center'>
        <Card className='w-2/3 h-auto'>
            <CardHeader>
                <CardTitle className='text-2xl'>Create Product</CardTitle>
            </CardHeader>
            <CardContent>
                {/* <Label htmlFor='name' className='text-lg mt-4 mb-4'>Enter Product Name</Label> */}
                <Input className=' mb-6 w-full' placeholder='Product Name' name='name' id='name'  value={newProduct.name} onChange={(e)=> setNewProduct({...newProduct, name : e.target.value})} />
                {/* <Label htmlFor='price' className='text-lg mt-4 mb-4'>Enter Price</Label> */}
                <Input className=' mb-6 w-full' placeholder='Price' name='price' id='price'  value={newProduct.price} onChange={(e)=> setNewProduct({...newProduct, price : e.target.value})} />
                {/* <Label htmlFor='image' className='text-lg mt-4 mb-4'>Enter Product Image</Label> */}
                <Input className=' mb-6 w-full' placeholder='Product image' name='image' id='image'  value={newProduct.image} onChange={(e)=> setNewProduct({...newProduct, image : e.target.value})} />
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit}>Submit</Button>
            </CardFooter>
    </Card>
    </div>
    
   
  )
}

export default CreatePage