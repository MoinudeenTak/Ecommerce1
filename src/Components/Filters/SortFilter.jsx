const SortFilter = ({ setSort }) => {

  return (
    <div className="mb-6">

      <h3 className="font-semibold mb-2">Sort By</h3>

      <select
        onChange={(e)=>setSort(e.target.value)}
        className="w-full border rounded p-2 text-sm"
      >

        <option value="">Default</option>
        <option value="low">Price Low → High</option>
        <option value="high">Price High → Low</option>

      </select>

    </div>
  );
};

export default SortFilter;