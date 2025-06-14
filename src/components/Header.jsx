import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/form");

  return (
    <header className="w-full py-10 px-4 flex flex-col items-center text-center space-y-5">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
        Welcome to <span className="text-blue-600">Peer Learning Platform</span>
      </h1>

      <p className="max-w-2xl text-gray-600 text-base sm:text-lg font-normal leading-relaxed">
  Share your expertise with peers by contributing to a growing collection of student-led sessions and topic explanations.
</p>


      <button
        onClick={handleClick}
        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-5 rounded-md transition"
      >
        Post your learning +
      </button>
    </header>
  );
};

export default Header;
