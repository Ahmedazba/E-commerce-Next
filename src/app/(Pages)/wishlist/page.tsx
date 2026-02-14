"use client";
import React, { useContext, useEffect } from "react"; 
import Loading from "@/app/loading";
import { toast } from "sonner";
import { removeItemFromWishlist } from "./_action/removeItemFromWishlist.action";
import AllProducts from "@/components/AllProducts/AllProducts";
import { WishlistContext } from "@/components/Context/wishlistContext";

export default function WishlistPage() {

  const { wishlisData, setWishlisData, getUserWishlist } = useContext(WishlistContext);

  useEffect(() => {
    getUserWishlist();
  }, []);

  const removeFromWishlist = async (id: string) => {
    try {
      const data = await removeItemFromWishlist(id);
      if (data.status === "success") {
        toast.success(data.message);
        

        if (wishlisData) {
          const updatedList = wishlisData.data.filter((item) => item._id !== id);
          setWishlisData({ ...wishlisData, data: updatedList, count: updatedList.length });
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };


  if (!wishlisData) return <Loading />;

  return (
    <>
      {wishlisData.data.length === 0 ? (
        <p className="text-center flex items-center justify-center h-[400px] text-gray-500 mt-10">
          No items in your wishlist.
        </p>
      ) : (
        <AllProducts
  products={wishlisData.data as any} 
  fromWishlist
  removeFromWishlist={removeFromWishlist}
/>
      )}
    </>
  );
}