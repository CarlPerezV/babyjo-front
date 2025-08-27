const BASE_URL = import.meta.env?.VITE_API_URL;
const API_URL = `${BASE_URL}/auth`;

export const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        let message = "Error en login";
        try {
            const error = await res.json();
            message = error?.message || error?.error || message;
        } catch {
            try {
                const text = await res.text();
                if (text) message = text;
            } catch {
                // Si todo falla, mantenemos el mensaje original
            }
        }
        throw new Error(message);
    }
    return res.json(); // { token, user }
};


export const register = async ({ firstName, lastName, email, password }) => {

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!res.ok) {
        let message = "Error al registrar usuario";
        try {
            const error = await res.json();
            message = error?.message || error?.error || message; // CAMBIO
        } catch {
            try {
                const text = await res.text();
                if (text) message = text; // fallback si el backend no envía JSON
            } catch {
                // Si todo falla, mantenemos el mensaje original
            }
        }
        throw new Error(message);
    }
    return res.json(); // esperado: { token, user }
};

export const getMe = async (token) => {
    const res = await fetch(`${API_URL}/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // CAMBIO
        },
    });

    if (!res.ok) {
        let error;
        try {
            error = await res.json();
        } catch {
            // Si todo falla, mantenemos el mensaje original
        }
        throw new Error(error?.message || error?.error || "No autorizado"); // CAMBIO
    }

    return res.json();
};