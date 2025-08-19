import { createContext, useContext, useState } from "react";

// crea contexto
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    console.log(product.id, size);
    setCart((prevCart) => {
      // Buscar si ya existe esta combinación exacta
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      );

      if (existingItemIndex >= 0) {
        // Si existe, incrementar cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      }

      // Si no existe, agregar nuevo item
      return [
        ...prevCart,
        {
          id: product.id, // ID único
          product,
          size,
          quantity: 1,
          price: product.price, // Guardar precio actual por si cambia después
        },
      ];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item.product.id === productId && item.size === size,
      );

      if (itemIndex === -1) return prevCart;

      const newCart = [...prevCart];
      const newQuantity = newCart[itemIndex].quantity - 1;

      if (newQuantity <= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: newQuantity,
        };
      }

      return newCart;
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalItems,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar el contexto más fácil
export const useCart = () => {
  return useContext(CartContext);
};
