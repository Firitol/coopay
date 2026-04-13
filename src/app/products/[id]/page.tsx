
"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ShieldCheck, Truck, ArrowLeft, Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDoc, useMemoFirebase, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const db = useFirestore();

  const productRef = useMemoFirebase(() => {
    if (!db || !id) return null;
    return doc(db, "products_active", id);
  }, [db, id]);

  const { data: product, isLoading } = useDoc(productRef);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 text-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild size="lg">
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
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Button variant="ghost" asChild className="mb-8 -ml-2 gap-2 text-muted-foreground hover:text-primary">
          <Link href="/products"><ArrowLeft className="h-4 w-4" /> Back to Products</Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted shadow-lg">
            <Image 
              src={product.image || "https://picsum.photos/seed/placeholder/800/800"} 
              alt={product.name} 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-primary/10 text-primary border-none text-sm px-4 py-1" variant="secondary">
                {product.category}
              </Badge>
              <Badge className="bg-accent/10 text-accent-foreground border-none text-sm px-4 py-1" variant="secondary">
                Verified Listing
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-8 border-b pb-8">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
                <span className="font-bold text-lg ml-2">{product.rating || "N/A"}</span>
              </div>
              <span className="text-muted-foreground border-l pl-6">{product.reviews || 0} Customer Reviews</span>
            </div>

            <div className="text-4xl font-bold text-primary mb-8">ETB {product.price?.toLocaleString()}</div>
            
            <div className="prose prose-sm max-w-none text-muted-foreground mb-10 text-lg leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border">
                <Truck className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-muted-foreground mt-1">Available across Oromia and Addis Ababa surroundings.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Escrow Protected</h4>
                  <p className="text-xs text-muted-foreground mt-1">Funds are held safely by the bank until you receive your order.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button size="lg" className="flex-1 gap-3 py-8 text-xl rounded-2xl shadow-lg">
                <ShoppingCart className="h-6 w-6" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1 py-8 text-xl rounded-2xl border-2 hover:bg-muted">
                Buy with Coopay
              </Button>
              <Button size="icon" variant="outline" className="h-[72px] w-[72px] shrink-0 rounded-2xl border-2">
                <Heart className="h-8 w-8 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
