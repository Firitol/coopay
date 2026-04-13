
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-headline font-bold mb-8 flex items-center gap-3">
            <Heart className="h-8 w-8 text-destructive" />
            Your Wishlist
          </h1>
          
          <div className="bg-muted/30 rounded-2xl p-12 text-center border border-dashed">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground opacity-30 mb-6" />
            <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you're interested in to keep track of them here.</p>
            <Button asChild className="gap-2">
              <Link href="/products">
                <ShoppingBag className="h-4 w-4" /> Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
