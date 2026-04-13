
'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Landmark, ShieldCheck, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { initiateEmailSignIn, initiateEmailSignUp, initiatePasswordReset } from "@/firebase/non-blocking-login";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/profile");
    }
  }, [user, isUserLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignIn(auth, email, password);
    toast({
      title: "Attempting login",
      description: "Please wait while we verify your credentials.",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignUp(auth, email, password);
    toast({
      title: "Creating account",
      description: "Setting up your Coopay Market profile.",
    });
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    initiatePasswordReset(auth, email);
    toast({
      title: "Reset link sent",
      description: `If an account exists for ${email}, a reset link has been sent.`,
    });
    setIsResetMode(false);
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse flex flex-col items-center">
          <Store className="h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground font-medium">Securing connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-[450px]">
          <div className="flex flex-col items-center mb-8 text-center px-4">
            <div className="bg-primary text-white p-3 rounded-2xl shadow-xl mb-4">
              <Landmark className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-headline font-bold text-foreground">Coopay Market</h1>
            <p className="text-muted-foreground mt-2 max-w-xs">
              Secure digital commerce platform by Cooperative Bank of Oromia.
            </p>
          </div>

          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
            {isResetMode ? (
              <>
                <CardHeader className="space-y-1 pb-6 bg-primary/5">
                  <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you a link to reset your password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="reset-email" 
                          placeholder="name@example.com" 
                          type="email" 
                          className="pl-10 h-11 rounded-xl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold">
                      Send Reset Link
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" onClick={() => setIsResetMode(false)} className="w-full rounded-xl">
                    Back to Login
                  </Button>
                </CardFooter>
              </>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 bg-muted/50 p-1">
                  <TabsTrigger value="login" className="rounded-2xl font-bold text-sm data-[state=active]:shadow-md">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="rounded-2xl font-bold text-sm data-[state=active]:shadow-md">
                    Register
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <CardHeader className="pb-6 pt-6">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Login with your bank-linked email account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="login-email" 
                            placeholder="name@example.com" 
                            type="email" 
                            className="pl-10 h-11 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="px-0 font-bold h-auto text-xs"
                            onClick={() => setIsResetMode(true)}
                            type="button"
                          >
                            Forgot Password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="login-password" 
                            type="password" 
                            className="pl-10 h-11 rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                        Login to Portal
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>

                <TabsContent value="register">
                  <CardHeader className="pb-6 pt-6">
                    <CardTitle className="text-2xl font-bold">Join Marketplace</CardTitle>
                    <CardDescription>Start shopping or selling with secure bank verification.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-name" 
                            placeholder="Abebe Bikila" 
                            className="pl-10 h-11 rounded-xl"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            autoComplete="name"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-email" 
                            placeholder="name@example.com" 
                            type="email" 
                            className="pl-10 h-11 rounded-xl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="username email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Create Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="reg-password" 
                            type="password" 
                            className="pl-10 h-11 rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                        Create Account
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>
              </Tabs>
            )}
          </Card>

          <div className="mt-8 flex items-center justify-center gap-6 opacity-60">
            <div className="flex items-center gap-1 text-xs font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" /> Bank Protected
            </div>
            <div className="flex items-center gap-1 text-xs font-medium">
              <Lock className="h-4 w-4 text-primary" /> SSL Encrypted
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
