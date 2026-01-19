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
  const [isLoading, setIsLoading] = useState(false); // Add loading state

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

  // Listen for route changes to show/hide loading
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const refreshVariant = (newSize, newColor) => {
    // Check if the selected color and size combination exists
    if (variants[newColor] && variants[newColor][newSize]) {
      setIsLoading(true); // Set loading to true before navigation
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
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-700 font-medium">Loading variant...</p>
          </div>
        </div>
      )}

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
                {/* Rating and social icons removed for brevity */}
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).map((colorKey) => {
                    const isColorAvailable =
                      variants[colorKey] && variants[colorKey][size];
                    return (
                      <button
                        key={colorKey}
                        onClick={() => {
                          if (isColorAvailable) {
                            refreshVariant(size, colorKey);
                          }
                        }}
                        disabled={!isColorAvailable || isLoading}
                        className={`border-2 rounded-full w-6 h-6 focus:outline-none mx-1
                          ${color === colorKey ? "border-black" : "border-gray-300"} 
                          ${!isColorAvailable ? "opacity-30 cursor-not-allowed" : isLoading ? "cursor-wait" : "cursor-pointer"}
                          ${colorKey === "white" ? "bg-white" : ""}
                          ${colorKey === "black" ? "bg-black" : ""}
                          ${colorKey === "red" ? "bg-red-700" : ""}
                          ${colorKey === "green" ? "bg-green-700" : ""}
                          ${colorKey === "blue" ? "bg-blue-700" : ""}
                          ${colorKey === "purple" ? "bg-purple-700" : ""}
                          ${colorKey === "yellow" ? "bg-yellow-500" : ""}
                        `}
                        title={
                          !isColorAvailable
                            ? `Not available in size ${size}`
                            : isLoading
                              ? "Loading..."
                              : `Select ${colorKey}`
                        }
                      ></button>
                    );
                  })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        const newSize = e.target.value;
                        setIsLoading(true); // Set loading state
                        // When changing size, check if current color is available in new size
                        // If not, find first available color for the new size
                        if (!variants[color] || !variants[color][newSize]) {
                          const availableColorsForNewSize =
                            getAvailableColorsForSize(newSize);
                          if (availableColorsForNewSize.length > 0) {
                            refreshVariant(
                              newSize,
                              availableColorsForNewSize[0],
                            );
                          } else {
                            setIsLoading(false);
                          }
                        } else {
                          refreshVariant(newSize, color);
                        }
                      }}
                      disabled={isLoading}
                      className={`rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base pl-3 pr-10 ${isLoading ? "bg-gray-100 cursor-wait" : ""}`}
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
                      color,
                    );
                  }}
                  disabled={isLoading}
                  className={`flex ml-8 text-sm text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Add to Cart
                </button>
                <button
                  disabled={isLoading}
                  className={`flex ml-4 text-sm text-white bg-green-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Buy now
                </button>
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  className="px-2 border-2 rounded-md border-gray-400"
                  type="text"
                  placeholder="Enter your pincode"
                  value={pin}
                  disabled={isLoading}
                />
                <button
                  onClick={checkServiceability}
                  disabled={isLoading}
                  className={`text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
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
