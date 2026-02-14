"use client";

import Loading from "@/app/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserOrdersI } from "@/interfaces/userOrders";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Allorders() {
  const [orders, setOrders] = useState<UserOrdersI[]>([]);
  const [loading, setLoading] = useState(true);
  async function getUserOrders() {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("userId")}`,
    );
    const data: UserOrdersI[] = await response.json();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : Array.isArray(orders) && orders.length > 0 ? (
        <div className="p-4 md:p-6 space-y-6">
          <h1 className="text-xl md:text-2xl font-bold">My Orders</h1>

          {orders.map((order) => (
            <Card key={order.id} className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span>
                    Order #{order.id} •{" "}
                    <span
                      className={`${
                        order.isPaid ? "text-green-600" : "text-red-600"
                      } font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </span>{" "}
                    •{" "}
                    <span
                      className={`${
                        order.isDelivered ? "text-green-600" : "text-yellow-600"
                      } font-medium`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </span>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* User Info */}
                  <div className="space-y-1">
                    <h2 className="font-semibold">Customer Info</h2>
                    <p>{order.user.name}</p>
                    <p className="text-sm text-gray-600">{order.user.email}</p>
                    <p className="text-sm">{order.user.phone}</p>
                  </div>

                  {/* Shipping Info */}
                  <div className="space-y-1">
                    <h2 className="font-semibold">Shipping Address</h2>
                    <p>{order.shippingAddress?.city || "No city provided"}</p>
                    <p>{order.shippingAddress?.phone || "No phone provided"}</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress?.details || "No details provided"}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <h2 className="font-semibold mb-2">Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-xl p-3 shadow-sm flex flex-col items-center text-center"
                      >
                        <Image
                          height={400}
                          width={400}
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg"
                        />
                        <h3 className="text-sm font-semibold mt-2 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {item.product.brand.name}
                        </p>
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          {item.price} EGP × {item.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-3 text-sm sm:text-base">
                  <p>Tax: {order.taxPrice} EGP</p>
                  <p>Shipping: {order.shippingPrice} EGP</p>
                  <p className="font-bold text-lg">
                    Total: {order.totalOrderPrice} EGP
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center flex items-center justify-center h-[400px] text-gray-500 mt-10">
          No items in your All Orders.
        </p>
      )}
    </>
  );
}
