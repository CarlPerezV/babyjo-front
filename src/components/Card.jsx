import { Link } from "react-router-dom";
import useStarRating from "../hook/useStarRating";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Card = ({ product }) => {
  const [showSizeError, setShowSizeError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  // Hook para mostrar estrellas según rating
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
    <div className="w-full rounded-2xl border-2 border-purple-600 bg-fuchsia-200 p-4 shadow-sm">
      <Link
        className="block h-56 overflow-hidden rounded-2xl"
        to={`/shop/${product.id}`}
      >
        <img
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          src={product.image}
          alt={product.name}
        />
      </Link>
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        <Link to={`/shop/${product.id}`}>
          <h5 className="line-clamp-2 text-lg font-semibold tracking-tight text-purple-700">
            {product.name}
          </h5>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {stars}
          </div>
          <span className="ms-3 rounded-sm bg-pink-300 px-2.5 py-0.5 font-bold text-purple-500">
            {product.rating}
          </span>
        </div>

        <div className="my-2 flex flex-wrap justify-center gap-1">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-7 w-7 rounded-md border-2 text-xs transition-colors hover:bg-purple-400 ${
                selectedSize === size
                  ? "border-purple-700 bg-purple-200 font-bold"
                  : "border-fuchsia-300 bg-pink-200"
              } text-sm`}
            >
              {size}
            </button>
          ))}
        </div>
        {showSizeError && (
          <p className="mb-2 animate-pulse text-xs font-bold text-fuchsia-600">
            ⚠️ Debes seleccionar una talla ⚠️
          </p>
        )}

        <div className="flex items-center justify-around align-middle">
          <span className="text-xl font-bold text-purple-700">
            ${product.price}
          </span>
          <div className="mt-auto pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-purple-700 px-3 py-2 text-sm font-medium text-white hover:bg-purple-400 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
