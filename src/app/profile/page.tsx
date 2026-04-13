
'use client';

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, CreditCard, Bell, Shield, LogOut, Landmark, BadgeCheck, Mail, MapPin } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/auth");
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold">Account Settings</h1>
            <p className="text-muted-foreground mt-1 font-medium">Manage your personal information and banking links.</p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="gap-2 rounded-xl h-11 px-6 shadow-lg shadow-destructive/10">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-primary text-white">
              <CardContent className="pt-10">
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-inner">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl mb-1">{user.displayName || "User Account"}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-6 bg-black/10 px-3 py-1 rounded-full">
                    <BadgeCheck className="h-4 w-4 text-accent" />
                    Verified Customer
                  </div>
                  
                  <div className="w-full space-y-3 text-left bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 opacity-70" />
                      <span className="text-sm truncate font-medium">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Landmark className="h-4 w-4 opacity-70" />
                      <span className="text-sm font-medium">Linked Coopay Account</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-2">
              {[
                { name: "Account Overview", icon: User },
                { name: "Banking & Payments", icon: CreditCard },
                { name: "Shipping Addresses", icon: MapPin },
                { name: "Notification Control", icon: Bell },
                { name: "Privacy & Security", icon: Shield },
                { name: "General Settings", icon: Settings },
              ].map((item, i) => (
                <Button key={item.name} variant={i === 0 ? "secondary" : "ghost"} className={`w-full justify-start gap-4 h-14 rounded-2xl font-bold transition-all ${i === 0 ? "bg-white shadow-md text-primary" : "hover:bg-white/50"}`}>
                  <div className={`p-2 rounded-xl ${i === 0 ? "bg-primary/10" : "bg-muted"}`}>
                    <item.icon className={`h-5 w-5 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                   <Landmark className="h-6 w-6 text-primary" />
                   Banking Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-2xl bg-muted/30 border-2 border-dashed border-primary/20 flex flex-col md:flex-row items-center gap-6">
                   <div className="h-16 w-16 bg-white rounded-2xl shadow-lg flex items-center justify-center shrink-0">
                      <Landmark className="h-8 w-8 text-primary" />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <h4 className="font-bold text-lg mb-1">Cooperative Bank of Oromia</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">Your account is automatically synced with Coopay for instant settlements and secure e-commerce transactions.</p>
                   </div>
                   <Button variant="outline" className="rounded-xl font-bold border-2">Manage Link</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-5 rounded-2xl border-2 hover:border-primary/30 transition-colors bg-card">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-50">Market Credit</p>
                      <h3 className="text-3xl font-black text-primary mb-1">ETB 14,250</h3>
                      <p className="text-[10px] font-bold text-muted-foreground">Available for immediate purchase</p>
                   </div>
                   <div className="p-5 rounded-2xl border-2 hover:border-primary/30 transition-colors bg-card">
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3 opacity-50">Pending Refunds</p>
                      <h3 className="text-3xl font-black text-foreground mb-1">ETB 0.00</h3>
                      <p className="text-[10px] font-bold text-muted-foreground">No active refund requests</p>
                   </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">Email Address</Label>
                    <div className="h-12 flex items-center px-4 rounded-xl bg-muted/30 border-2 font-bold text-sm">
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">Display Name</Label>
                    <div className="h-12 flex items-center px-4 rounded-xl bg-muted/30 border-2 font-bold text-sm">
                      {user.displayName || "Not set"}
                    </div>
                  </div>
                </div>
                <Button className="rounded-xl font-bold px-8 h-12 shadow-lg shadow-primary/20">Update Profile Details</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
