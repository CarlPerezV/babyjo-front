// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStarRating from "../hook/useStarRating";
import { useCart } from "../context/CartContext";
import { getProduct } from "../services/product.service";

const mapFromApi = (p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: Number(p.price || 0),
  image: p.image_url,
  rating: Number(p.rating || 0),
  sizes: Array.isArray(p.sizes)
    ? typeof p.sizes[0] === "object"
      ? p.sizes
          .filter((s) => Number(s?.stock ?? 0) > 0)
          .map((s) => String(s.size))
      : p.sizes.map((s) => String(s))
    : [],
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const stars = useStarRating(Number(product?.rating || 0));

  useEffect(() => {
    (async () => {
      try {
        const res = await getProduct(id);
        const apiProduct = res?.product || res;
        if (!apiProduct?.id) return navigate("/shop", { replace: true });
        setProduct(mapFromApi(apiProduct));
      } catch (e) {
        console.log(e);
        navigate("/shop", { replace: true });
      }
    })();
  }, [id, navigate]);

  if (!product) return <div>Cargando...</div>;

  const availableSizes = product.sizes;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
    setShowSizeError(false);
    setSelectedSize(null);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* Imagen del producto */}
        <section>
          <div className="aspect-square w-full overflow-hidden rounded-3xl bg-fuchsia-100 p-4 shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        </section>

        {/* Detalles del producto */}
        <section className="flex flex-col items-center gap-5 md:items-start">
          <h1 className="text-center text-3xl font-extrabold text-purple-900 md:text-left md:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">{stars}</div>
            <span className="rounded-md bg-pink-200 px-2 py-0.5 text-sm font-semibold text-purple-700">
              {Number(product.rating).toFixed(1)}
            </span>
          </div>

          {/* Precio */}
          <div className="text-2xl font-extrabold text-purple-900 md:text-3xl">
            ${product.price}
          </div>

          {/* Descripción */}
          <p className="max-w-prose text-center text-gray-700 md:text-left">
            {product.description ||
              `Este es un hermoso par de ${product.name}, ideal para niñas.`}
          </p>

          {/* Tallas */}
          <div className="w-full">
            <h2 className="text-center text-lg font-semibold text-gray-800 md:text-left">
              Selecciona talla:
            </h2>
            <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={[
                    "h-10 rounded-xl border-2 px-3 text-sm font-semibold transition",
                    selectedSize === size
                      ? "border-purple-700 bg-purple-200 text-purple-900"
                      : "border-fuchsia-300 bg-pink-100 text-purple-800 hover:bg-pink-200",
                  ].join(" ")}
                >
                  {size}
                </button>
              ))}
            </div>
            {showSizeError && (
              <p className="mt-1 text-center text-sm font-bold text-fuchsia-600 md:text-left">
                ⚠️ Por favor selecciona una talla
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <button
              onClick={handleAddToCart}
              className="w-full min-w-[220px] rounded-2xl bg-purple-700 px-6 py-3 text-white shadow transition hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none sm:w-auto"
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full min-w-[160px] rounded-2xl border border-pink-400 bg-white px-6 py-3 text-pink-600 shadow-sm transition hover:bg-pink-50 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:outline-none sm:w-auto"
            >
              Volver
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;
