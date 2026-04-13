
'use client';

import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Store, Menu, LogOut, LayoutDashboard, UserCircle, Landmark, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { useAuth, useUser, useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, query, where, limit } from "firebase/firestore";

export function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const autocompleteQuery = useMemoFirebase(() => {
    if (!db || searchQuery.length < 2) return null;
    return query(
      collection(db, "products_active"),
      limit(5)
    );
  }, [db, searchQuery]);

  const { data: suggestions } = useCollection(autocompleteQuery);
  
  const filteredSuggestions = suggestions?.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/merchants", label: "Merchants" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 lg:gap-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] rounded-r-3xl">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-lg">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <span className="font-headline font-bold text-2xl tracking-tight">Coopay Market</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-bold hover:text-primary transition-colors py-3 px-2 border-b border-muted flex items-center justify-between group"
                  >
                    {link.label}
                    <div className="h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2.5">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-lg">
              <Landmark className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <span className="font-headline font-bold text-lg md:text-xl tracking-tighter hidden sm:inline-block">
              Coopay Market
            </span>
          </Link>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-muted-foreground hover:text-primary transition-all relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-6">
          <div className="hidden lg:flex w-full max-w-sm items-center relative" ref={searchContainerRef}>
            <div className="relative w-full group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Search premium goods..."
                className="pl-10 h-10 w-full rounded-xl border-2 focus-visible:ring-0 focus-visible:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                autoComplete="off"
              />
              {isSearchFocused && filteredSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-11 left-0 w-full bg-card border rounded-2xl shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {filteredSuggestions.map((s) => (
                      <Link 
                        key={s.id} 
                        href={`/products/${s.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-muted rounded-xl transition-colors group"
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchQuery("");
                        }}
                      >
                        <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                          {s.image ? (
                             <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                          ) : (
                            <Store className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{s.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{s.category}</p>
                        </div>
                        <p className="font-bold text-xs text-primary">ETB {s.price?.toLocaleString()}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-3">
            <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex rounded-xl hover:bg-destructive/5 hover:text-destructive transition-colors">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white text-[9px] font-black shadow-lg">
                  2
                </span>
              </Button>
            </Link>
            
            {isMounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-2xl h-10 w-10 border-2 hover:bg-primary/5 hover:border-primary transition-all overflow-hidden group">
                    <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-2xl border-2">
                  {user ? (
                    <>
                      <DropdownMenuLabel className="p-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-foreground">My Account</span>
                          <span className="text-[10px] font-bold text-muted-foreground truncate opacity-70">{user.email}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="mx-1" />
                      <div className="p-1 space-y-1">
                        <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer">
                          <Link href="/profile" className="flex items-center gap-3 font-bold text-sm">
                            <UserCircle className="h-5 w-5 text-primary/70" /> Profile Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer">
                          <Link href="/orders" className="flex items-center gap-3 font-bold text-sm">
                            <ShoppingCart className="h-5 w-5 text-primary/70" /> Order History
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator className="mx-1" />
                      <DropdownMenuLabel className="text-[10px] uppercase font-black text-muted-foreground px-3 py-2 tracking-widest opacity-50">Portals</DropdownMenuLabel>
                      <div className="p-1 space-y-1">
                        <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer">
                          <Link href="/dashboard/seller" className="flex items-center gap-3 font-bold text-sm">
                            <LayoutDashboard className="h-5 w-5 text-accent" /> Seller Portal
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-xl p-3 focus:bg-primary/5 cursor-pointer">
                          <Link href="/dashboard/bank" className="flex items-center gap-3 font-bold text-sm">
                            <Landmark className="h-5 w-5 text-accent" /> Bank Ledger
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator className="mx-1" />
                      <div className="p-1">
                        <DropdownMenuItem 
                          className="text-destructive font-black flex items-center gap-3 cursor-pointer rounded-xl p-3 focus:bg-destructive/10"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-5 w-5" /> Log out Account
                        </DropdownMenuItem>
                      </div>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="p-3 font-black text-foreground">Secure Access</DropdownMenuLabel>
                      <DropdownMenuSeparator className="mx-1" />
                      <div className="p-1">
                        <DropdownMenuItem asChild className="rounded-xl p-4 focus:bg-primary/5 cursor-pointer">
                          <Link href="/auth" className="flex items-center justify-between w-full font-black text-primary">
                            Login / Register <ArrowRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
