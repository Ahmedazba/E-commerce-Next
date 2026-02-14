

'use server'

import { getUserToken } from "@/Helpers/accessToken"




export async function updateProfile(userData: EditProfileI) {
    const token = await getUserToken();
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
        method: 'PUT',
        body: JSON.stringify(userData ),
        headers: {
            token:  token + '',
            'Content-Type': 'application/json'
        }
    })
    const data = await res.json();
    
    return data;
}