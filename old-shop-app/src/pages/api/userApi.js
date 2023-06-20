export const Auth = async (token) => {
    const response = await fetch('http://localhost:5000/api/user/auth', {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    const responseJSON = await response.json()
    return responseJSON;
}