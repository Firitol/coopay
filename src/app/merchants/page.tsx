
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MerchantsPage() {
  const merchants = [
    { id: "m1", name: "MegaElectronics", category: "Electronics", rating: 4.9, location: "Addis Ababa", image: "https://picsum.photos/seed/m1/200/200", verified: true },
    { id: "m2", name: "AgriOromia", category: "Agriculture", rating: 4.8, location: "Jimma", image: "https://picsum.photos/seed/m2/200/200", verified: true },
    { id: "m3", name: "Desta Boutique", category: "Fashion", rating: 4.7, location: "Adama", image: "https://picsum.photos/seed/m3/200/200", verified: false },
    { id: "m4", name: "TechHub Ethiopia", category: "Electronics", rating: 4.5, location: "Shashemene", image: "https://picsum.photos/seed/m4/200/200", verified: true }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold mb-2">Our Merchants</h1>
        <p className="text-muted-foreground mb-8">Shop directly from trusted local businesses powered by Coopay.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {merchants.map((merchant) => (
            <Card key={merchant.id} className="overflow-hidden flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-muted">
                <Image src={merchant.image} alt={merchant.name} fill className="object-cover" />
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-xl">{merchant.name}</h3>
                      {merchant.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </div>
                    <Badge variant="secondary">{merchant.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-bold text-sm">{merchant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-6">
                  <MapPin className="h-4 w-4" /> {merchant.location}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" asChild>
                    <Link href={`/merchants/${merchant.id}`}>Visit Store</Link>
                  </Button>
                  <Button className="flex-1">Contact</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
