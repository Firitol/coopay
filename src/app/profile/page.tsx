
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, CreditCard, Bell, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-headline font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">Guest User</h3>
                  <p className="text-sm text-muted-foreground mb-4">guest@example.com</p>
                  <Button variant="outline" size="sm" className="w-full">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
            
            <nav className="space-y-1">
              {[
                { name: "Account Details", icon: User },
                { name: "Payment Methods", icon: CreditCard },
                { name: "Notifications", icon: Bell },
                { name: "Security", icon: Shield },
                { name: "Preferences", icon: Settings },
              ].map((item) => (
                <Button key={item.name} variant="ghost" className="w-full justify-start gap-3 h-12">
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Welcome to your Coopay Market profile. Here you can manage your account settings and preferences.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
