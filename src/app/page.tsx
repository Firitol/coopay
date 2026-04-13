import { Navbar } from "@/components/layout/navbar";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Landmark, ShieldCheck, Zap, Store } from "lucide-react";
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
        <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden bg-primary">
          {heroImg && (
            <Image
              src={heroImg.imageUrl}
              alt="Market Hero"
              fill
              className="object-cover opacity-40"
              priority
              data-ai-hint="market commerce"
            />
          )}
          <div className="container relative z-10 px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Connect to the Heart of Oromia's Commerce
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              The official integrated marketplace by Cooperative Bank of Oromia. 
              Buy local, sell global, and pay seamlessly with Coopay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                Become a Seller
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-headline font-bold">Shop by Category</h2>
              <Button variant="link" className="gap-2">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Electronics", icon: Zap, img: "https://picsum.photos/seed/elec1/400/300" },
                { name: "Agriculture", icon: Landmark, img: "https://picsum.photos/seed/agri1/400/300" },
                { name: "Fashion", icon: ShieldCheck, img: "https://picsum.photos/seed/cloth1/400/300" },
                { name: "Home & Office", icon: Store, img: "https://picsum.photos/seed/home1/400/300" }
              ].map((cat) => (
                <Link key={cat.name} href={`/products?category=${cat.name}`} className="group relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
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
        <section className="py-16 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-headline font-bold">Featured Products</h2>
            <Button variant="outline">Browse All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>

        {/* Trust/Bank Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Powered by Coopay</h2>
                <p className="text-lg opacity-80 mb-8">
                  Experience the most secure and fastest checkout in Ethiopia. 
                  Direct bank transfers, mobile wallet payments, and merchant escrow 
                  protection for every transaction.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-2 rounded-lg">
                      <ShieldCheck className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold">Encrypted Transactions</h4>
                      <p className="text-sm opacity-70">Your financial data is protected by bank-grade security protocols.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-2 rounded-lg">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold">Instant Settlements</h4>
                      <p className="text-sm opacity-70">Sellers receive funds immediately after delivery confirmation.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/bank1/800/600" 
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
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
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/merchants">Featured Sellers</Link></li>
                <li><Link href="/categories">Categories</Link></li>
                <li><Link href="/offers">Flash Deals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
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
