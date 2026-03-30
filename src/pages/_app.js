import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

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

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    // Initialize cart as empty object if it's falsy (null, undefined, etc.)
    let newCart = { [itemCode]: { qty: 1, price, name, size, variant } }; // Create a new cart with the single item

    setCart(newCart);
    saveCart(newCart);
    router.push(`/checkout`);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
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
        buyNow={buyNow}
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
