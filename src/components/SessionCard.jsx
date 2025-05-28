import "./SessionCard.css"
import { useContext } from "react";
import dataContext from "./Context/dataContext";
let SessionCard=({topic,sem,name,subject,onClick,id})=>{
        const [data,setData]=useContext(dataContext);
        const handleClick=(e)=>{
                e.stopPropagation();
                e.preventDefault();
                const arr=data.filter(a=>a.id!==id && a.topic!=topic);
                setData(arr);
        }
   return (<div className="outer" onClick={onClick}>
           <h2 className="topic">Topic:{topic}</h2>
           <h3>Semester:{sem}</h3>
           <h3>Subject:{subject}</h3>
           <h3>Contributed by:{name}</h3>
           <button className="del" onClick={handleClick}>Delete</button>
   </div>);
}

export default SessionCard;