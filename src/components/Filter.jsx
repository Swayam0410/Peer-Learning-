import "./Filter.css"
const Filter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4 bg-gray-800 text-white border">
      <select
        name="semester"
        onChange={handleChange}
        value={filters.semester}
        className="border p-2 rounded"
      >
        <option value="" className="bg-gray-800 text-white">All Semesters</option>
        {[...Array(7)].map((_, i) => (
          <option key={i} value={i + 1} className="bg-gray-800 text-white">
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
