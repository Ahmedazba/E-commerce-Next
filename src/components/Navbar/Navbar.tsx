"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { FaShopify, FaUser } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { HeartPlusIcon, Loader2 } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const {cartData , isloading}= useContext(CartContext)
  return (
    <>
      {/* --- Navbar --- */}

      <nav className="bg-gray-100 py-3 font-semibold sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="flex items-center gap-3 ">
              <FaShopify size={25} />
              <h1 className="text-2xl font-semibold">ShopMart</h1>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={"/products"}>Product</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={"/brands"}>Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={"/catigories"}>Catigory</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Link href={"/cart"}>
                  <PiShoppingCartSimpleBold size={25} />
                  <Badge className="absolute -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                    {isloading? <Loader2 className="animate-spin"/> : cartData?.numOfCartItems}
                  </Badge>
                </Link>
              </div>
              <Link href={"/wishlist"}>
                <HeartPlusIcon />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <FaUser size={20} className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/profile"}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href={"/login"}>
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>
                    <Link href={"/register"}>
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
