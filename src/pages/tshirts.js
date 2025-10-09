import React from "react";
import Link from "next/link";
import Product from "../../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
                >
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                    legacyBehavior
                  >
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block"
                        src={products[item].img}
                      />
                      <div className="text-center mt-4 md:text-left">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          T-Shirts
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {products[item].title}
                        </h2>
                        <p className="mt-1">₹{products[item].price}</p>
                        <p className="mt-1">
                          {products[item].size && products[item].size.length > 0
                            ? products[item].size.join(", ")
                            : "Out of stock"}
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  let products = await Product.find();
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      } else {
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  };
}

export default Tshirts;
