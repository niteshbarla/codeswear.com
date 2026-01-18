import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import mongoose from "mongoose";
import Product from "../../../models/Product";

export default function Page({ addToCart, product, variants }) {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState(null);
  const checkServiceability = async () => {
    try {
      let pins = await fetch(`http://localhost:3000/api/pincode`);
      let pinJson = await pins.json();
      if (pinJson.includes(parseInt(pin))) {
        setService(true);
      } else {
        setService(false);
      }
    } catch (error) {
      console.error("Error checking serviceability:", error);
      setService(false);
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  // Update color and size when product changes (on initial load or when variant changes)
  useEffect(() => {
    if (product) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [product]);

  const refreshVariant = (newSize, newColor) => {
    // Check if the selected color and size combination exists
    if (variants[newColor] && variants[newColor][newSize]) {
      let url = `/product/${variants[newColor][newSize].slug}`;
      router.push(url);
    }
  };

  // Get available sizes for the current color
  const getAvailableSizesForColor = (selectedColor) => {
    if (!selectedColor || !variants[selectedColor]) return [];
    return Object.keys(variants[selectedColor]);
  };

  // Get available colors for the current size
  const getAvailableColorsForSize = (selectedSize) => {
    const availableColors = [];
    for (const colorKey in variants) {
      if (variants[colorKey][selectedSize]) {
        availableColors.push(colorKey);
      }
    }
    return availableColors;
  };

  // Get all unique sizes across all colors
  const getAllAvailableSizes = () => {
    const allSizes = new Set();
    for (const colorKey in variants) {
      for (const sizeKey in variants[colorKey]) {
        allSizes.add(sizeKey);
      }
    }
    return Array.from(allSizes);
  };

  const availableColors = getAvailableColorsForSize(size);
  const availableSizes = getAvailableSizesForColor(color);
  const allSizes = getAllAvailableSizes();

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
              src={product.img}
              width={400}
              height={400}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({size}/{color})
              </h1>
              <div className="flex mb-4">
                {/* 
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">


                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).map((colorKey) => {
                    // Only show colors that are available in the current size
                    if (variants[colorKey] && variants[colorKey][size]) {
                      return (
                        <button
                          key={colorKey}
                          onClick={() => {
                            refreshVariant(size, colorKey);
                          }}
                          className={`border-2 rounded-full w-6 h-6 focus:outline-none mx-1
                            ${
                              color === colorKey
                                ? "border-black"
                                : "border-gray-300"
                            } 
                            ${colorKey === "white" ? "bg-white" : ""}
                            ${colorKey === "black" ? "bg-black" : ""}
                            ${colorKey === "red" ? "bg-red-700" : ""}
                            ${colorKey === "green" ? "bg-green-700" : ""}
                            ${colorKey === "blue" ? "bg-blue-700" : ""}
                            ${colorKey === "purple" ? "bg-purple-700" : ""}
                            ${colorKey === "yellow" ? "bg-yellow-500" : ""}
                          `}
                        ></button>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        const newSize = e.target.value;
                        // When changing size, check if current color is available in new size
                        // If not, find first available color for the new size
                        if (!variants[color] || !variants[color][newSize]) {
                          const availableColorsForNewSize =
                            getAvailableColorsForSize(newSize);
                          if (availableColorsForNewSize.length > 0) {
                            refreshVariant(
                              newSize,
                              availableColorsForNewSize[0]
                            );
                          }
                        } else {
                          refreshVariant(newSize, color);
                        }
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10"
                    >
                      {allSizes.map((sizeOption) => (
                        <option
                          key={sizeOption}
                          value={sizeOption}
                          disabled={!availableSizes.includes(sizeOption)}
                        >
                          {sizeOption}{" "}
                          {!availableSizes.includes(sizeOption)
                            ? "(Not available in this color)"
                            : ""}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}/-
                </span>
                <button
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color
                    );
                  }}
                  className="flex ml-8 text-sm text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer"
                >
                  Add to Cart
                </button>
                <button className="flex ml-4 text-sm text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer">
                  Buy now
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  className="px-2 border-2 rounded-md border-gray-400"
                  type="text"
                  placeholder="Enter your pincode"
                  value={pin}
                />
                <button
                  onClick={checkServiceability}
                  className=" text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3">
                  Sorry! We do not deliver to this pin code yet.
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 text-sm mt-3">
                  Yay! This pincode is serviceable.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  let product = await Product.findOne({ slug: context.query.slug });
  if (!product) {
    return {
      notFound: true,
    };
  }

  let variants = await Product.find({
    title: product.title,
  });

  let colorSizeSlug = {};
  for (let item of variants) {
    if (item.availableQty > 0) {
      if (!colorSizeSlug[item.color]) {
        colorSizeSlug[item.color] = {};
      }
      colorSizeSlug[item.color][item.size] = {
        slug: item.slug,
        availableQty: item.availableQty,
      };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}
