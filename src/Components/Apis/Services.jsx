import axios from "axios";

const Api = axios.create({baseURL:`https://dummyjson.com/`})
const Services = () => {
    return Api.get("products");
}
export const paymentApiCall = (paymentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          success: true,
          orderId: "ORD12345",
          amount: paymentData.amount,
        },
      });
    }, 1500);
  });
};

export default Services;