import React, { useState } from 'react';
import time from "../utils/time.js"

const Comment = ({ 
  userName = "Sophia Carter", 
  timestamp = "2 weeks ago", 
  commentText = "Test",
  avatarUrl = null,
  initialLikes = 12000,
  _id = ""
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const formatLikes = (count) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-gray-900 text-white p-4 max-w-4xl border-t-1 border-b-1 border-white">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-white text-sm font-medium">
                {userName.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* User name and timestamp */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-200 text-sm font-medium">{userName} • </span>
            <span className="text-gray-400 text-xs">{time(timestamp)}</span>
          </div>

          {/* Comment text */}
          <p className="text-gray-200 text-sm mb-3 leading-relaxed">
            {commentText}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Like button */}
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <svg 
                className={`w-4 h-4 ${isLiked ? 'fill-white' : 'fill-none'} stroke-current`} 
                viewBox="0 0 24 24" 
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-.971a6.01 6.01 0 0 0-1.844-.288H5.25a2.25 2.25 0 0 1-2.25-2.25v-7.5a2.25 2.25 0 0 1 2.25-2.25h.394c.464 0 .892.142 1.24.392l2.308 1.66c.147.105.31.189.487.25a2.25 2.25 0 0 0 .896.186Z" />
              </svg>
              <span className="text-xs">{formatLikes(likes)}</span>
            </button>

            {/* Dislike button */}
            <button className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114.971c.329.104.652.227.960.374a5.25 5.25 0 0 1-.142-4.071C15.67 1.033 16.18.75 16.75.75c.867 0 1.5.833 1.5 1.75 0 .694-.106 1.364-.298 2.003-.18.6-.234 1.237-.133 1.864.083.537-.097 1.06-.612 1.306a4.5 4.5 0 0 1-1.423.23H13.5L12 9.75l1.5 2.25H17.372c.514 0 .986.246 1.298.663.326.44.504.973.504 1.537v.75c0 .861-.386 1.647-1 2.25a2.25 2.25 0 0 1-2.25-.75v-.5Z" />
              </svg>
            </button>

            {/* Reply button */}
            <button className="text-gray-400 hover:text-white transition-colors text-xs font-medium">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;