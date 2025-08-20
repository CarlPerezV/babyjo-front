import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-fuchsia-200">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2">
        <Link to={"/"} className="flex items-center">
          <span className="font-serif text-2xl font-semibold text-purple-500 md:text-3xl">
            BabyJo
          </span>
        </Link>

        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <Link
            to="/cart"
            className="relative mr-4 text-purple-700 hover:text-pink-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              type="button"
              className="flex rounded-full text-sm focus:ring-4 focus:ring-pink-300 md:me-0"
              id="user-menu-button"
              aria-expanded={isUserDropdownOpen}
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-15 rounded-full"
                src="/logo.png"
                alt="user photo"
              />
            </button>

            <div
              className={` ${isUserDropdownOpen ? "absolute" : "hidden"} ring-opacity-5 right-0 z-50 mt-1 w-48 origin-top-right rounded-md bg-fuchsia-400 shadow-lg ring-1 ring-black focus:outline-none`}
            >
              {user && (
                <div className="px-4 py-3">
                  <span className="block text-sm font-bold text-purple-900">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="block truncate text-sm font-bold text-purple-900">
                    {user.email}
                  </span>
                </div>
              )}
              <ul className="py-2" aria-labelledby="user-menu-button">
                {!user && (
                  <>
                    <li>
                      <Link
                        to={"/login"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/register"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Registro
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li>
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/construction"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Compras
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={logout}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* <!-- Dropdown menu --> */}

          {/* <!-- Dropdown menu end --> */}
          <button
            onClick={toggleMobileMenu}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-purple-500 hover:bg-fuchsia-300 focus:ring-2 focus:ring-pink-200 focus:outline-none md:hidden"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              ariaHidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`w-full items-center ${isMobileMenuOpen ? "block" : "hidden"} justify-between md:order-1 md:flex md:w-auto`}
          id="navbar-user"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-serif text-3xl font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                to={"/"}
                className="block rounded-sm px-3 py-2 text-purple-600 md:bg-transparent md:p-0 md:hover:text-pink-400 md:dark:hover:bg-transparent"
                ariaCurrent="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/shop"}
                href="#"
                className="block rounded-sm px-3 py-2 text-purple-600 md:bg-transparent md:p-0 md:hover:text-pink-400 md:dark:hover:bg-transparent"
              >
                Tienda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
