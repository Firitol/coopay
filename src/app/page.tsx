
import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Landmark, ShieldCheck, Zap, Store, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterYear } from "@/components/layout/footer-year";

export default function Home() {
  const heroImg = PlaceHolderImages.find((img) => img.id === "hero-market");
  
  const featuredProducts = [
    {
      id: "1",
      name: "SmartX Pro Smartphone",
      price: 24500,
      image: "https://picsum.photos/seed/phone1/600/600",
      category: "Electronics",
      rating: 4.8,
      reviews: 124,
      imageHint: "smartphone"
    },
    {
      id: "2",
      name: "Organic Arabica Coffee",
      price: 1200,
      image: "https://picsum.photos/seed/coffee1/600/600",
      category: "Agriculture",
      rating: 4.9,
      reviews: 85,
      imageHint: "coffee beans"
    },
    {
      id: "3",
      name: "Business Leather Laptop Bag",
      price: 3500,
      image: "https://picsum.photos/seed/bag1/600/600",
      category: "Fashion",
      rating: 4.5,
      reviews: 42,
      imageHint: "leather bag"
    },
    {
      id: "4",
      name: "Ultralight Carbon Bike",
      price: 45000,
      image: "https://picsum.photos/seed/bike1/600/600",
      category: "Sports",
      rating: 4.7,
      reviews: 12,
      imageHint: "bicycle"
    }
  ];

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
            <h1 className="text-3xl md:text-6xl font-headline font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Connect to the Heart of Oromia's Commerce
            </h1>
            <p className="text-base md:text-xl mb-8 max-w-2xl mx-auto opacity-90 px-4">
              Securely buy and sell products with the trust of your local bank. 
              Seamless payments with Coopay integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 rounded-xl">
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20 px-8 py-6 rounded-xl">
                Sell on Coopay Market
              </Button>
            </div>
          </div>
        </section>

        {/* Features Row */}
        <section className="bg-white border-b py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Bank-Grade Security</h3>
                <p className="text-sm text-muted-foreground mt-1">Every transaction is protected by Coopay.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Verified Merchants</h3>
                <p className="text-sm text-muted-foreground mt-1">Shop from businesses trusted by the bank.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                  <Landmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold">Direct Settlements</h3>
                <p className="text-sm text-muted-foreground mt-1">Payments settle directly to bank accounts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Shop by Category</h2>
              <Button variant="link" className="gap-2 text-primary font-bold">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: "Electronics", icon: Zap, img: "https://picsum.photos/seed/elec1/400/300" },
                { name: "Agriculture", icon: Landmark, img: "https://picsum.photos/seed/agri1/400/300" },
                { name: "Fashion", icon: ShieldCheck, img: "https://picsum.photos/seed/cloth1/400/300" },
                { name: "Home & Office", icon: Store, img: "https://picsum.photos/seed/home1/400/300" }
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.name}`} className="group relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-accent">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <cat.icon className="h-8 w-8 mb-2 text-accent" />
                    <span className="font-bold text-lg">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16 container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-headline font-bold">Featured Products</h2>
            <Button variant="outline" className="w-full md:w-auto">Browse All Products</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* Trust/Bank Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="bg-accent text-accent-foreground mb-6 text-sm py-1 px-4">Verified Banking Hub</Badge>
                <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Safe Commerce with Coopay</h2>
                <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto lg:mx-0">
                  Experience the most secure checkout in Ethiopia. 
                  Every transaction is monitored by bank staff to ensure safe delivery and fair commerce.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="bg-accent/20 p-2 rounded-lg shrink-0">
                      <ShieldCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold">Fraud Protection</h4>
                      <p className="text-xs opacity-70">AI-powered fraud detection monitors every trade.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="bg-accent/20 p-2 rounded-lg shrink-0">
                      <Landmark className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold">Instant Payouts</h4>
                      <p className="text-xs opacity-70">Funds reach seller accounts within minutes of completion.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/bank1/1000/1000" 
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

      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold text-xl">Coopay Market</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Empowering Oromia's merchants and consumers through digital transformation and secure banking solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
                <li><Link href="/merchants" className="hover:text-primary">Featured Sellers</Link></li>
                <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
                <li><Link href="/offers" className="hover:text-primary">Flash Deals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-primary">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © <FooterYear /> Cooperative Bank of Oromia. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
