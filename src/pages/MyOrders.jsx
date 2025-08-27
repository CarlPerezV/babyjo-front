import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const fmt = (n) => Number(n || 0).toLocaleString("es-CL");

export default function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    (async () => {
      try {
        setStatus({ loading: true, error: "" });
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // CAMBIO: fuerza login si no hay token
          return;
        }
        const res = await fetch(`${API_URL}/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) {
            navigate("/login");
            return;
          }
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || "Error cargando compras");
        }
        const data = await res.json();
        setOrders(data.orders || []);
        setStatus({ loading: false, error: "" });
      } catch (e) {
        setStatus({ loading: false, error: e.message });
      }
    })();
  }, [navigate]);

  if (status.loading) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center p-6">
        <div className="animate-pulse rounded-lg bg-fuchsia-100 px-4 py-2 text-purple-800">
          Cargando tus compras…
        </div>
      </main>
    );
  }
  if (status.error) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-5xl place-items-center p-6">
        <div className="rounded-lg bg-red-100 px-4 py-2 text-red-700">
          {status.error}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-purple-700">Mis compras</h1>

      {orders.length === 0 ? (
        <div className="rounded-lg bg-fuchsia-50 p-4 text-purple-700">
          Aún no tienes compras registradas.
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li
              key={o.id}
              className="rounded-xl border border-fuchsia-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold text-purple-800">
                  Orden #{o.id}
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(o.order_date).toLocaleString()}
                </div>
                <div className="rounded-md bg-pink-100 px-2 py-0.5 text-sm font-medium text-pink-700">
                  {o.status}
                </div>
              </div>

              <div className="mb-3 text-sm text-gray-700">
                Método de pago: <b>{o.payment_method}</b>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2">Producto</th>
                      <th className="py-2">Talla</th>
                      <th className="py-2">Cant.</th>
                      <th className="py-2">Precio</th>
                      <th className="py-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(o.items || []).map((it, idx) => (
                      <tr key={idx} className="border-b last:border-b-0">
                        <td className="py-2">{it.name}</td>
                        <td className="py-2">{it.size}</td>
                        <td className="py-2">{it.quantity}</td>
                        <td className="py-2">${fmt(it.unit_price)}</td>
                        <td className="py-2">${fmt(it.line_total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-right text-lg font-bold text-purple-700">
                Total: ${fmt(o.total)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
