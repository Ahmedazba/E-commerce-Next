

'use server'

export async function signUp(userData: RegisterDataI) {
    const response = await fetch(`${process.env.URL_API}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        } 
    }
);
    const data = await response.json();
    return data;
}