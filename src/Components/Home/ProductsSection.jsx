import Products from "../Pages/Products";

const ProductsSection = ({ searchTerm, category }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Featured Products
      </h3>

      <Products searchTerm={searchTerm} category={category} />
    </section>
  );
};

export default ProductsSection;