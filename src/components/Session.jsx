import SessionCard from "./SessionCard";
import "./Session.css"
import Article from "./Article";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import { useEffect, useState } from "react";

let Session=  ()=>{
  const [filters, setFilters] = useState({ semester: '' });
  const [arr,setArr]=useState([]);
  const fetchData = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `http://localhost:3000?${queryParams}`;

    const res = await fetch(url);
    const resp = await res.json();
    console.log(resp);
    setArr(resp);
  } catch (err) {
    console.log("error fetching stored data", err);
  }
};
 useEffect(() => {
  fetchData(filters);
}, [filters]);
  
    const navigate=useNavigate();
     const handleClick = (entry) => {
    navigate("/article:id", {
      state: { entry },
    });
    console.log("hello");
  };
  if(arr.length===0){
    return(
      <div className="whole">
      <div className="flex justify-start filter">
        <Filter filters={filters} setFilters={setFilters} className="filter"/>
      </div>
      <div className="disp">
        <h1>SORRY NO POSTINGS TILL NOW</h1>
      </div>
    </div>

    );
  }
    return (
    <div className="whole">
      <div className="flex justify-start filter">
        <Filter filters={filters} setFilters={setFilters} className="filter"/>
      </div>
      <div className="disp">
              {arr.map((a) => {
        return <SessionCard key={a._id} onClick={() => {
            console.log("a");
            handleClick(a)
    console.log(100)}} {...a} />
}

)}
      </div>
    </div>
  );
}
export default Session;