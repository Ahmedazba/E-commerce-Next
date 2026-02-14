"use client";
import React, { useState } from "react";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";


import { signOut, useSession } from "next-auth/react";

export default function NavbarPho({ onClose }: { onClose: () => void }) {

  const session = useSession();
  return (
    <>
      

      
        <div className="bg-gray-50 w-full h-screen absolute top-0 end-0 transition-all duration-1000 md:hidden -z-1">
          <NavigationMenu className="py-10 px-3">
            <NavigationMenuList className="flex-col items-start">
              {session.status === "authenticated" ?
                <>
                  <NavigationMenuItem>


                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/"} onClick={onClose}>
                        Home
                      </Link>
                    </NavigationMenuLink>


                  </NavigationMenuItem>
                  <NavigationMenuItem>


                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/profile"} onClick={onClose}>
                        Profile
                      </Link>
                    </NavigationMenuLink>


                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/products"} onClick={onClose}>
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/categories"} onClick={onClose}>
                        Categories
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/brands"} onClick={onClose}>
                        Brands
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/cart"} onClick={onClose}>
                        Cart
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/wishlist"} onClick={onClose}>
                        Wish List
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/allorders"} onClick={onClose}>
                        All Orders
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/"} onClick={() => signOut({
                        callbackUrl: '/'
                      })}>Log Out</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </>
                :

                <>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/"} onClick={onClose}>
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/products"} onClick={onClose}>
                        Products
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/categories"} onClick={onClose}>
                        Categories
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/brands"} onClick={onClose}>
                        Brands
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>




                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/login"} onClick={onClose}>
                        Log in
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>


                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                      <Link href={"/register"} onClick={onClose}>
                        Register
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                </>



              }



            </NavigationMenuList>
          </NavigationMenu>
        </div>
    
    </>
  );
}
