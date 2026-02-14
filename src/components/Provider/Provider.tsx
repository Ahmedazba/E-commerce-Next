"use client";
import { SessionProvider } from "next-auth/react";
import WishlistContextProvider from "../Context/wishlistContext";
import CartContextProvider from "../Context/CartContext";
import Footer from "../Footer/Footer";
import { Toaster } from "sonner";
import Navbar from './../Navbar/Navbar';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <Navbar />

          <main className="container mx-auto py-2">
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer />
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
