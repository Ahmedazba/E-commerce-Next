"use client";
import Loading from "@/app/loading";
import { Checkout } from "@/components/Checkout/Checkout";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { getUserToken } from "@/Helpers/accessToken";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { Loader2, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";


export default function Cart() {
  const { cartData, loading, getCart, setCartData } = useContext(CartContext);
  const [removed, setRemoved] = useState<string | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);
  const [removeAllItems, setRemoveAllItems] = useState<boolean>(false);
  const [shopping, setShopping] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (
      !cartData?.data?.products ||
      cartData.data.products.length === 0 ||
      typeof cartData?.data?.products?.[0]?.product === "string"
    ) {
      getCart();
    }
  }, [cartData, getCart]);

  async function removeCartItem(productId: string) {
    const token = await getUserToken();
    setRemoved(productId);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: { token: token + "" },
      },
    );

    const data = await response.json();
    toast.success("Product deleted successfully");
    setCartData(data);
    setRemoved(null);
  }

  async function updateCartItemQuantity(productId: string, count: number) {
    const token = await getUserToken();
    setUpdated(productId);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token + "",
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    toast.success("Product updated successfully");
    setCartData(data);
    setUpdated(null);
  }

  async function removeCart() {
    const token = await getUserToken();
    setRemoveAllItems(true);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        method: "DELETE",
        headers: { token: token + "" },
      },
    );

    await response.json();
    setCartData(null);
    setRemoveAllItems(false);
  }

  const hasProducts =
    cartData?.data?.products && cartData.data.products.length > 0;

  return (
    <>
      {loading ? (
        <Loading />
      ) : hasProducts ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">
            {cartData?.numOfCartItems} items in your cart
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data?.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                >
                  <Image
                    height={400}
                    width={400}
                    src={item.product?.imageCover ?? ""}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                    alt={item.product?.title ?? ""}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product?.brand?.name} ·{" "}
                          {item.product?.category?.name}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-semibold">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.count - 1,
                            )
                          }
                          disabled={item.count === 1}
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                          –
                        </button>

                        <span className="w-6 text-center font-medium">
                          {updated === item.product.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            item.count
                          )}
                        </span>

                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product.id,
                              item.count + 1,
                            )
                          }
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeCartItem(item.product.id)}
                        aria-label="remove"
                        className="text-destructive hover:underline text-sm cursor-pointer"
                      >
                        {removed === item.product.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Remove"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-18">
              <div className="rounded-xl border p-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({cartData?.numOfCartItems} items)
                    </span>
                    <span className="font-medium">
                      {formatCurrency(cartData?.data?.totalCartPrice ?? 0)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="border-t my-4"></div>

                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(cartData?.data?.totalCartPrice ?? 0)}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <Checkout cartId={localStorage.getItem("cartId") ?? ""} />

                  <button
                    onClick={() => router.push("/products")}
                    className="cursor-pointer w-full rounded-full border py-3 font-medium hover:bg-gray-50 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <Button
                onClick={removeCart}
                variant={"outline"}
                className="cursor-pointer text-destructive hover:text-destructive mt-2 flex ms-auto"
              >
                {removeAllItems ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}{" "}
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[150px] flex-col text-center space-y-4">
          <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
          <Button
            onClick={() => router.push("/products")}
            className="cursor-pointer"
          >
            Go Shopping
          </Button>
        </div>
      )}
    </>
  );
}
