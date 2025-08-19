import { Products } from "../data/Products";
import Card from "../components/Card";
import { useState } from "react";

const Shop = () => {
  const [selectedSizes, setSelectedSizes] = useState({});

  // Función para actualizar la talla seleccionada
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-purple-700">
          Nuestros Productos
        </h1>

        <div className="relative w-64">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-purple-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-purple-700 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search products..."
          />
        </div>
      </div>
      <div className="m-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5">
        {Products.map((product) => (
          <Card
            key={product.id}
            product={product}
            selectedSize={selectedSizes[product.id] || null}
            onSizeSelect={(size) => handleSizeSelect(product.id, size)}
          />
        ))}
      </div>
    </main>
  );
};

export default Shop;
