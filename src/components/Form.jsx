import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";
import { toast } from "react-hot-toast";
import { marked } from "marked";


const Form = () => {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [topicSub,setTopicSub]=useState("");
  const [subs,setSubs]=useState("");
  const navigate = useNavigate();
  const [des, setDes] = useState("");

  useEffect(() => {
    if (user && user.emailAddresses?.length > 0) {
      setEmail(String(user.emailAddresses[0].emailAddress));
    }
  }, [user]);

  const handleData = async (formData) => {
    try {
      const newData = {
        college_id: formData.get("id"),
        topic: formData.get("topic"),
        sem: formData.get("sem"),
        name: user?.fullName,
        subject: formData.get("sub"),
        description: des,
        email: email,
        upvotes: [],
        viewed: [email],
      };

      console.log(newData);

      await fetch("http://localhost:3000/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      console.log("Completed posting");
    } catch (err) {
      console.error("Error sending data", err);
    } finally {
      navigate("/");
    }
  };
const analyzeContent = async (text) => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });

    const data = await res.json();
    console.log("Suggestions:", data.suggestion);
    setAiSuggestion(data.suggestion);
  } catch (error) {
    console.error("Error analyzing content:", error);
  } finally {
    setLoading(false);
  }
};

function formatSuggestion(text) {
  return marked.parse(text);
}


const handleAnalyze = async () => {
  if (!des || !topicSub || !subs) {
    toast.error("Please fill in Subject, Topic, and Description first.");
    return;
  }

  toast.loading("Analyzing content...");

  try {
    await analyzeContent(des);
    toast.dismiss(); // Remove loading toast
    toast.success("AI suggestions generated!");
  } catch (err) {
    toast.dismiss();
    toast.error("Failed to analyze content.",err);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleData(formData);
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
className="min-h-[80vh] bg-white shadow-md rounded-2xl p-8 w-full max-w-screen-lg sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-3/4 2xl:w-2/3 flex flex-col gap-6"

      >
        <h2 className="text-2xl font-light text-center text-black">
          📝 Share Your Learning
        </h2>

      {/* <input
  type="text"
  name="name"
  placeholder="Enter Your Name"
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/> */}

<input
  type="text"
  name="id"
  placeholder="Enter College ID"
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

<input
  type="text"
  name="sub"
  placeholder="Enter Subject"
  value={subs}
  onChange={(e)=>setSubs(e.target.value)}
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

<input
  type="text"
  name="topic"
  value={topicSub}
  onChange={(e)=>setTopicSub(e.target.value)}
  placeholder="Topic"
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

<input
  type="number"
  name="sem"
  min={1}
  max={8}
  placeholder="Semester to which the subject belongs"
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>


      

      <div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-black">Your Content</label>
  <ReactQuill
    name="description"
    value={des}
    onChange={setDes}
    placeholder="Explain your topic here"
    required
    theme="snow"
    className="rounded-xl bg-white shadow-md text-black h-[250px]"
    style={{
      height: "250px", // Total component height
    }}
  />
  
</div>
<button
  type="button"
  onClick={handleAnalyze}
  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 "
>
  Analyze with AI 🤖
</button>

{loading && (
  <div className="text-blue-700 font-medium mt-2 animate-pulse">
    🤖 Generating suggestions...
  </div>
)}

{aiSuggestion && (
  <div className="bg-gray-100 border border-blue-300 rounded-md p-4 mt-4">
    <h3 className="text-lg font-semibold text-blue-800 mb-2">
      💡 AI Suggestions:
    </h3>
<div
  className="text-gray-800 prose max-w-none"
  dangerouslySetInnerHTML={{ __html: formatSuggestion(aiSuggestion) }}
></div>

  </div>
)}



        <button
          type="submit"
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 mx-auto disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
