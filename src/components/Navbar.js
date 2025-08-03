import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center bg-gray-50 font-bold sticky top-0 z-50 p-0 my-0 shadow-md">
      <Link href={"/"} legacyBehavior>
        <div className="logo cursor-pointer">
          <Image
            src="/logo/codeswear_logo/logo-png.png"
            width={200}
            height={40}
            alt="Codeswear Logo"
          />
        </div>
      </Link>
      <div className="nav">
        <ul className="flex items-center space-x-4 cursor-pointer">
          <Link href={"/tshirts"} legacyBehavior>
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"} legacyBehavior>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"} legacyBehavior>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"} legacyBehavior>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div onClick={toggleCart} className="cart absolute right-0 top-10 mx-5">
        <FaCartArrowDown className="text-xl md:text-2xl cursor-pointer" />
      </div>
      <div
        ref={ref}
        className="w-72 sideCart absolute top-0 right-0 bg-green-100 p-10 transition-transform translate-x-full px-8 py-10 h-screen"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 text-2xl cursor-pointer text-green-800"
        >
          <IoIosCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-base font-semibold">
              Your Cart is Empty!
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}</div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <FaMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-green-900"
                    />
                    <span className="mx-2">{cart[k].qty}</span>
                    <FaPlusCircle className="cursor-pointer text-green-900" />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-2 text-white bg-green-800 border-0 py-2 px-2 focus:outline-none hover:bg-green-900 rounded text-sm cursor-pointer">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-green-800 border-0 py-2 px-2 focus:outline-none hover:bg-green-900 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
