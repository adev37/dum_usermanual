import React from "react";
import product1 from "../assets/widget.png"; // Replace with actual image paths
import product2 from "../assets/Bez-nazwy.png";
import product3 from "../assets/bez-ta.png";
import product4 from "../assets/hyperion.png";

const products = [
  {
    image: product1,
    // title: "Famed FLARE",
    description:
      "Learn how to position and operate this table for imaging and minimally invasive surgeries.",
  },
  {
    image: product2,
    // title: "Famed HYPERION",
    description:
      "Step-by-step usage guide for bariatric procedures using this advanced operating table.",
  },
  {
    image: product3,
    // title: "Famed SU-02",
    description:
      "Understand manual operation and adjustments of this non-electric surgical table.",
  },
  {
    image: product4,
    // title: "Famed SU-14",
    description:
      "Instructions on using height adjustment and key functions of this electric table.",
  },
];

const MainContent = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-gray-200 p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Learn to Use Our Operating Tables with Ease
        </h2>
        <p className="text-gray-600 mt-2">
          Step-by-step digital user manual (DUM) for each table to help you
          operate safely and efficiently.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 p-4 flex flex-col items-center text-center">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 object-contain mb-4"
            />
            {/* <h3 className="text-xl font-bold text-green-700">{item.title}</h3> */}
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
