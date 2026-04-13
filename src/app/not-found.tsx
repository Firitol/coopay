
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Store className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-bold mb-2">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
