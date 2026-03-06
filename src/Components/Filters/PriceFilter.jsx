const PriceFilter = ({ priceRange, setPriceRange }) => {

  return (
    <div className="mb-6">

      <h3 className="font-semibold mb-2">Price</h3>

      <input
        type="range"
        min="0"
        max="2000"
        value={priceRange}
        onChange={(e)=>setPriceRange(e.target.value)}
        className="w-full"
      />

      <p className="text-sm text-gray-500 mt-1">
        Up to ${priceRange}
      </p>

    </div>
  );
};

export default PriceFilter;