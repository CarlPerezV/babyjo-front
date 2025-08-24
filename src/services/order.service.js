// src/services/order.service.js
// CAMBIO: servicio de checkout
const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";
const API_URL = `${BASE_URL}/orders`;

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
