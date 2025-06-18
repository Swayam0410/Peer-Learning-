import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { ArrowBigUp } from "lucide-react";


const SessionCard = ({ onClick,topic, sem, name, subject, _id, email,upvotes }) => {
  const [hasUpvoted,setHasUpvoted]=useState(false);
  const [upvotesCount,setUpvotesCount]=useState(upvotes.length);
  const [upvotesArr,setUpvotesArr]=useState(upvotes);
  const [showDialog, setShowDialog] = useState(false);
  const { user } = useUser();
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(200);
    if (user?.emailAddresses?.length > 0) {
      setLoggedInEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);

  const handleClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/form', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      });
      const resp = await res.json();
      console.log(resp);
    } catch (err) {
      console.error("Error deleting file", err);
    } finally {
      window.location.reload();
    }
  };

  const editHandle = () => {
    navigate(`/edit/${_id}`);
  };

  const handleUpotes=async (e)=>{

    e.stopPropagation();

  const res = await fetch("http://localhost:3000", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail: loggedInEmail ,id:_id}),
  });

  const data = await res.json();
  if (res.ok) {
    setUpvotesArr(data.upvotes);
    setHasUpvoted(data.upvoted);
    setUpvotesCount(data.count);
  }
  }

  return (
   <div
  className="relative bg-gradient-to-br from-cyan-700 to-cyan-900 text-white rounded-2xl shadow-xl p-6 w-full max-w-md hover:scale-[1.02] transition-transform duration-300 ease-in-out cursor-pointer"
>
  {/* 🔼 Upvote Button Positioned at Top-Right */}
   <button
    className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full border font-semibold shadow transition-all
      ${upvotesArr.includes(loggedInEmail)
        ? 'bg-yellow-400 text-yellow-900 border-yellow-500 scale-105 shadow-lg'
        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}
    `}
    onClick={handleUpotes}
  >
    
    <ArrowBigUp
      size={20}
      className={`transition-transform ${
        hasUpvoted ? 'fill-yellow-700 text-yellow-700' : 'text-gray-500'
      }`}
    /> 
    {upvotesCount}
  </button>

  <h2 className="text-2xl font-bold mb-2 tracking-wide">📌 {topic}</h2>
  <p className="text-sm mb-1">🎓 <span className="font-semibold">Semester:</span> {sem}</p>
  <p className="text-sm mb-1">📘 <span className="font-semibold">Subject:</span> {subject}</p>
  <p className="text-sm mb-4">🙋‍♂️ <span className="font-semibold">Contributed by:</span> {name}</p>

  <div className="flex flex-wrap gap-3 justify-center items-center">
    {loggedInEmail === email && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDialog(true);
        }}
        className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all"
      >
        <Trash2 size={18} />
        Delete
      </button>
    )}

    <button
      onClick={onClick}
      className="px-4 py-2 bg-white text-cyan-800 rounded-full font-semibold border border-cyan-300 hover:bg-cyan-100 transition-all"
    >
      👁️ View
    </button>

    {loggedInEmail === email && (
      <button
        onClick={editHandle}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
      >
        <Pencil size={18} />
        Edit
      </button>
    )}

    <ConfirmDialog
      open={showDialog}
      onOpenChange={setShowDialog}
      onConfirm={handleClick}
      onCancel={() => setShowDialog(false)}
    />
  </div>
</div>

  );
};

export default SessionCard;
