import React from "react";
import Link from "next/link";
import Product from "../../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  console.log(products);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
              <Link href={"/product/wear-the-code"} legacyBehavior>
                <a className="block relative rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block"
                    src="https://m.media-amazon.com/images/I/71eUwDk8z+L._SY879_.jpg"
                  />
                  <div className="text-center mt-4 md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      T-Shirts
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      Wear The Code
                    </h2>
                    <p className="mt-1">₹299.00</p>
                    <p className="mt-1">S, M, L, XL, XXL</p>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let products = await Product.find();

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Tshirts;
