import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-100 to-fuchsia-100">
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="container mx-auto flex flex-col items-center justify-between px-6 py-12 md:flex-row">
          {/* Logo and Text */}
          <div className="mb-12 md:mb-0 md:w-1/2">
            <div className="relative flex flex-col items-center">
              {/* Logo */}
              <div className="mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-full shadow-xs md:mx-0">
                <img
                  className="w-full rounded-full object-cover p-2"
                  src="/logo.png"
                  alt="Logo BabyJo"
                />
              </div>

              {/* Frase inspiradora */}
              <div className="relative z-10 max-w-md rounded-lg bg-white p-8 shadow-xl">
                <h1 className="mb-4 font-serif text-3xl font-light text-gray-800 md:text-4xl">
                  Pequeños{" "}
                  <span className="font-bold text-pink-500">pasos,</span>{" "}
                  Grandes{" "}
                  <span className="font-bold text-pink-500">sueños.</span>
                </h1>
                <p className="mb-6 text-gray-600">
                  Nuestro calzado no solo viste los pequeños pies, sino que
                  inspira grandes aventuras. Cada diseño cuenta una historia y
                  cada paso es una oportunidad para brillar.
                </p>
                <Link
                  to="/shop"
                  className="transform rounded-full bg-pink-500 px-6 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-pink-600 focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:outline-none"
                >
                  Descubre la Colección
                </Link>
              </div>
            </div>
          </div>

          {/* Imagen de producto */}
          <div className="flex justify-center md:w-1/2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 z-0 h-80 w-80 rounded-full bg-pink-100 opacity-80"></div>
              <div className="absolute -right-10 -bottom-10 z-0 h-80 w-80 rounded-full bg-pink-200 opacity-80"></div>
              <div className="relative z-10">
                <div className="flex h-96 w-96 items-center justify-center rounded-3xl bg-white shadow-xl">
                  <img
                    className="w-full rounded-3xl object-cover"
                    src="/product_001.PNG"
                    alt="Calzado BabyJo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
