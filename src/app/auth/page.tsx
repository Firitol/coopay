
'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Landmark, ShieldCheck, Mail, Lock, User, Loader2 } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { initiateEmailSignIn, initiateEmailSignUp, initiatePasswordReset } from "@/firebase/non-blocking-login";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/profile");
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiateEmailSignIn(auth, email, password);
      toast({
        title: "Welcome Back",
        description: "You have successfully signed into Coopay Market.",
      });
    } catch (error: any) {
      let description = "Please check your email and password and try again.";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        description = "Invalid credentials. Please verify your email and password.";
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiateEmailSignUp(auth, email, password, displayName);
      toast({
        title: "Account Created",
        description: "Your Coopay Market profile is ready. Welcome!",
      });
    } catch (error: any) {
      let description = "There was an error creating your account. Please try again later.";
      if (error.code === 'auth/email-already-in-use') {
        description = "This email is already registered. Try logging in instead.";
      } else if (error.code === 'auth/weak-password') {
        description = "Password is too weak. Please use at least 6 characters.";
      }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiatePasswordReset(auth, email);
      toast({
        title: "Reset link sent",
        description: `Check your inbox at ${email} for instructions.`,
      });
      setIsResetMode(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: "We couldn't process your reset request. Ensure the email is correct.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-pulse flex flex-col items-center">
          <Store className="h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground font-medium">Verifying session...</p>
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
            <h1 className="text-3xl font-headline font-bold text-foreground tracking-tight">Coopay Market</h1>
            <p className="text-muted-foreground mt-2 max-w-xs text-sm">
              Secure digital commerce platform by Cooperative Bank of Oromia.
            </p>
          </div>

          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden">
            {isResetMode ? (
              <>
                <CardHeader className="space-y-1 pb-6 bg-primary/5">
                  <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                  <CardDescription>
                    We'll send a secure link to your bank-linked email.
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
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold" disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Link"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" onClick={() => setIsResetMode(false)} className="w-full rounded-xl" disabled={isLoading}>
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
                    <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your secure portal.</CardDescription>
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
                            disabled={isLoading}
                            autoComplete="email"
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            autoComplete="current-password"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login to Portal"}
                      </Button>
                    </form>
                  </CardContent>
                </TabsContent>

                <TabsContent value="register">
                  <CardHeader className="pb-6 pt-6">
                    <CardTitle className="text-2xl font-bold tracking-tight">Join Marketplace</CardTitle>
                    <CardDescription>Create a secure profile linked to your bank account.</CardDescription>
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                            autoComplete="email"
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
                            disabled={isLoading}
                            autoComplete="new-password"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
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
