
'use server'

import { getUserToken } from "@/Helpers/accessToken";

export default async function addAddress(shippingAddress: unknown) {
    const token = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        method: 'POST',
        body: JSON.stringify({ shippingAddress }),
        headers: {
            token: token + '',
            "Content-Type": 'application/json'
        }
    })
    const data = await response.json();
    return data;
}