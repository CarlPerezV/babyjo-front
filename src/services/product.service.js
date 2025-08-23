// NUEVO: src/services/product.service.js
const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:4000";
const API_URL = `${BASE_URL}/products`;

const parseError = async (res, fallback) => {
    let message = fallback;
    try {
        const j = await res.json();
        message = j?.message || j?.error || message;
    } catch {
        try {
            const t = await res.text();
            if (t) message = t;
        } catch {
            // Si todo falla, mantenemos el mensaje original
        }
    }
    return message;
};

export const listProducts = async ({ limit = 12, offset = 0 } = {}) => {
    const qs = new URLSearchParams({ limit, offset }).toString();
    const res = await fetch(`${API_URL}?${qs}`);
    if (!res.ok) throw new Error(await parseError(res, "Error listando productos"));
    return res.json();
};

export const getProduct = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
        let msg = "Error obteniendo producto";
        try {
            const j = await res.json();
            msg = j?.message || j?.error || msg;
        } catch {
            // Si todo falla, mantenemos el mensaje original
        }
        throw new Error(msg);
    }
    // esperado: { product: {...} }
    return res.json();
};
