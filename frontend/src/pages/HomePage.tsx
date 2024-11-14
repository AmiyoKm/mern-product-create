import ProductCard from '@/assets/Product'
import {type Product, useProduct } from '@/Store/product'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

const HomePage = () => {
  const {products , fetchProduct} =useProduct()
  useEffect(()=>{
    fetchProduct()
  },[products])
  return (
    <div className='py-12  flex flex-col justify-center items-center'>
      <p className='mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl md:text-4xl sm:text-3xl font-bold'>Current Products 🚀</p>
      <div>
      {
       products && products.length>0 ?(
        <div  className=' grid   w-full  grid-flow-row gap-6 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3'>
              {
                 products.map((product: Product , index : number)=>(
                  <ProductCard key={index} product={product} />
                
                
              ))
              }
          </div>
        ) :(  
        <div className='space-y-5'>
          <span className='mr-4  text-2xl md:text-4xl sm:text-3xl '>No Products Found 🥲</span>
          <Link to='/create' className='bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl md:text-4xl sm:text-3xl font-bold hover:underline'>Create a Product </Link>
        </div>
          
        )
      }
      </div>
      
    </div>
  )

}

export default HomePage