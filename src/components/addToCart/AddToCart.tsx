"use client";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Heart, Loader2, ShoppingCartIcon } from "lucide-react";
import { CardFooter } from "../ui/card";


import { toast } from "sonner";
import { CartContext } from "../Context/CartContext";

import { addProductToWishlist } from "@/app/(pages)/wishlist/_action/addProductToWishlist";
import { useSession } from "next-auth/react";
import { addItemToCart } from "@/app/(pages)/products/_action/addItemToCart.action";
;



export default function AddToCart({ productId , fromWishlist}: { productId: string , fromWishlist : boolean}) {


  const { setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const session = useSession();





  async function addProductToCart() {

    if (session.status == 'authenticated') {
      setIsLoading(true);
      const data = await addItemToCart(productId);



      setCartData(data);
      data.status == "success" && toast.success(data.message);
      setIsLoading(false);

    } else {
      toast.error('You must be logged in to add to cart');
    }
  }



  async function addToWishlist() {

    if (session.status == 'authenticated') {
      const data = await addProductToWishlist(productId);
      if (data.status == "success") {
        toast.success(data.message);
        setFavorite(true);
      } else {

        toast.error(data.message);
      }


    } else {
      toast.error('You must be logged in to add to wishlist');
    }









  }







  return (
    <>
      <CardFooter className="cursor-pointer">
        <Button onClick={addProductToCart} className="cursor-pointer grow">
          {" "}
          {isLoading ? <Loader2 className="animate-spin" /> : <ShoppingCartIcon />} Add To Cart
        </Button>

        {/* <Heart className="fill-black" onClick={removeProductToWishlist} /> */}
        {!fromWishlist && <Heart onClick={addToWishlist} />}
        



      </CardFooter>
    </>
  );
}



