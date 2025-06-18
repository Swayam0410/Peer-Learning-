import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new";

const Form = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
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
        name: formData.get("name"),
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

      <input
  type="text"
  name="name"
  placeholder="Enter Your Name"
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

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
  required
  className="px-4 py-3 text-base text-black placeholder-gray-400 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
/>

<input
  type="text"
  name="topic"
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
