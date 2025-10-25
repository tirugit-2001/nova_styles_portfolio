import { useNavigate } from "react-router-dom";

export const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        How can we help you today?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Interior Design Option */}
        <div
          onClick={() => navigate("/ContactUs/interior")}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 p-8 flex flex-col items-center justify-between"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4">
              🏠
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Interior Design
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Work with our experts to design your dream interior space.
            </p>
          </div>

          <button
            onClick={() => navigate("/ContactUs/interior")}
            className="bg-brand text-white font-medium px-6 py-2 rounded-lg hover:bg-brand-dark transition-all duration-200"
          >
            Choose Interior Design
          </button>
        </div>

        {/* Construction Option */}
        <div
          onClick={() => navigate("/ContactUs/construction")}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 p-8 flex flex-col items-center justify-between"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 text-brand flex items-center justify-center rounded-full text-3xl font-bold mb-4">
              🏗️
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Construction
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Contact our construction team to start building your next project.
            </p>
          </div>

          <button
            onClick={() => navigate("/ContactUs/construction")}
            className="bg-brand text-white font-medium px-6 py-2 rounded-lg hover:bg-brand-dark transition-all duration-200"
          >
            Choose Construction
          </button>
        </div>
      </div>
    </div>
  );
};
