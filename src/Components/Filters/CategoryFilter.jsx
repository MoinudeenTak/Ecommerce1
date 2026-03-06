const CategoryFilter = ({ setCategory }) => {

const categories = [
"all",
"electronics",
"fashion",
"home",
"books"
];

return (
<div className="space-y-2">

<h3 className="font-semibold mb-2">Category</h3>

{categories.map((cat) => (

<button
key={cat}
onClick={() => setCategory(cat)}
className="block text-sm text-gray-600 hover:text-blue-600 capitalize"
>
{cat}
</button>

))}

</div>
);
};

export default CategoryFilter;