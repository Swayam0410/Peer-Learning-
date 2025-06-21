import { useLocation, useNavigate} from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react"; 
import { User } from "lucide-react";
import CommentSection from "./Comments";
import { useUser } from "@clerk/clerk-react";

const Article = () => {
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const user=useUser();
  const navigate=useNavigate();
  const location = useLocation();
  const  entry  = location.state.entry || location.state.post ||{}


  const [comments,setComments]=useState(entry.comments);
  useEffect(() => {
    console.log(user.user.emailAddresses[0].emailAddress);
  setLoggedInEmail(String(user.user.emailAddresses[0].emailAddress));
   
  }, [user]);
  if (!entry) return <div className="text-center mt-10 text-red-500">No data found.</div>;

  return (
    <div className="min-h-screen px-6 py-8 md:px-20 bg-gray-50">
      {/* <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button> */}

      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">{entry.topic}</h1>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4">
            <p><strong>Contributed by:</strong> {entry.name}</p>
            <p><strong>College ID:</strong> {entry.college_id}</p>
            <p><strong>Subject:</strong> {entry.subject}</p>
          </div>
        </div>

      <div
  className="prose max-w-none text-lg leading-relaxed text-gray-700 mx-auto"
  dangerouslySetInnerHTML={{ __html: entry.description }}
/>
   {entry.email===loggedInEmail && <button onClick={()=>navigate(`/edit/${entry._id}`)} className="text-black border-blur-300 border-4 bg-blue-400">Edit Content</button>}
      </div>
      <CommentSection initialComments={comments} sessionemail={entry.email}/>

    </div>
  );
};

export default Article;
