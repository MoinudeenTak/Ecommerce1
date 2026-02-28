import { useState, useEffect } from "react";
import Services from "../Apis/Services";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../Store/ContextApi';


const Products = () => {
    const [data, setData] = useState([]);
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
      //  const products = res?.data?.products || res?.data || [];
      // So this line supports BOTH:
      setData(products);
    } catch (error) {
      console.log(error);
      console.error("error message", error.message);
      console.error("error status", error.response.status);
      console.error("error data", error.response.data);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    {/* {data?.map(item => (
  <div key={item.id}>
    {item.title} - ${item.price}
  </div>
))} */}

{/* Prevents crash if data is undefined. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <span className="text-gray-400 text-4xl">Product</span>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              {/* <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p> */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">
                  ${item.price}
                </span>
               
                <button onClick={() => addToCart(item)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold flex items-center gap-2">
                  <FaShoppingCart /> Add
                </button>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
 

