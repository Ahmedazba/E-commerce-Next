"use client";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData:CartResponse|null,
    setCartData:(value:CartResponse|null)=>void ,
    isloading:boolean,
    setIsloading:(value:boolean)=>void,
    getCart:()=>void

}>({
    cartData:null,
    setCartData:()=>{},
    isloading: false,
    setIsloading:()=>{},
    getCart:()=>{}

});

export default function CartContextProvider({children,}: {children: ReactNode;}) {
  const [cartData, setCartData] = useState<CartResponse|null>(null);
  const [isloading, setIsloading] = useState(false)
  async function getCart() {
    setIsloading(true)
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2JlMzEyYzUzODE4YjBiZmMyNDVhMSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NzI2ODExLCJleHAiOjE3Nzc1MDI4MTF9.MnrO_19FXqUzZPLpIyDySjEHTZWFlk3dkXlzcMe1YI8",
        },
      },
    );
    const data:CartResponse = await response.json();
    setCartData(data)
    console.log(data);
    setIsloading(false)
  }
  useEffect(() => {
    getCart();
  }, []);
  return <CartContext.Provider value={{cartData , setCartData ,isloading ,setIsloading , getCart}}>{children}</CartContext.Provider>;
}
