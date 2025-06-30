import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef } from "react";

const Navbar = () => {
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.style.transform === "translateX(0px)") {
      ref.current.style.transform = "translateX(100%)";
    } else {
      ref.current.style.transform = "translateX(0px)";
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
        className="sideCart absolute top-0 right-0 bg-green-200 p-10 transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 text-2xl cursor-pointer text-green-800"
        >
          <IoIosCloseCircle />
        </span>
        This is my shopping cart
        <ol>
          <li>
            <span>Tshirt - Wear the Code</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
