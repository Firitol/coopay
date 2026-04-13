
"use client";

import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Landmark, ShieldCheck, Zap, Store, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterYear } from "@/components/layout/footer-year";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";

export default function Home() {
  const db = useFirestore();
  const heroImg = PlaceHolderImages.find((img) => img.id === "hero-market");
  
  const productsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "products_active"), limit(4));
  }, [db]);

  const { data: featuredProducts, isLoading } = useCollection(productsQuery);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center overflow-hidden bg-primary">
          {heroImg && (
            <Image
              src={heroImg.imageUrl}
              alt="Market Hero"
              fill
              className="object-cover opacity-30"
              priority
              data-ai-hint="market commerce"
            />
          )}
          <div className="container relative z-10 px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-6 border border-white/20">
              <Landmark className="h-4 w-4 text-accent" />
              Official Cooperative Bank of Oromia Platform
            </div>
            <h1 className="text-3xl md:text-6xl font-headline font-bold mb-6 max-w-4xl mx-auto leading-tight px-2">
              Connect to the Heart of Oromia's Commerce
            </h1>
            <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto opacity-90 px-4">
              Securely buy and sell products with the trust of your local bank. 
              Seamless payments with Coopay integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 rounded-xl">
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20 px-8 py-6 rounded-xl">
                <Link href="/dashboard/seller">Sell on Coopay Market</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Row */}
        <section className="bg-white border-b py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Bank-Grade Security</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">Every transaction is protected by Coopay's advanced encryption.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Verified Merchants</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">Shop with confidence from businesses vetted by the bank.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="h-14 w-14 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <Landmark className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Direct Settlements</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">Payments settle directly to your Cooperative Bank account.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Shop by Category</h2>
              <Button asChild variant="link" className="gap-2 text-primary font-bold">
                <Link href="/categories">View all <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Electronics", icon: Zap, img: "https://picsum.photos/seed/elec1/400/300" },
                { name: "Agriculture", icon: Landmark, img: "https://picsum.photos/seed/agri1/400/300" },
                { name: "Fashion", icon: ShieldCheck, img: "https://picsum.photos/seed/cloth1/400/300" },
                { name: "Home & Office", icon: Store, img: "https://picsum.photos/seed/home1/400/300" }
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.name}`} className="group relative h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-accent">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <cat.icon className="h-10 w-10 mb-3 text-accent" />
                    <span className="font-bold text-xl">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Hand-picked quality items from our top merchants.</p>
            </div>
            <Button asChild variant="outline" className="w-full md:w-auto py-6 px-8 text-lg border-2">
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts?.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
              {(!featuredProducts || featuredProducts.length === 0) && (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No featured products available at the moment.
                </div>
              )}
            </div>
          )}
        </section>

        {/* Trust/Bank Section */}
        <section className="py-16 md:py-32 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <Badge className="bg-accent text-accent-foreground mb-8 text-sm py-2 px-6 rounded-full font-bold uppercase tracking-wider">Verified Banking Hub</Badge>
                <h2 className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight">Safe Commerce with Coopay</h2>
                <p className="text-lg md:text-xl opacity-80 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Experience the most secure checkout in Ethiopia. 
                  Every transaction is monitored by bank staff to ensure safe delivery and fair commerce.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                  <div className="flex items-start gap-5 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="bg-accent/30 p-3 rounded-xl shrink-0">
                      <ShieldCheck className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Fraud Protection</h4>
                      <p className="text-sm opacity-70 mt-1">AI-powered fraud detection monitors every trade in real-time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                    <div className="bg-accent/30 p-3 rounded-xl shrink-0">
                      <Landmark className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Instant Payouts</h4>
                      <p className="text-sm opacity-70 mt-1">Funds reach seller accounts instantly upon delivery confirmation.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10">
                <Image 
                  src="https://picsum.photos/seed/bank1/1000/1200" 
                  alt="Banking App" 
                  fill 
                  className="object-cover"
                  data-ai-hint="banking technology"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Store className="h-8 w-8 text-primary" />
                <span className="font-headline font-bold text-2xl">Coopay Market</span>
              </div>
              <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                Empowering Oromia's merchants and consumers through digital transformation and secure banking solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Marketplace</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link href="/merchants" className="hover:text-primary transition-colors">Featured Sellers</Link></li>
                <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                <li><Link href="/offers" className="hover:text-primary transition-colors">Flash Deals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t text-center text-sm text-muted-foreground">
            © <FooterYear /> Cooperative Bank of Oromia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
