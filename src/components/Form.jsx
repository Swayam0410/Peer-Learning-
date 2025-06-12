import "./Form.css"
import { useNavigate } from "react-router-dom";
import DataContext from "./Context/dataContext";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
const Form=()=>{
     const { user } = useUser();
      let em="";
     const navigate=useNavigate();
     const handleData=async (formData)=>{
        try{
             const newData={
            college_id:formData.get("id"),
            topic:formData.get("topic"),
            sem:formData.get("sem"),
            name:formData.get("name"),
            subject:formData.get("sub"),
            description:formData.get("description"),
            email:em
        };
        console.log(newData);
             const res=await fetch('http://localhost:3000/form',{
            method:'Post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        console.log("completed posting");
        
        }catch(err){
            console.error('Error Sending Data',err);
        }finally{
            navigate("/");
        }  
    
    }
    useEffect(()=>{
        em=String(user.emailAddresses[0].emailAddress);
    },[]);
  const handleSubmit = (e) => {
    e.preventDefault();               // ← stop full‐page reload
    const formData = new FormData(e.target);
    handleData(formData);
  };
    return (
        <form onSubmit={handleSubmit} className="whole3" >
            <label htmlFor="name">Enter Your Name:</label>
            <input type="text" name="name" id="" required/>
            <label htmlFor="id">Enter Your Id:</label>
            <input type="text" name="id" id="" required/>
            <label htmlFor="sub">Enter Subject:</label>
            <input type="text" name="sub" id="" required/>
            <label htmlFor="sem">Subject Semester:</label>
            <input type="number" name="sem" id="" required min={1} max={8}/>
            <label htmlFor="topic">Enter Topic:</label>
            <input type="text" name="topic" id="" required/>
            <label htmlFor="description">Enter your Content:</label>
            <textarea name="description" id="" className="cnt" required></textarea>
            <button type="submit" className="button1">Submit</button>
        </form>
    );
}
export default Form;