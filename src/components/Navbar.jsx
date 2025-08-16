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
      <div className="flex w-full flex-wrap items-center justify-between p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
            BabyJo
          </span>
        </Link>
        <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
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
              className="h-20 rounded-full"
              src="/logo.png"
              alt="user photo"
            />
          </button>
          {/* <!-- Dropdown menu --> */}

          <div
            className={` ${isUserDropdownOpen ? "absolute" : "hidden"} top-24 right-5 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow-sm dark:divide-gray-600 dark:bg-fuchsia-400`}
            id="user-dropdown"
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-pink-500 dark:hover:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/register"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-pink-500 dark:hover:text-white"
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-pink-500 dark:hover:text-white"
                    >
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-pink-500 dark:hover:text-white"
                    >
                      Compras
                    </a>
                  </li>
                  <li>
                    <Link
                      onClick={logout}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-pink-500 dark:hover:text-white"
                    >
                      Cerrar sesión
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

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
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 text-3xl font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
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
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
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
