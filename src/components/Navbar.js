import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = () => {
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
      <div className="cart absolute right-0 top-10 mx-5">
        <FaCartArrowDown className="text-xl md:text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
