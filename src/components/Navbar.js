import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Navbar = () => {
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
        className="w-72 sideCart absolute top-0 right-0 bg-green-200 p-10 transition-transform translate-x-full px-8 py-10 h-screen"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 text-2xl cursor-pointer text-green-800"
        >
          <IoIosCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt - Wear the Code</div>
              <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                <CiCircleMinus /> <span className="mx-2">1</span>
                <CiCirclePlus />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt - Wear the Code</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                1
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt - Wear the Code</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                1
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt - Wear the Code</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                1
              </div>
            </div>
          </li>
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Tshirt - Wear the Code</div>
              <div className="flex font-semibold items-center justify-center w-1/3">
                1
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
