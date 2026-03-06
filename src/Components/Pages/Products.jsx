import { useState, useEffect } from "react";
import Services from "../Apis/Services";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { useCart } from "../Store/ContextApi";

const Products = ({
  searchTerm = "",
  category = "all",
  sort = "",
  priceRange = 2000,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };

  const getData = async () => {
    try {
      const res = await Services();

      const products = Array.isArray(res.data)
        ? res.data
        : res.data.products || [];

      setData(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /* 🔥 FILTER + SORT LOGIC */

  let filteredProducts = data.filter((item) => {
    const matchSearch = item.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchCategory =
      category === "all" ||
      item.category?.toLowerCase() === category.toLowerCase();

    const matchPrice = item.price <= priceRange;

    return matchSearch && matchCategory && matchPrice;
  });

  /* 🔥 SORTING */

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Skeleton Loader */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 h-72 rounded-lg"
              ></div>
            ))}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden group relative"
            >
              
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                20% OFF
              </span>

              <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:text-red-500">
                <FaHeart />
              </button>

              <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  className="h-full object-contain group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 flex flex-col gap-2">

                <h3 className="text-gray-800 font-semibold text-sm line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <FaStar /><FaStar /><FaStar /><FaStar />
                  <FaStar className="text-gray-300" />
                  <span className="text-gray-500 text-xs ml-1">(120)</span>
                </div>

                <div className="flex items-center gap-2">

                  <span className="text-xl font-bold text-blue-600">
                    ${item.price}
                  </span>

                  <span className="text-gray-400 line-through text-sm">
                    ${(item.price * 1.2).toFixed(2)}
                  </span>

                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No products found
        </div>
      )}

    </div>
  );
};

export default Products;