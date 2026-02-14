"use client";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import Loading from "@/app/loading";
import { getWishList } from "./_action/getWishList.action";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { removeItemFromWishlist } from "./_action/removeItemFromWishlist.action";
import AllProducts from "@/components/AllProducts/AllProducts";

import { ProducrI } from "@/interfaces/product";



export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<ProducrI[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const session = useSession();
  const router = useRouter();

  // 🟢 Get wishlist on mount
  useEffect(() => {
    async function fetchWishlist() {
      if (session.status == 'authenticated') {
        try {

          const data = await getWishList();
          if (data.status === "success") {
            setWishlist(data.data);
       
          }
        } catch (err) {
          console.error("Error fetching wishlist", err);
        } finally {
          setLoading(false);
        }


      }
    }
    fetchWishlist();
  }, []);

  // 🟢 Remove from wishlist
  const removeFromWishlist = async (id: string) => {

    setRemoving(id);
    try {
      const data = await removeItemFromWishlist(id);
      if (data.status === "success") {
        toast.success(data.message);
        setWishlist((prev) => prev.filter((item) => item._id  !== id));

      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setRemoving(null);
    }
  };


  return <>



    {loading ? <Loading /> : wishlist.length === 0 ? <p className="text-center flex items-center justify-center h-[400px] text-gray-500 mt-10">No items in your wishlist.</p> :

      <AllProducts products={wishlist} fromWishlist removeFromWishlist={removeFromWishlist}
        removingId={removing} />
    }


  </>



}
