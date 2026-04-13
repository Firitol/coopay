
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = [
    { id: "1", name: "SmartX Pro Smartphone", price: 24500, qty: 1, image: "https://picsum.photos/seed/phone1/600/600" },
    { id: "2", name: "Organic Arabica Coffee", price: 1200, qty: 2, image: "https://picsum.photos/seed/coffee1/600/600" }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold mb-8">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{item.name}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-sm text-muted-foreground">Quantity: {item.qty}</div>
                      <div className="font-bold text-lg text-primary">ETB {(item.price * item.qty).toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {cartItems.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-xl">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground mb-6">Your cart is currently empty.</p>
                <Button asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>ETB {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>ETB 250</span>
                  </div>
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="text-primary">ETB {(subtotal + 250).toLocaleString()}</span>
                  </div>
                </div>
                <Button className="w-full gap-2 py-6 text-lg" disabled={cartItems.length === 0}>
                  Checkout with Coopay <ArrowRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
