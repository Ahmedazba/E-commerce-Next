"use client";
import { HeartIcon, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { toast } from "sonner";
import { CartContext } from "../context/CartContext";

export default function AddToCart({ productId }: { productId: string }) {
  const { setCartData } = useContext(CartContext);
  const [isloading, setIsloading] = useState(false);
  async function addProductToCart() {
    setIsloading(true);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2JlMzEyYzUzODE4YjBiZmMyNDVhMSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NzI2ODExLCJleHAiOjE3Nzc1MDI4MTF9.MnrO_19FXqUzZPLpIyDySjEHTZWFlk3dkXlzcMe1YI8",
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    (data.status == "success" && toast.success("product added successfuly", {position:"top-center" }),
      setCartData(data));
    console.log(data);
    setIsloading(false);
  }

  return (
    <>
      <CardFooter className="gap-2">
        <Button
          onClick={addProductToCart}
          className="grow h-10 text-lg rounded-2xl font-semibold cursor-pointer transition-all"
          disabled={isloading}
        >
          {isloading ? <Loader2 className="animate-spin" /> : "Add To Cart"}
        </Button>
        <HeartIcon />
      </CardFooter>
    </>
  );
}
