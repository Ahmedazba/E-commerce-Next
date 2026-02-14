'use server';
import { getUserToken } from "@/Helpers/accessToken";



export async function addItemToCart(productId: string) {
    const token = await getUserToken();


    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "POST",
        headers: {
            token:
                token + '',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
    });

    const data = await response.json();
    return data;

}