
import {  getUserToken } from "@/Helpers/accessToken";

export async function getWishList() {
  const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: { token: token + '' },
    });
    const data = await res.json();
    return data;

  
}

