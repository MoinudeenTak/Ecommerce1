import axios from "axios";

const Api = axios.create({baseURL:`https://dummyjson.com/`})
const Services = () => {
    return Api.get("products");
}

export default Services;