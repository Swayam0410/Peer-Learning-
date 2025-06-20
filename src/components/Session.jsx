import SessionCard from "./SessionCard";
import "./Session.css"
import Article from "./Article";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { useUser } from "@clerk/clerk-react";
import { Menu,Button } from '@mantine/core';
import { ArrowDown } from "lucide-react";
import {  Eye, Flame, Star } from 'lucide-react';


let Session=  ()=>{
  const [page, setPage] = useState(1);
const itemsPerPage = 6;

  const { user }=useUser();
  const [filters, setFilters] = useState({ semester: '' });
 
  const [arr,setArr]=useState([]);
  const [search,setSearch]=useState("");
  const debouncedSearch=useDebounce(search);
  const totalPages = Math.ceil(arr.length / itemsPerPage);

  const fetchData = async (filters = {}) => {
    
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `http://localhost:3000?${queryParams}`;

    const res = await fetch(url);
    const resp = await res.json();
    console.log(resp);
    const resp1=resp.filter(a=>a.topic.toLowerCase().includes(debouncedSearch.toLowerCase()) || a.subject.toLowerCase().includes(debouncedSearch.toLowerCase()));
    setArr(resp1);
  } catch (err) {
    console.log("error fetching stored data", err);
  }
};
const handleSearch=(e)=>{
  setSearch(e.target.value);
}
 useEffect(() => {
  console.log(user.fullName,user.username,user.primaryEmailAddress.emailAddress,user?.phoneNumbers?.[0]?.phoneNumber);

  fetchData(filters);
}, [filters,debouncedSearch]);
  
    const navigate=useNavigate();
     const handleClick = (entry) => {
    navigate(`/article/${entry._id}`, {
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

 const addClick=async({_id,email})=>{
  try {
    const res=await fetch("http://localhost:3000/addview",{
      method:"PATCH",
       headers: { "Content-Type": "application/json" },
       body:JSON.stringify({_id,email}),
    });

    const resp=await res.json();
    console.log(resp.viewsCount);
  } catch (err) {
    console.log("error patching data ",err);
  }
 }

    return (
  <div className="container mx-auto px-4 py-6">
  {/* Filter Dropdown */}
  <div className="flex justify-center items-center mb-6 gap-20">
  {/* Filter Component */}
  <div>
    <Filter filters={filters} setFilters={setFilters} />
  </div>
<div>
  <Menu shadow="lg" width={220} position="bottom-end" withArrow >
    <Menu.Target>
     <Button
  variant="filled"
  color="cyan"
  radius="xl"
  className="shadow-lg flex items-center gap-2"
>
  Filter Posts &nbsp;<ArrowDown size={16} />
</Button>

    </Menu.Target>

    <Menu.Dropdown >
      <Menu.Item
        leftSection={<Star size={16} />}
        onClick={()=>navigate("/highlyrated")}
      >
        ⭐ Highly Rated
      </Menu.Item>

      <Menu.Item
        leftSection={<Eye size={16} />}
        onClick={() => {
          navigate("/mostviews")
        }}
      >
        👀 Most Viewed
      </Menu.Item>

      <Menu.Item
        leftSection={<Flame size={16} />}
        onClick={() => {
         navigate("/new");
        }}
        color="red"
      >
        🔥 Newest First
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
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
   {arr.length === 0 && (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="text-center text-gray-600">
      <h1 className="text-2xl font-semibold mb-2">😕 No Sessions Found</h1>
      <p className="text-sm text-gray-500">Try adjusting your filters or search terms.</p>
    </div>
  </div>
)}

{arr
  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
  .map((a) => (
    <SessionCard
      key={a._id}
      onClick={() => {
        addClick({ _id: a._id, email: user?.primaryEmailAddress?.emailAddress });
        handleClick(a);
      }}
      {...a}
    />
))}


  </div>
  <div className="flex justify-center items-center mt-8 gap-2 flex-wrap text-black">
  {/* Prev Button */}
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    ◀ Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
    <button
      key={p}
      onClick={() => setPage(p)}
      className={`px-3 py-1 rounded-full ${
        page === p
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-100 hover:bg-gray-300"
      }`}
    >
      {p}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={page === totalPages}
    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
  >
    Next ▶
  </button>
</div>

</div>


  );
}
export default Session;