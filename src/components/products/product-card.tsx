
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  imageHint?: string;
}

export function ProductCard({ id, name, price, image, category, rating, reviews, imageHint }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={imageHint || "product"}
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className="absolute top-2 left-2 bg-accent/90 text-accent-foreground font-semibold">
          {category}
        </Badge>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
        </div>
        <Link href={`/products/${id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        </Link>
        <p className="text-xl font-bold text-primary mt-1">ETB {price.toLocaleString()}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" variant="outline">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
