import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Article = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { entry } = location.state || {};

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

        <div className="prose max-w-none text-lg leading-relaxed text-gray-700 mx-auto">
          {entry.description}
        </div>
      </div>
    </div>
  );
};

export default Article;
