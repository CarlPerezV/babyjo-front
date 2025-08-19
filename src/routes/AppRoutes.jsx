import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Construction from "../pages/Construction";

import { PrivateRoute } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/construction" element={<Construction />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
