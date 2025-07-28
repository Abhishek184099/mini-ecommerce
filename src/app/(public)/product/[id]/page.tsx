

import { fetchProductById } from '@/lib/api';
import { AddToCartButton } from '@/components/AddToCartButton';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ProductType } from '@/lib/types';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: { id: string } }) {

    const myId =  parseInt(params.id , 10) ;
    
  const res =  await fetchProductById(myId);
  console.log(res)
  const product : ProductType = res.data
  
  

  return (
    <div className="container mx-auto py-8">

      <Card>
        <CardHeader>
          <Image 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-64 object-contain rounded-t-lg"
            width={1}
            height={1}
            unoptimized
          />
        </CardHeader>
        <CardContent className="mt-4">
          <CardTitle className="text-2xl">{product.title}</CardTitle>
          <p className="text-xl font-semibold mt-2">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </CardContent>
        <CardFooter>
          <AddToCartButton product={product} />
        </CardFooter>
      </Card> 
    </div>
  );
}