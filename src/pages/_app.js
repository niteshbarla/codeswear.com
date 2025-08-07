import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error("error");
      localStorage.clear();
    }
  }, []);

  const clearCart = () => {
    const emptyCart = {}; // Reset cart to empty object
    setCart(emptyCart); // Update state
    saveCart(emptyCart); // Persist to storage (if applicable)
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]]["price"] * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    // Initialize cart as empty object if it's falsy (null, undefined, etc.)
    let newCart = cart ? JSON.parse(JSON.stringify(cart)) : {};

    if (newCart[itemCode]) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: qty, price, name, size, variant }; // Use the passed qty instead of hardcoding 1
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = JSON.parse(JSON.stringify(cart)); // Create a deep copy
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;

      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }

      setCart(newCart);
      saveCart(newCart);
    }
  };

  return (
    <>
      <Navbar
        key={{ subTotal }}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
