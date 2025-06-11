import "./SessionCard.css"
import { useNavigate } from "react-router-dom";

let SessionCard=({topic,sem,name,subject,onClick,_id})=>{
        const navigate=useNavigate();
        console.log(_id);
        const handleClick=async (e)=>{
                e.stopPropagation();
                e.preventDefault();
                try{
                const res=await fetch('http://localhost:3000/form',{
                method:'Delete',
                 headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
                });
                const resp=res.json();
                console.log(resp);
                }catch(err){
                        console.log("error deleting file",err);
                }finally{
                        window.location.reload();
                }
                
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