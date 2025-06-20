import { useState } from "react";
import { User } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ initialComments ,sessionemail }) => {
    const navigate=useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const username = user?.username || "Anonymous";

  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [visibleNameId, setVisibleNameId] = useState(null);

  const addComment = async () => {
    if (!newComment.trim()) return;

    const newEntry = {
      comment: newComment.trim(),
      poster_email: email,
      poster_name: username,
    };

    try {
      const res = await fetch(`http://localhost:3000/article/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) throw new Error("Failed to update comments");

      const updated = await res.json();
      setComments(updated.comments);
      setNewComment(""); // clear input only on success
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(`http://localhost:3000/article/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!res.ok) throw new Error("Failed to delete comment");

      const updated = await res.json();
      setComments(updated.comments);
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div className="mt-10 bg-white shadow-md p-6 rounded-xl space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Comments</h3>

      {comments?.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comm) => (
            <li key={comm._id} className="flex items-start gap-3 relative"  onClick={() =>
                  setVisibleNameId(visibleNameId === comm._id ? null : comm._id)
                }>
              <div
                className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
                onClick={() =>
                  setVisibleNameId(visibleNameId === comm._id ? null : comm._id)
                }
              >
                <User className="w-5 h-5 text-gray-600" />
              </div>

{visibleNameId === comm._id && (
  <div
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/performance/${comm.poster_email}`);
    }}
    className="absolute left-10 top-1 z-10"
  >
    <h2 className="bg-blue-500 hover:bg-blue-600 text-white text-[14px] px-2 py-0.5 rounded-sm shadow-sm transition duration-200">
      View Profile
    </h2>
  </div>
)}




              <div>
                <p className="text-gray-800">{comm.comment}</p>
                <p className="text-sm text-gray-500">– {comm.poster_name}</p>
              </div>

          {(comm.poster_email === email || email === sessionemail) && (
  <button
    className="text-red-500 hover:underline ml-auto"
    onClick={() => handleDelete(comm._id)}
  >
    Delete
  </button>
)}

            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="flex-1 border border-gray-300 rounded-lg text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={addComment}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
