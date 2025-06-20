import { useEffect, useState } from "react";
import SessionCard from "./SessionCard";
const Newest=()=>{
    const [arr,setArr]=useState([])
      const fetchData = async () => {
  try {
    const url = `http://localhost:3000/`;
    const res = await fetch(url);
    const resp = await res.json();
    console.log(resp);
    const resp1=resp.toReversed();
    setArr(resp1);
  } catch (err) {
    console.log("error fetching stored data", err);
  }
};

useEffect(()=>{
    fetchData();
},[]);
    return(
          <div className="container mx-auto px-4 py-6">
  {/* Filter Dropdown */}
  {/* Sessions Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {arr.map((a) => (
      <SessionCard
        key={a._id}
        onClick={() => {
          console.log("a");
        //   handleClick(a);
          console.log(100);
        }}
        {...a}
      />
    ))}
  </div>
</div>
    );
}
export default Newest;