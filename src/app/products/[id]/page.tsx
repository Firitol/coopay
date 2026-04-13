
"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, ShieldCheck, Truck, ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const ALL_PRODUCTS = [
  { id: "1", name: "SmartX Pro Smartphone", price: 24500, image: "https://picsum.photos/seed/phone1/600/600", category: "Electronics", rating: 4.8, reviews: 124, description: "Experience cutting-edge technology with the SmartX Pro. Featuring a stunning AMOLED display and long-lasting battery life." },
  { id: "2", name: "Organic Arabica Coffee", price: 1200, image: "https://picsum.photos/seed/coffee1/600/600", category: "Agriculture", rating: 4.9, reviews: 85, description: "Premium hand-picked Arabica beans from the highlands of Oromia. Perfectly roasted for a rich, aromatic flavor." },
  { id: "3", name: "Business Leather Laptop Bag", price: 3500, image: "https://picsum.photos/seed/bag1/600/600", category: "Fashion", rating: 4.5, reviews: 42, description: "Handcrafted genuine leather bag designed for professionals. Fits up to 15-inch laptops with multiple compartments." },
  { id: "4", name: "Ultralight Carbon Bike", price: 45000, image: "https://picsum.photos/seed/bike1/600/600", category: "Sports", rating: 4.7, reviews: 12, description: "A high-performance carbon fiber bicycle built for speed and endurance. Extremely lightweight and durable." },
  { id: "5", name: "Professional DSLR Camera", price: 68000, image: "https://picsum.photos/seed/cam1/600/600", category: "Electronics", rating: 4.9, reviews: 56, description: "Capture every detail with this professional-grade DSLR. Perfect for photography enthusiasts and professionals alike." },
  { id: "6", name: "Modern Office Chair", price: 12500, image: "https://picsum.photos/seed/chair1/600/600", category: "Home & Office", rating: 4.6, reviews: 34, description: "Ergonomic design for maximum comfort during long working hours. Features adjustable height and lumbar support." }
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = useMemo(() => ALL_PRODUCTS.find(p => p.id === id), [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link href="/products">Back to Shop</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2 gap-2">
          <Link href="/products"><ArrowLeft className="h-4 w-4" /> Back to Products</Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>

          <div className="flex flex-col">
            <Badge className="w-fit mb-4" variant="secondary">{product.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
                <span className="font-bold ml-1">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">{product.reviews} Customer Reviews</span>
            </div>

            <div className="text-3xl font-bold text-primary mb-6">ETB {product.price.toLocaleString()}</div>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast Delivery available in Addis Ababa & surroundings</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Verified Merchant with Coopay Escrow Protection</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button size="lg" className="flex-1 gap-2 py-6 text-lg">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 py-6 text-lg">
                Buy with Coopay
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 shrink-0">
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
