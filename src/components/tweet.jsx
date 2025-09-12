import React, { useState,useEffect } from 'react';
import { Heart, MessageCircle, BarChart3, MoreHorizontal } from 'lucide-react';
import axios from "axios"

const Tweet = ({
  id,
  author = "Sarah Johnson",
  handle = "@TechSavvySarah",
  timeAgo = "2h",
  content = "test",
  hashtags = ["#JayKaBeta"],
  initialLikes = 0,
  initialComments = 0,
  initialViews = "12k",
  profileImage = "src/assets/logo.png",
  subscribers = 0,
}) => {
  
  const getLikes = () => {
    
    axios.get(`https://jaytube.onrender.com/api/v1/likes/g/${id}`, {withCredentials: true})
    .then((res) => {
      setLikes(res.data?.data?.[0]?.total)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  
  const checkIfLiked = ()  => {
    
    axios.get(`https://jaytube.onrender.com/api/v1/likes/${id}`, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      setIsLiked(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }
  
  useEffect(() => {
    getLikes()
    checkIfLiked()
  }, [])
  
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [views] = useState(initialViews);
  const [isLiked, setIsLiked] = useState(false);
  const [tweetSubscribers,setTweetSubscribers] = useState(subscribers)
  const [avatar,setAvatar] = useState(profileImage)


  const handleLike = () => {
    
    console.log(id)
    
    if (isLiked) setIsLiked(false)
      if (!isLiked) setIsLiked(true)
    
    axios.post(`https://jaytube.onrender.com/api/v1/likes/toggle/t/${id}`, {}, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      getLikes()
      checkIfLiked()
    })
    .catch((err) => {
      console.log(err)
    })
    
  };

  const handleComment = () => {
    
    // Logic ↓
    
  };

  return (
    <div className="max-w-full mx-auto bg-gray-900 text-white p-6 rounded-xl border border-gray-800">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={avatar}
            alt={`${author} profile`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white">{author}</h3>
              <span className="text-gray-400">{handle}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-400">{tweetSubscribers} subs</span>
              <span className="text-gray-400">{timeAgo}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-300 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-white text-lg leading-relaxed mb-2">
          {content}
        </p>
        <div className="flex flex-wrap gap-1">
          {hashtags.map((tag, index) => (
            <span key={index} className="text-blue-400 hover:text-blue-300 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center space-x-8">
          {/* Comments */}
          <button 
            onClick={handleComment}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
              <MessageCircle size={18} />
            </div>
            <span className="text-sm">{comments}</span>
          </button>

          {/* Likes */}
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors group ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors ${
              isLiked ? 'bg-red-500/10' : 'group-hover:bg-red-400/10'
            }`}>
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </div>
            <span className="text-sm">{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;