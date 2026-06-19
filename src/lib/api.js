const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

export async function getAuthToken() {
    const res = await fetch("/api/auth/token", {
        credentials: "include",
    });
    const data = await res.json();
    return data.token;
}

export async function authFetch(url, options = {}) {
    const token = await getAuthToken();

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}
