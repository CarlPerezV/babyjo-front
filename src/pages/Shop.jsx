// import { Products } from "../data/Products";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { listProducts } from "../services/product.service";

const mapProductFromApi = (p) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  price: Number(p.price),
  // tu backend devuelve image_url; el Card usa "image"
  image:
    typeof p.image_url === "string" && p.image_url.startsWith("http")
      ? p.image_url
      : `/${p.image_url || "placeholder.png"}`,
  // tu backend devuelve sizes como [{size, stock}]
  // el Card espera un array de tallas (strings) -> filtramos por stock > 0
  sizes: Array.isArray(p.sizes)
    ? p.sizes.filter((s) => (s?.stock ?? 0) > 0).map((s) => String(s.size))
    : [],
  // por si en el futuro devuelves rating desde el back:
  rating: p.rating ?? undefined,
});

const Shop = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [search, setSearch] = useState("");

  // Función para actualizar la talla seleccionada
  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        setStatus({ loading: true, error: "" });
        const { products } = await listProducts({ limit: 50, offset: 0 });
        setProducts(products.map(mapProductFromApi));
        setStatus({ loading: false, error: "" });
      } catch (e) {
        setStatus({
          loading: false,
          error: e.message || "Error cargando productos",
        });
      }
    })();
  }, []);

  const displayed = products.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  if (status.loading) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-fuchsia-50">
        <div className="animate-pulse text-purple-700">Cargando productos…</div>
      </main>
    );
  }

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="m-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5">
        {displayed.map((product) => (
          <Card
            key={product.id}
            product={product}
            selectedSize={selectedSizes[product.id] || null}
            onSizeSelect={(size) => handleSizeSelect(product.id, size)}
          />
        ))}
      </div>
      {displayed.length === 0 && (
        <p className="mt-6 text-center text-purple-700">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      )}
    </main>
  );
};

export default Shop;
