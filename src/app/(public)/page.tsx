import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fetchProducts } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { ProductType } from '@/lib/types';


export default async function Home() {
  const res  = await fetchProducts();
  const products : ProductType  = res.data.data

  return (
    <div className="container mx-auto py-8 overflow-x-hidden w-full ">
      <h1 className="text-3xl font-bold mb-8 mx-3">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {products.map((product : ProductType) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Image 
                src={product.thumbnail} 
                alt={product.title} 
                width={300}
                height={200}
                className="object-cover rounded-t-lg"
                unoptimized

                
              />

            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl">{product.title}</CardTitle>
              <Badge variant="outline" className="mt-2">${product.price}</Badge>
              <CardDescription className="mt-2 line-clamp-2">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/product/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}