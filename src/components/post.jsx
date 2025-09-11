import { useState } from 'react';
import { useNavigate } from "react-router"

export default function Post() {
  
  const navigate = useNavigate()
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePostVideo = () => {
    navigate("/upload/video")
  };

  const handlePostTweet = () => {
    navigate("/upload/tweet")
  };

  return (
    <div className="relative ml-[85%]">
      {/* Main Button */}
      
      <button
        onClick={toggleMenu}
        className={`w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl shadow-lg transition-all duration-300 transform ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        +
      </button>

      {/* Menu Options */}
      {isOpen && (
        <div className="absolute bottom-16 left-[-85px] flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={handlePostVideo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap"
          >
            📹 Post Video
          </button>
          <button
            onClick={handlePostTweet}
            className="px-4 py-2 bg-gray-700 hover:bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap"
          >
            🐦 Post Tweet
          </button>
        </div>
      )}

      {/* Backdrop to close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}