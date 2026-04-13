
"use client";

import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { useState } from "react";

export default function ProductsPage() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState("");

  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "products_active"), orderBy("createdAt", "desc"));
  }, [db]);

  const { data: allProducts, isLoading } = useCollection(productsQuery);

  const filteredProducts = allProducts?.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">All Products</h1>
            <p className="text-muted-foreground mt-2">
              Browse Oromia's widest selection of quality goods, verified and secured by Cooperative Bank.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or category..." 
                className="pl-9 h-11" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 h-11 border-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-medium">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts?.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
            {(!filteredProducts || filteredProducts.length === 0) && (
              <div className="col-span-full py-20 text-center">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-xl font-bold mb-1">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
