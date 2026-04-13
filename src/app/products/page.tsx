
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export default function ProductsPage() {
  const allProducts = [
    { id: "1", name: "SmartX Pro Smartphone", price: 24500, image: "https://picsum.photos/seed/phone1/600/600", category: "Electronics", rating: 4.8, reviews: 124 },
    { id: "2", name: "Organic Arabica Coffee", price: 1200, image: "https://picsum.photos/seed/coffee1/600/600", category: "Agriculture", rating: 4.9, reviews: 85 },
    { id: "3", name: "Business Leather Laptop Bag", price: 3500, image: "https://picsum.photos/seed/bag1/600/600", category: "Fashion", rating: 4.5, reviews: 42 },
    { id: "4", name: "Ultralight Carbon Bike", price: 45000, image: "https://picsum.photos/seed/bike1/600/600", category: "Sports", rating: 4.7, reviews: 12 },
    { id: "5", name: "Professional DSLR Camera", price: 68000, image: "https://picsum.photos/seed/cam1/600/600", category: "Electronics", rating: 4.9, reviews: 56 },
    { id: "6", name: "Modern Office Chair", price: 12500, image: "https://picsum.photos/seed/chair1/600/600", category: "Home & Office", rating: 4.6, reviews: 34 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold">All Products</h1>
            <p className="text-muted-foreground mt-1">Showing all available products in Oromia's integrated marketplace.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </main>
    </div>
  );
}
