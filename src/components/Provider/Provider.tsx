'use client'
import Navbar from "@/components/Navbar/Navbar";

import CartContextProvider from "@/components/Context/CartContext";
import Footer from "@/components/Footer/Footer";

import { SessionProvider } from "next-auth/react";
import { Toaster } from '@/components/ui/sonner';



export default function Provider({children}: {children: React.ReactNode}) {
  return (
     <SessionProvider>
           <CartContextProvider>
          


            <Navbar />

            <main className="container mx-auto py-2">
              <Toaster position="top-center"  />
              {children}
            </main>
            <Footer />
          
        </CartContextProvider>

        </SessionProvider>
  )
}
