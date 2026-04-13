
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Zap, Landmark, ShieldCheck, ShoppingBag, Laptop, Coffee, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  const categories = [
    { name: "Electronics", icon: Zap, count: 1240, image: "https://picsum.photos/seed/elec1/400/300" },
    { name: "Agriculture", icon: Coffee, count: 850, image: "https://picsum.photos/seed/agri1/400/300" },
    { name: "Fashion", icon: ShoppingBag, count: 2100, image: "https://picsum.photos/seed/cloth1/400/300" },
    { name: "Home & Office", icon: Store, count: 560, image: "https://picsum.photos/seed/home1/400/300" },
    { name: "Banking Services", icon: Landmark, count: 15, image: "https://picsum.photos/seed/bank1/400/300" },
    { name: "Health & Beauty", icon: Heart, count: 920, image: "https://picsum.photos/seed/health1/400/300" },
    { name: "Technology", icon: Laptop, count: 430, image: "https://picsum.photos/seed/tech1/400/300" },
    { name: "Handicrafts", icon: ShieldCheck, count: 310, image: "https://picsum.photos/seed/craft1/400/300" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold mb-2">Browse Categories</h1>
        <p className="text-muted-foreground mb-8">Discover a wide range of products across different sectors of commerce.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={`/products?category=${cat.name}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-40">
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <cat.icon className="h-10 w-10 text-accent" />
                  </div>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">{cat.count} Products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
