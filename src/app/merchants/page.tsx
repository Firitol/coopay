
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function MerchantsPage() {
  const db = useFirestore();

  const merchantsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "seller_profiles"), orderBy("createdAt", "desc"));
  }, [db]);

  const { data: merchants, isLoading } = useCollection(merchantsQuery);

  return (
    <div className="min-h-screen flex-col flex">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mb-16">
          <Badge className="mb-4 py-1 px-4 rounded-full uppercase tracking-widest text-[10px] font-bold">Verified Partners</Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">Our Verified Merchants</h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Shop directly from trusted local businesses authorized by Cooperative Bank of Oromia. 
            All merchants undergo a rigorous background and banking verification process.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading verified merchants...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {merchants?.map((merchant) => (
              <Card key={merchant.id} className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 group rounded-3xl">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative w-full sm:w-56 lg:w-64 h-56 sm:h-auto bg-muted shrink-0 overflow-hidden">
                    <Image 
                      src={merchant.storeLogoUrl || "https://picsum.photos/seed/merchant/400/400"} 
                      alt={merchant.storeName} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {merchant.isApproved && (
                      <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full shadow-2xl">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-2xl tracking-tight">{merchant.storeName}</h3>
                          {merchant.isApproved && (
                            <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold py-1 px-3">
                              Bank Verified
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground font-medium text-xs py-1 px-3 rounded-md">
                          Store Profile
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-bold text-sm">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-8 line-clamp-2 text-base leading-relaxed">
                      {merchant.storeDescription || "A trusted merchant providing quality products through the Coopay ecosystem."}
                    </p>
                    
                    <div className="flex items-center gap-3 text-muted-foreground text-sm mb-10">
                      <div className="bg-primary/5 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">Oromia, Ethiopia</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-2xl py-7 text-lg shadow-lg group-hover:shadow-primary/20 transition-all" asChild>
                        <Link href={`/merchants/${merchant.id}`} className="gap-3">
                          Enter Store <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-2xl py-7 text-lg border-2 hover:bg-muted font-bold">
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {(!merchants || merchants.length === 0) && (
              <div className="col-span-full py-24 text-center bg-muted/20 rounded-3xl border-2 border-dashed">
                <p className="text-muted-foreground text-lg">No verified merchants found in your region yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
