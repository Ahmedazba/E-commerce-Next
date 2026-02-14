"use client";

import { getUserToken } from "@/Helpers/accessToken";
import { ProductI } from "@/interfaces/product";
import { WishlistI } from "@/interfaces/wishlist";

import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext <{
  wishlisData : WishlistI | null ,
  setWishlisData : (value: WishlistI | null) => void,
  getUserWishlist : () => void

}>({wishlisData : null , 
    setWishlisData : ()=>{},
    getUserWishlist : () => {}
});

export default  function WishlistContextProvider({ children }: { children: ReactNode }) {
  
  const [wishlisData, setWishlisData] = useState<WishlistI | null>(null);
  
  
  async function getUserWishlist() {
    const token = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        headers:{
            token : token+""
        }
       });
    const data : WishlistI = await response.json();
    console.log(data);
    setWishlisData(data);
  
    
    
  }
  
 useEffect(()=>{getUserWishlist()},[]);
  return (
    <>
      <WishlistContext.Provider value={{wishlisData ,setWishlisData , getUserWishlist}}>
        {children}
        </WishlistContext.Provider>
    </>
  );
}


