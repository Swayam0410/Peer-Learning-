import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";


const Form = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
        name: formData.get("name"),
        subject: formData.get("sub"),
        description: formData.get("description"),
        email: email,
        upvotes:[],
        viewed:[email],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleData(formData);
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 whole3">
    

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">📝 Share Your Learning</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            className="mt-1 block w-full px-4 py-2 border text-black rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">College ID</label>
          <input
            type="text"
            name="id"
            placeholder="e.g B522068"
            required
            className="mt-1 block w-full px-4 py-2 text-black border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Subject</label>
          <input
            type="text"
            name="sub"
            placeholder="E.g. TOC"
            required
            className="mt-1 block w-full px-4 py-2  text-black border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Semester</label>
          <input
            type="number"
            name="sem"
            min={1}
            max={8}
            placeholder="Semester to which the subject belongs"
            required
            className="mt-1 block w-full px-4 py-2  text-black border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Topic</label>
          <input
            type="text"
            name="topic"
            placeholder="E.g. Inheritance"
            required
            className="mt-1 block w-full px-4 py-2 text-black border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Your Content</label>
          <textarea
            name="description"
            placeholder="Explain your topic here..."
            rows={6}
            required
            className="mt-1 block w-full px-4 py-2 text-black border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 resize-none"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            🚀 Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;