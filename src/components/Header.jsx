import { useNavigate } from "react-router-dom";

const Header=()=>{
const navigate=useNavigate();
    return <>
       <h1>WELCOME TO PEER LEARNING PLATFORM</h1>
        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Sed nobis sequi, quisquam adipisci commodi voluptatum a totam quam eos dolor incidunt, excepturi optio, 
            iste facere soluta earum laborum laboriosam. At!</h3>
            <button onClick={()=>navigate("/form")}>Post your learning +</button>
    </>
}
export default Header;