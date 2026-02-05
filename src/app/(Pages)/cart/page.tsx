"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartContext } from "@/components/context/CartContext";
import Loading from "@/app/loading";
import Link from "next/link";
import { CartResponse } from "@/interfaces";
import { toast } from "sonner";
import CheckOut from "@/components/CheckOut/CheckOut";

export default function Cart() {
  const { cartData, isloading, getCart, setCartData } = useContext(CartContext);
  const [removeload, setRemoveLoad] = useState<null | string>(null);
  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [isClear, setIsClear] = useState<boolean>(false);
  console.log(cartData);

  useEffect(() => {
    if (
      typeof cartData?.data.products[0]?.product == "string" ||
      cartData == null
    ) {
      getCart();
    }
  }, []);

  const getHeader = () => ({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2JlMzEyYzUzODE4YjBiZmMyNDVhMSIsIm5hbWUiOiJBaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY5NzI2ODExLCJleHAiOjE3Nzc1MDI4MTF9.MnrO_19FXqUzZPLpIyDySjEHTZWFlk3dkXlzcMe1YI8",
    "content-type": "application/json",
  });
  // Remove All Cart
  async function clearCart() {
    setIsClear(true);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        method: "DELETE",
        headers: getHeader(),
      },
    );
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.message == "success") {
      toast.success("Clear Cart ", {
        position: "top-center",
        className: "bg-red-600! text-white!",
      });
      setCartData(null);
    }
    setIsClear(false);
  }
  // Remove item
  async function removeCartItem(productId: string) {
    setRemoveLoad(productId);
    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          method: "DELETE",
          headers: getHeader(),
        },
      );
      const data: CartResponse = await response.json();
      console.log(data);
      if (data.status == "success") {
        toast.success("Deleted Item", {
          position: "top-center",
          className: "bg-red-600! text-white!",
        });
        setCartData(data);
      }
    } catch (error) {
      toast.error("faild Deleted", {
        position: "top-center",
        className: "bg-red-600! text-white!",
      });
    } finally {
      setRemoveLoad(null);
    }
  }
  // update quantity item
  async function updateCartItem(productId: string, count: number) {
    if (count < 1) return;
    setUpdatingId(productId);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: getHeader(),
      },
    );
    const data: CartResponse = await response.json();
    console.log(data);
    if (data.status == "success") {
      toast.success("Updated Quantity 👍", {
        position: "top-center",
        className: "bg-emerald-600! text-white!",
      });
      setCartData(data);
    }
    setUpdatingId(null);
  }

  

  return (
    <>
      {isloading || typeof cartData?.data.products[0]?.product == "string" ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className=" py-5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 ">Shopping Cart</h1>
            <p className="mb-3 mt-1.5 text-muted-foreground">
              {cartData?.numOfCartItems} items in your Cart
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Cart Items Section */}
              <div className="lg:col-span-8">
                {cartData?.data.products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl my-2 shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <ul className="divide-y divide-gray-100">
                      <li className="p-6 flex flex-col sm:flex-row items-center gap-6">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover bg-gray-100 "
                        />

                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.product.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-4">
                            {item.product.brand.name} .{" "}
                            {item.product.category.name}
                          </p>

                          <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                              <Button
                                disabled={item.count == 1}
                                onClick={() =>
                                  updateCartItem(
                                    item.product.id,
                                    item.count - 1,
                                  )
                                }
                                className="p-1 bg-transparent text-black hover:text-emerald-600 hover:bg-transparent transition-colors cursor-pointer"
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {updatingId == item.product.id ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  item.count
                                )}
                              </span>
                              <Button
                                disabled={updatingId == item.product.id}
                                onClick={() =>
                                  updateCartItem(
                                    item.product.id,
                                    item.count + 1,
                                  )
                                }
                                className="p-1 bg-transparent text-black hover:text-emerald-600 hover:bg-transparent transition-colors cursor-pointer"
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                            <Button
                              disabled={removeload == item.product.id}
                              onClick={() => removeCartItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500 bg-transparent hover:bg-transparent cursor-pointer transition-colors"
                            >
                              {removeload == item.product.id ? (
                                <Loading />
                              ) : (
                                <Trash2 size={20} />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            $ {item.price * item.count}
                          </p>
                          <p className="text-xs text-gray-400">
                            $ ({item.price}) price each
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        $ {cartData?.data.totalCartPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping estimate</span>
                      <span className="font-medium text-gray-900">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between">
                      <span className="text-lg font-bold">Order total</span>
                      <span className="text-lg font-bold text-emerald-600">
                        $ {cartData?.data.totalCartPrice}
                      </span>
                    </div>
                  </div>

                  <Link href={"/products"}>
                    <Button className="w-full font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-gray-100 mb-4 cursor-pointer">
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <CheckOut cartId={cartData?.cartId!}/>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span>Secure payment processed by Stripe</span>
                    </div>
                  </div>
                </div>
                <div className="text-right my-2">
                  <Button
                    onClick={clearCart}
                    disabled={isClear}
                    className="bg-red-600 w-full hover:bg-red-700 cursor-pointer"
                  >
                    Clear All Cart{" "}
                    {isClear ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Trash2 />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
          <ShoppingBag size={64} className="text-gray-300" />
          <h2 className="text-2xl font-bold">Your Cart Is Empty</h2>
          <p className="text-muted-foreground">
            You have not added any products yet.
          </p>
          <Link href="/products">
            <Button className="cursor-pointer">Start Shopping</Button>
          </Link>
        </div>
      )}
    </>
  );
}
