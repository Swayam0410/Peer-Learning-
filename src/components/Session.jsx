import SessionCard from "./SessionCard";
import "./Session.css"
import Article from "./Article";
import { useNavigate } from "react-router-dom";

let Session=({arr})=>{
    const navigate=useNavigate();
     const handleClick = (entry) => {
    navigate("/article:id", {
      state: { entry },
    });
    console.log("hello");
  };
    return (
    <div className="whole">
      {arr.map((a) => (
        <SessionCard key={a.id} onClick={() => {
            console.log("a");
            handleClick(a)
    console.log(100)}} {...a} />
      ))}
    </div>
  );
}
export default Session;