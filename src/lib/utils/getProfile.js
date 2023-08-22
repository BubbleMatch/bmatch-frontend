
export async function getProfile(token) {
    let apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/api/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    switch (response.status) {
        case 500:
            alert("Server error" + await response.json().message);
            return null;
        case 401:
            window.location.href = '/login';
            return null;
        case 200:
            return response.json();
        default:
            return null;
    }
}