import { useState, useEffect } from "react";
import Header from "../Layout/Header";
import HeroSection from "../Home/HeroSection";
import ProductsSection from "../Home/ProductsSection";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";
import CategoryFilter from "../Filters/CategoryFilter";
import PriceFilter from "../Filters/PriceFilter";
import SortFilter from "../Filters/SortFilter";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState(2000);

  const { isAuthenticated, currentUser } = useCart();
  const navigate = useNavigate();

  // 🔥 Redirect admin to dashboard
  useEffect(() => {
    if (isAuthenticated && currentUser?.role === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <>
      <Header onSearch={setSearchTerm} onCategoryChange={setCategory} />

      <main className="min-h-screen bg-gray-50">
        <HeroSection />

        {/* Filter + Products Layout */}
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="bg-white p-4 rounded-lg shadow h-fit">
            <CategoryFilter setCategory={setCategory} />
            <PriceFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />

            <SortFilter setSort={setSort} />
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <ProductsSection
              searchTerm={searchTerm}
              category={category}
              sort={sort}
              priceRange={priceRange}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
