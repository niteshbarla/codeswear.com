import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center bg-gray-50 font-bold sticky top-0 z-50 p-0">
      <div className="logo">
        <Image
          src="/logo/codeswear_logo/logo-png.png"
          width={200}
          height={40}
        />
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4">
          <Link href={"/"}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-0 mx-5">
        <button>Cart</button>
      </div>
    </div>
  );
};

export default Navbar;
