import React, { useState } from "react";
import NavDropDown from "../components/NavDropDown";

const products = [
  {
    category: "shirt",
    sub_category: "T-shirts",
    name: "Basic White T-shirt",
    price: 19.99,
    color: "White",
    size: "M",
    gender: "Unisex",
  },
  {
    category: "shirt",
    sub_category: "Button-down shirts",
    name: "Plaid Flannel Shirt",
    price: 29.99,
    color: "Red/Black",
    size: "L",
    gender: "Men",
  },
  {
    category: "trousers",
    sub_category: "Jeans",
    name: "Slim Fit Blue Jeans",
    price: 39.99,
    color: "Blue",
    size: "32x32",
    gender: "Men",
  },
  {
    category: "trousers",
    sub_category: "Leggings",
    name: "High Waist Black Leggings",
    price: 24.99,
    color: "Black",
    size: "S",
    gender: "Women",
  },
  {
    category: "shoes",
    sub_category: "Sneakers",
    name: "Classic Canvas Sneakers",
    price: 49.99,
    color: "White",
    size: "US 9",
    gender: "Unisex",
  },
  {
    category: "shoes",
    sub_category: "Boots",
    name: "Leather Ankle Boots",
    price: 79.99,
    color: "Brown",
    size: "US 10",
    gender: "Men",
  },
  {
    category: "hats",
    sub_category: "Baseball caps",
    name: "Logo Embroidered Cap",
    price: 14.99,
    color: "Navy",
    size: "One Size",
    gender: "Unisex",
  },
  {
    category: "hats",
    sub_category: "Beanies",
    name: "Knit Winter Beanie",
    price: 9.99,
    color: "Gray",
    size: "One Size",
    gender: "Unisex",
  },
];

const Test = () => {
  const [category, setCategory] = useState("shirt");

  const filterCategory = products.filter((d) => d.category === category);
  // const filterSubCategory = filterCategory.filter(
  //   (d) => d.sub_category === "T-shirts"
  // );
  return (
    <div>
      {filterCategory.map((data) => {
        return (
          <div key={data.name}>
            <h1>{data.name}</h1>
          </div>
        );
      })}
      <button
        onClick={() => setCategory("shirt")}
        className="bg-green-300 px-4 py-2 rounded-lg"
      >
        Shirts
      </button>
      <button
        onClick={() => setCategory("trousers")}
        className="bg-red-300 px-4 py-2 rounded-lg"
      >
        Trousers
      </button>
      <button
        onClick={() => setCategory("shoes")}
        className="bg-blue-300 px-4 py-2 rounded-lg"
      >
        Shoes
      </button>
      <button
        onClick={() => setCategory("hats")}
        className="bg-yellow-300 px-4 py-2 rounded-lg"
      >
        Hats
      </button>
    </div>
  );
};

export default Test;
