export async function getProfile(token) {
    const response = await fetch('http://localhost:8002/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if(response.status === 500){
        return null;
    }
    return response.json();
}