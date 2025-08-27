
const BASE_URL = import.meta.env?.VITE_API_URL;
const API_URL = `${BASE_URL}/orders`;

function getToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || "";
}

export async function checkout(items, paymentMethod = "cash") {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ items, paymentMethod }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error en checkout");
    }
    return res.json(); // { order, items }
}

const mapOrderFromApi = (o) => ({
    id: o.id,
    createdAt: o.created_at,
    total: Number(o.total_amount ?? o.total ?? 0),
    status: o.status,
    paymentMethod: o.payment_method,
});

export async function listMyOrders() {
    const url = `${API_URL}/orders/mine`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        },
    });

    if (!res.ok) {
        // Propaga el status para poder redirigir a /login en 401
        const errBody = await res.json().catch(() => ({}));
        const error = new Error(errBody?.message || `HTTP ${res.status}`);
        error.status = res.status;
        throw error;
    }

    const data = await res.json();
    const orders = Array.isArray(data.orders) ? data.orders : [];
    return orders.map(mapOrderFromApi);
}