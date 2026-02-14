"use client";
import { getUserToken } from "@/Helpers/accessToken";
import { CartResponseI } from "@/interfaces/Cart";
import { useSession } from "next-auth/react";

import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: CartResponseI | null;
  setCartData: (value: CartResponseI | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  loading: true,
  setLoading: () => {},
  getCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponseI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();

  async function getCart() {
    const token = await getUserToken();

    if (session.status === "authenticated") {
      {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          {
            method: "GET",
            headers: {
              token: token + "",
            },
          },
        );

        const data: CartResponseI = await response.json();

        setCartData(data);

        if (data?.cartId) {
          localStorage.setItem("cartId", data.cartId);
        }

        if (cartData?.data?.cartOwner) {
          localStorage.setItem("userId", cartData.data.cartOwner);
        }

        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getCart();
  }, [session.status]);

  return (
    <>
      <CartContext.Provider
        value={{ cartData, setCartData, loading, setLoading, getCart }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
