
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MerchantsPage() {
  const merchants = [
    { id: "m1", name: "MegaElectronics", category: "Electronics", rating: 4.9, location: "Addis Ababa", image: "https://picsum.photos/seed/m1/400/400", verified: true },
    { id: "m2", name: "AgriOromia", category: "Agriculture", rating: 4.8, location: "Jimma", image: "https://picsum.photos/seed/m2/400/400", verified: true },
    { id: "m3", name: "Desta Boutique", category: "Fashion", rating: 4.7, location: "Adama", image: "https://picsum.photos/seed/m3/400/400", verified: false },
    { id: "m4", name: "TechHub Ethiopia", category: "Electronics", rating: 4.5, location: "Shashemene", image: "https://picsum.photos/seed/m4/400/400", verified: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">Our Verified Merchants</h1>
          <p className="text-muted-foreground text-lg">
            Shop directly from trusted local businesses authorized by Cooperative Bank of Oromia. 
            All merchants undergo a rigorous verification process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {merchants.map((merchant) => (
            <Card key={merchant.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 lg:w-56 h-48 sm:h-auto bg-muted shrink-0">
                  <Image src={merchant.image} alt={merchant.name} fill className="object-cover" />
                  {merchant.verified && (
                    <div className="absolute top-2 left-2 bg-primary text-white p-1 rounded-full shadow-lg">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{merchant.name}</h3>
                        {merchant.verified && <Badge className="bg-primary/10 text-primary border-none text-[10px] uppercase font-bold">Verified</Badge>}
                      </div>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground font-medium">{merchant.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-bold text-sm">{merchant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
                    <MapPin className="h-4 w-4 text-primary" /> {merchant.location}, Ethiopia
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-xl py-6" asChild>
                      <Link href={`/merchants/${merchant.id}`} className="gap-2">
                        Browse Store <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl py-6 border-2">Contact Merchant</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
