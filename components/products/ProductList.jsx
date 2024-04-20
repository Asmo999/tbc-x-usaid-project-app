"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";
import Loading from "@/app/loading"; 

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Imitate delay
  try {
    const res = await axios.get("https://dummyjson.com/products/category/groceries");
    return res.data.products;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

function ProductList() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      const products = await getData();
      setOriginalProducts(products);
      setSortedProducts(products);
      setLoading(false); // Finish loading
    };
    fetchProducts();
  }, []);

  const debounce = (cb, delay) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb.apply(this, args), delay);
    };
  };

  const handleSearch = (value) => {
    const filteredProducts = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setSortedProducts(filteredProducts);
  };

  const handleSearchChange = debounce(handleSearch, 1000);

  const sortProductsByPrice = () => {
    const sorted = [...sortedProducts].sort((a, b) =>
      ascendingOrder ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
    setAscendingOrder(!ascendingOrder);
  };

  if (loading) {
    return <Loading />
  }

  return (
    <section className="w-full px-16 py-16 min-h-[400px] dark:bg-black">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl leading-relaxed text-gray-700 dark:text-white">
          Featured sets
        </h2>
        <div className="flex gap-2">
          <SearchInput onChange={handleSearchChange} />
          <button
            onClick={sortProductsByPrice}
            className={`px-4 py-2 bg-[#FD8024] flex items-center gap-2 text-white uppercase font-bold rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-opacity-50 focus:ring-blue-500 
            ${ascendingOrder ? "hover:bg-orange-400" : "hover:bg-[#FD8024]"}`}
            aria-label="Sort products by Price"
          >
            <FontAwesomeIcon icon={faSort} />
            sort
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-10">
        {sortedProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            imageSrc={product.images[0]}
            productName={product.title}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;