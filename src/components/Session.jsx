import SessionCard from "./SessionCard";
import "./Session.css"
import Article from "./Article";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

let Session=  ()=>{
  const [filters, setFilters] = useState({ semester: '' });
 
  const [arr,setArr]=useState([]);
  const [search,setSearch]=useState("");
  const debouncedSearch=useDebounce(search);

  const fetchData = async (filters = {}) => {
    
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `http://localhost:3000?${queryParams}`;

    const res = await fetch(url);
    const resp = await res.json();
    console.log(resp);
    const resp1=resp.filter(a=>a.topic.toLowerCase().includes(debouncedSearch.toLowerCase()) || a.subject.toLowerCase().includes(debouncedSearch.toLowerCase()));
    setArr(resp1.toReversed());
  } catch (err) {
    console.log("error fetching stored data", err);
  }
};
const handleSearch=(e)=>{
  setSearch(e.target.value);
}
 useEffect(() => {
  fetchData(filters);
}, [filters,debouncedSearch]);
  
    const navigate=useNavigate();
     const handleClick = (entry) => {
    navigate("/article:id", {
      state: { entry },
    });
    console.log("hello");
  };
//   if(arr.length===0){
//     return(
//      <div className="container mx-auto px-4 py-6">
//   {/* Filter Dropdown */}
//   <div className="flex justify-around items-center mb-6 gap-4">
//   {/* Filter Component */}
//   <div>
//     <Filter filters={filters} setFilters={setFilters} />
//   </div>

//   {/* Leaderboard Button */}

// <div className="w-full max-w-md mx-auto mt-4 px-4">
//   <input
//     type="text"
//     placeholder="🔍 Search For Topics"
//     onChange={handleSearch}
//     className="w-full px-4 py-2 border border-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm text-black"
//   />
// </div>



//   <button
//     onClick={() => navigate("/leaderboard")}
//     className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full shadow hover:bg-yellow-500 transition-all"
//   >
//     🏆 Leaderboard
//   </button>
// </div>

//   {/* Sessions Grid */}
//   <div><h1>Sorry No sessions to Display</h1></div>
// </div>

//     );
//   }

    return (
  <div className="container mx-auto px-4 py-6">
  {/* Filter Dropdown */}
  <div className="flex justify-around items-center mb-6 gap-4">
  {/* Filter Component */}
  <div>
    <Filter filters={filters} setFilters={setFilters} />
  </div>

  {/* Leaderboard Button */}

<div className="w-full max-w-md mx-auto mt-4 px-4">
  <input
    type="text"
    placeholder="🔍 Search For Topics or Subjects"
    onChange={handleSearch}
    className="w-full px-4 py-2 border border-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm text-black"
  />
</div>



  <button
    onClick={() => navigate("/leaderboard")}
    className="px-4 py-2 bg-yellow-400 text-yellow-900 font-semibold rounded-full shadow hover:bg-yellow-500 transition-all"
  >
    🏆 Leaderboard
  </button>
</div>

  {/* Sessions Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   
    {arr.map((a) => {
      console.log(100);
      return <SessionCard
        key={a._id}
        onClick={() => {
          console.log("a");
          handleClick(a);
          console.log(100);
        }}
        {...a}
      />
})}
  </div>
</div>


  );
}
export default Session;