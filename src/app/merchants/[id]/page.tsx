
"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle2, Phone, Mail, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const MERCHANTS = [
  { id: "m1", name: "MegaElectronics", category: "Electronics", rating: 4.9, location: "Addis Ababa", image: "https://picsum.photos/seed/m1/400/400", verified: true, description: "Oromia's leading electronics provider. We specialize in high-end gadgets and home appliances." },
  { id: "m2", name: "AgriOromia", category: "Agriculture", rating: 4.8, location: "Jimma", image: "https://picsum.photos/seed/m2/400/400", verified: true, description: "Connecting local farmers to the market. Premium agricultural products directly from the source." },
  { id: "m3", name: "Desta Boutique", category: "Fashion", rating: 4.7, location: "Adama", image: "https://picsum.photos/seed/m3/400/400", verified: false, description: "Unique and traditional fashion for the modern era." },
  { id: "m4", name: "TechHub Ethiopia", category: "Electronics", rating: 4.5, location: "Shashemene", image: "https://picsum.photos/seed/m4/400/400", verified: true, description: "Your one-stop shop for all things technology and computing." }
];

const PRODUCTS = [
  { id: "1", name: "SmartX Pro Smartphone", price: 24500, image: "https://picsum.photos/seed/phone1/600/600", category: "Electronics", rating: 4.8, reviews: 124, merchantId: "m1" },
  { id: "2", name: "Organic Arabica Coffee", price: 1200, image: "https://picsum.photos/seed/coffee1/600/600", category: "Agriculture", rating: 4.9, reviews: 85, merchantId: "m2" },
  { id: "5", name: "Professional DSLR Camera", price: 68000, image: "https://picsum.photos/seed/cam1/600/600", category: "Electronics", rating: 4.9, reviews: 56, merchantId: "m1" },
  { id: "6", name: "Modern Office Chair", price: 12500, image: "https://picsum.photos/seed/chair1/600/600", category: "Home & Office", rating: 4.6, reviews: 34, merchantId: "m4" }
];

export default function MerchantDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const merchant = useMemo(() => MERCHANTS.find(m => m.id === id), [id]);
  const merchantProducts = useMemo(() => PRODUCTS.filter(p => p.merchantId === id), [id]);

  if (!merchant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Merchant Not Found</h1>
            <Button asChild>
              <Link href="/merchants">View All Merchants</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Merchant Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-8 -ml-2 text-white hover:text-white hover:bg-white/10 gap-2">
            <Link href="/merchants"><ArrowLeft className="h-4 w-4" /> Back to Merchants</Link>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="relative h-40 w-40 rounded-full border-4 border-white/20 overflow-hidden shrink-0">
              <Image src={merchant.image} alt={merchant.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl font-headline font-bold flex items-center gap-3 justify-center md:justify-start">
                  {merchant.name}
                  {merchant.verified && <CheckCircle2 className="h-6 w-6 text-accent" />}
                </h1>
                <Badge variant="secondary" className="w-fit mx-auto md:mx-0 bg-white/20 text-white border-none">{merchant.category}</Badge>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mb-6 opacity-80">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-bold">{merchant.rating} Store Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{merchant.location}, Ethiopia</span>
                </div>
              </div>
              <p className="max-w-2xl text-lg opacity-80 mb-8">{merchant.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                  <Phone className="h-4 w-4" /> Call Merchant
                </Button>
                <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 gap-2">
                  <Mail className="h-4 w-4" /> Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">
        <h2 className="text-2xl font-headline font-bold mb-8">Store Products</h2>
        {merchantProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {merchantProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-xl">
            <p className="text-muted-foreground">This merchant hasn't listed any products yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
