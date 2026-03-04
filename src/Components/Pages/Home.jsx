import { useState, useEffect, } from "react";
import Header from "../Layout/Header";
import HeroSection from "../Home/HeroSection";
import ProductsSection from "../Home/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
   const { isAuthenticated, currentUser } = useCart();
  const navigate = useNavigate();

  // 🔥 Redirect admin back to dashboard
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);


  return (
    <>
      <Header
        onSearch={setSearchTerm}
        onCategoryChange={setCategory}
      />

      <main className="min-h-screen bg-gray-50">
        <HeroSection />
        <ProductsSection
          searchTerm={searchTerm}
          category={category}
        />
      </main>
    </>
  );
};

export default Home;