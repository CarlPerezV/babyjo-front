// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "../data/Products";
import useStarRating from "../hook/useStarRating ";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);

  const product = Products.find((product) => product.id === parseInt(id));

  const stars = useStarRating(product.rating);
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
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-8 p-4 md:flex-row md:p-8">
      {/* Imagen del producto */}
      <div className="max-w-md flex-1">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto w-full rounded-xl object-cover shadow-lg md:max-w-md"
        />
      </div>

      {/* Detalles del producto */}
      <div className="max-w-md flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-purple-700 md:text-3xl">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">{stars}</div>
          <span className="rounded-sm bg-pink-300 px-2 py-0.5 text-sm font-bold text-purple-500">
            {product.rating}
          </span>
        </div>

        {/* Tallas */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Selecciona talla:
          </h2>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-9 w-9 rounded-md border-2 text-sm transition-colors hover:bg-purple-400 ${
                  selectedSize === size
                    ? "border-purple-700 bg-purple-200 font-bold"
                    : "border-fuchsia-300 bg-pink-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {showSizeError && (
            <p className="animate-pulse text-sm font-bold text-fuchsia-600">
              ⚠️ Por favor selecciona una talla
            </p>
          )}
        </div>

        {/* Descripción */}
        <p className="text-gray-600">
          {product.description ||
            `Este es un hermoso par de ${product.name}, ideal para niñas.`}
        </p>

        {/* Precio */}
        <p className="text-2xl font-bold text-purple-700">${product.price}</p>

        {/* Botones */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-purple-700 px-6 py-2 text-white transition-colors hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
          >
            Agregar al carrito
          </button>
          <button
            onClick={() => navigate(-1)}
            className="rounded-lg border border-pink-500 bg-white px-6 py-2 text-pink-500 transition-colors hover:bg-pink-50 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
