'use server'
export default async function resetPassword(email: string, newPassword: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        method: 'PUT',
        body: JSON.stringify({ email, newPassword }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
