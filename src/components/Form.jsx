import "./Form.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./Context/dataContext";
const Form=()=>{
     const navigate=useNavigate();
     const [data,SetData]=useContext(DataContext);
     const handleData=(formData)=>{
        const newData={
            id:formData.get("id"),
            topic:formData.get("topic"),
            sem:formData.get("sem"),
            name:formData.get("name"),
            subject:formData.get("sub"),
            description:formData.get("content")
        };
        SetData(data=>[...data,newData]);
        navigate("/");
     }
    return (
        <form action={handleData} className="whole3" >
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
            <label htmlFor="content">Enter your Content:</label>
            <textarea name="content" id="" className="cnt" required></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}
export default Form;