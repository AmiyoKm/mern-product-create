import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Product, useProduct } from "@/Store/product";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
    const [name , setName]=useState(product.name)
    const [price , setPrice]=useState(product.price)
    const [image , setImage]=useState(product.image)
  const { toast } = useToast();
  const { deleteProduct , updateProduct } = useProduct();
  const handleDelete = async (id: any) => {
    const res = await deleteProduct(id);
    if (!res.success) {
      return toast({ description: res.message, title: "Product not deleted" });
    }

    toast({
      description: res.message,
      title: "Product deleted successfully",
    });
  };
  const handleEdit = async() => {
        const res =await updateProduct(product._id , {name , price , image})
        if(!res.success){
            return toast({description : res.message , title : "Product not updated"});
        }
        toast({
            description: res.message,
            title: "Product updated successfully",
          });
  };
  return (
    <>
     <Dialog>
      <Card className="w-full h-auto rounded-lg hover:scale-105 duration-200 ">
        <CardHeader>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-52"
          />
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-bold text-2xl">{product.name}</p>
         
          <p className="mb-2 text-bold text-2xl">$ {product.price}</p>
        </CardContent>
        <CardFooter>
          
          <DialogTrigger asChild>
          <Button className="mr-4">
            <FaEdit size={20} />
          </Button>
          </DialogTrigger>
          <Button
            onClick={() => handleDelete(product._id)}
            variant="destructive"
          >
            <FaTrash size={20} />{" "}
          </Button>
        </CardFooter>
      </Card>
     
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName( e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Price
            </Label>
            <Input id="price" value={price} onChange={(e) => setPrice( e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Image
            </Label>
            <Input id="image" value={image} onChange={(e) => setImage( e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
        <Button onClick={handleEdit} type="submit">Save changes</Button>
          </DialogClose>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </>
  );
};

export default ProductCard;
