'use server'
export default async function verifyResetPassword(resetCode: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        method: 'POST',
        body: JSON.stringify({ resetCode }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
