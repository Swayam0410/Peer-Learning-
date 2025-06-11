import SessionCard from "./SessionCard";
import "./Session.css"
import Article from "./Article";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

let Session=  ()=>{
  const [arr,setArr]=useState([]);
  const fetchData=async()=>{
     try{
    const res= await fetch("http://localhost:3000/form");
    const resp=await res.json();
    console.log(resp);
    setArr(resp);
   } catch(err){
    console.log("error fetching stored data",err);
   }
  }
  useEffect(()=>{
  fetchData();
  },[]);
    const navigate=useNavigate();
     const handleClick = (entry) => {
    navigate("/article:id", {
      state: { entry },
    });
    console.log("hello");
  };
  
    return (
    <div className="whole">
      {arr.map((a) => {
        return <SessionCard key={a._id} onClick={() => {
            console.log("a");
            handleClick(a)
    console.log(100)}} {...a} />
}

)}
    </div>
  );
}
export default Session;