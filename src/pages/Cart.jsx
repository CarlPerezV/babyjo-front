import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext.jsx";
import { checkout } from "../services/order.service.js";

const Cart = () => {
  const { cart, totalPrice, removeFromCart, clearCart, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "false,",
  });

  const fmt = (n) => Number(n || 0).toLocaleString("es-CL");

  const handlePay = async () => {
    const token = sessionStorage.getItem("token");
    if (!user && !token) {
      // no logueado → redirige a /login y vuelve luego a /cart
      navigate("/login", { state: { from: "/cart" }, replace: true });
      return;
    }
    try {
      setStatus({ loading: true, error: "", success: "" });

      // Mapeo al payload que espera el backend:
      // items: [{ productId, size, quantity }]
      const payloadItems = cart.map((it) => ({
        productId: it.product.id ?? it.productId,
        size: it.size,
        quantity: it.quantity,
      }));

      const { order } = await checkout(payloadItems, "cash"); // "cash" por ahora
      setStatus({
        loading: false,
        error: "",
        success: `¡Pago exitoso! Orden #${order.id} por $${fmt(order.total_amount)}.`,
      });

      clearCart();
      // Si quieres redirigir:
      // navigate(`/order/${order.id}`);
    } catch (e) {
      setStatus({
        loading: false,
        error: e.message || "Error al procesar el pago",
        success: "",
      });
    }
  };

  return (
    <div className="flex min-h-screen p-6">
      {/* Sección principal del carrito (70%) */}
      <div
        className={`w-full pr-6 ${cart.length > 0 ? "lg:w-7/12" : "lg:w-full"}`}
      >
        <h2 className="mb-6 text-3xl font-bold text-purple-700">
          🛒 Carrito de Compras
        </h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-lg text-gray-600">Tu carrito está vacío</p>
            <button
              className="rounded-lg bg-purple-600 px-6 py-2 text-white hover:bg-purple-500"
              onClick={() => navigate(-1)}
            >
              Volver a la tienda
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => {
              const unitPrice = item.product.price;
              const totalPrice = unitPrice * item.quantity;
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-fuchsia-50 p-4 shadow-sm md:mx-20"
                >
                  <div className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-md">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-purple-800">
                          {item.product.name}
                        </h3>
                        <span className="inline-flex h-6 items-center justify-center rounded-md bg-purple-100 px-2 text-sm font-medium text-purple-800">
                          Talla: {item.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.size)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.product, item.size)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <span className="text-lg font-semibold">
                      {`$${fmt(totalPrice)}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sección de boleta */}
      {cart.length > 0 && (
        <div className="hidden lg:block lg:w-5/12 lg:pl-6">
          <div className="sticky top-6 rounded-lg border border-gray-200 bg-fuchsia-50 p-6 shadow-sm">
            <h3 className="mb-6 text-2xl font-bold text-purple-700">
              Resumen de Compra
            </h3>

            {status.error && (
              <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-red-700">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="mb-3 rounded-md bg-green-50 px-3 py-2 text-green-700">
                {status.success}
              </div>
            )}

            <div className="space-y-4">
              {cart.map((item) => (
                <>
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Talla: {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </>
              ))}
            </div>

            <div className="my-6 border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-purple-700">${fmt(totalPrice())}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white hover:bg-purple-500"
            >
              {status.loading ? "Procesando..." : "Proceder al Pago"}
            </button>

            <button
              onClick={clearCart}
              className="mt-3 w-full rounded-lg border border-red-500 py-2 font-medium text-red-500 hover:bg-red-50"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
