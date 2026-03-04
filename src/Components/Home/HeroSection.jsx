const HeroSection = () => {
  return (
    <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to EcommercePro
        </h2>
        <p className="text-lg mb-6">
          Shop the best products at unbeatable prices
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Start Shopping
        </button>
      </div>
    </section>
  );
};

export default HeroSection;