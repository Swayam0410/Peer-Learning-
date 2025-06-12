import "./SessionCard.css"
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useEffect ,useState} from "react";
import ConfirmDialog from "./ConfirmDialog";

let SessionCard=({topic,sem,name,subject,onClick,_id,email})=>{
        const [showDialog,setShowDialog]=useState(false);
         const { user } = useUser();
  const [loggedInEmail, setLoggedInEmail] = useState("");
//   const navigate = useNavigate();

  useEffect(() => {
    if (user && user.emailAddresses && user.emailAddresses.length > 0) {
      setLoggedInEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);
        console.log(_id);
        const handleClick=async (e)=>{
         console.log(loggedInEmail);
         console.log(email);
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
   return (<div className="outer">
           <h2 className="topic">Topic:{topic}</h2>
           <h3>Semester:{sem}</h3>
           <h3>Subject:{subject}</h3>
           <h3>Contributed by:{name}</h3>
           <div>
                      {loggedInEmail === email && (
        <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 active:bg-red-700 transition text-lg" onClick={(e) => {
              e.stopPropagation();
              setShowDialog(true);
            }}>
           
  <Trash2 className="w-4 h-4" />
        </button>
      )}
      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition viewbtn" onClick={onClick}>View</button>
        <ConfirmDialog
            open={showDialog}
            onOpenChange={setShowDialog}
            onConfirm={handleClick}
            onCancel={() => setShowDialog(false)}
          />
           </div>
   </div>);
}

export default SessionCard;