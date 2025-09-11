import React, { useState,useEffect } from 'react';
import { ChevronDown, ThumbsUp, ThumbsDown, MessageCircle, Bell } from 'lucide-react';
import { useNavigate } from "react-router"
import axios from "axios"
import { useParams } from "react-router"
import Loader from "./loader.jsx"
import Comment from "../components/comment.jsx"


const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div className={`rounded-full overflow-hidden bg-slate-700 flex items-center justify-center ${className}`}>
    {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <span>{fallback}</span>}
  </div>
);

export default function VideoWatchingPage() {
  

  const { vidId } = useParams()
  
  const navigate = useNavigate()
  
  function postComment(){
    console.log(comment)
    
    axios.post(`http://localhost:8080/api/v1/comments/${vidId}`, {
      "content": comment
    },{
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      setComment("")
    })
    .catch((err) => console.log(err))
    
  }
  
  
  const [video, setVideo] = useState({
  title: "",
  videoUrl: null,
  poster: "",
  likes: 0,
  dislikes: 0,
  comments: 0,
  description: "",
  creator: {
    name: "",
    avatar: "",
    subscribers: 0,
    isSubscribed: false,
  },
  tags: [],
});

  const [comment, setComment] = useState("")
  
  const [comments, setComments] = useState([])

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  // To check if video is liked
  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/v1/likes/${vidId}`, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      setIsLiked(res.data.data)
    })
    .catch((err) => console.log(err))
    
  }, [])
  
  // To get video and channel
  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/v1/videos/${vidId}`, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
      
      const videoRes = res?.data?.data?.[0]
      
      setVideo({
        title: videoRes.title,
        videoUrl: videoRes.videoFile,
        poster: videoRes.thumbnail,
        likes: videoRes.likesCount,
        dislikes: 0,
        comments: 0,
        description: videoRes.description,
        creator: {
          name: videoRes?.owner?.username,
          avatar: videoRes?.owner?.avatar,
          subscribers: videoRes?.owner?.subscribers,
          isSubscribed: videoRes?.owner?.isSubscribed,
        },
        tags: ["JayKaBeta","PapaJay"]
  })
      
    })
    .catch((err) => console.log(err))
    
  }, [])
  
  // To fetch comments
  useEffect(() => {
    
    console.log("Comment fetching")
    
    axios.get(`http://localhost:8080/api/v1/comments/${vidId}`, {withCredentials: true})
    .then((res) => {
      console.log(res)
      
      // res.data.data.docs[i]
      
      setComments(prev => {
        const ids = new Set(prev.map(c => c._id));
        const newComments = res.data.data.docs.filter(c => !ids.has(c._id));
        return [...newComments, ...prev];
      });

      
      console.log(comments)
      
    })
    
    .catch((err) => {
      console.log(err)
    })
    
  }, [])

  const handleLike = () => {
    if (isLiked) {
      setVideo(prev => ({ ...prev, likes: prev.likes - 1 }));
      setIsLiked(false);
      
      axios.post(`http://localhost:8080/api/v1/likes/toggle/v/${vidId}`,{}, {withCredentials: true})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
      
    } else {
      if (isDisliked) {
        setVideo(prev => ({ ...prev, dislikes: prev.dislikes - 1 }));
        setIsDisliked(false);
      }
      setVideo(prev => ({ ...prev, likes: prev.likes + 1 }));
      setIsLiked(true);
      
      axios.post(`http://localhost:8080/api/v1/likes/toggle/v/${vidId}`,{}, {withCredentials: true})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
      
      
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setVideo(prev => ({ ...prev, dislikes: prev.dislikes - 1 }));
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setVideo(prev => ({ ...prev, likes: prev.likes - 1 }));
        setIsLiked(false);
      }
      setVideo(prev => ({ ...prev, dislikes: prev.dislikes + 1 }));
      setIsDisliked(true);
    }
  };

  const handleComments = () => {
    console.log("Clucked Comment")
  }

  const handleSubscribe = () => {
    setVideo(prev => ({
      ...prev,
      creator: {
        ...prev.creator,
        isSubscribed: !prev.creator.isSubscribed,
        subscribers: prev.creator.isSubscribed
          ? prev.creator.subscribers - 1
          : prev.creator.subscribers + 1,
      },
    }));
  };

  const toggleDescription = () => setDescriptionExpanded(!descriptionExpanded);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
    
    <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img
            src="src/assets/logo.png"
            className="w-10 h-10"
            onClick={()=>navigate("/home")}
            />
            <span className="font-bold text-lg">Comet</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Shorts</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Subscriptions</a>
          </nav>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">O</span>
          </div>
        </div>
      </header>
    
      <div className="w-full">
        {/* Full Width Video Player */}
       
       <div className="container mx-auto px-0">
  {video.videoUrl ? (<video 
  key={video.videoUrl}
  controls
  poster={video.poster}
  className="w-[640px] h-[300px] object-cover rounded-xl"
>
  <source src={video.videoUrl} type="video/mp4" />
  Your browser does not support HTML video.
</video>

    
  ) : (
    <Loader />
  )}
</div>


        {/* Content Container */}
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Video Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-4 leading-tight">{video.title}</h1>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleLike}
                  className={`${isLiked
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-800 hover:bg-slate-700"} text-white`}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {formatNumber(video.likes)}
                </Button>

                <Button
                  onClick={handleDislike}
                  className={`${isDisliked
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-800 hover:bg-slate-700"} text-white`}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Dislike
                </Button>
              </div>

              <Button
                onClick={handleComments}
                className="border border-slate-700 text-white hover:bg-slate-800"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {formatNumber(video.comments)} Comments
              </Button>
            </div>
          </div>

          {/* Creator Info */}
          <Card className="bg-slate-900 border border-slate-800 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={video.creator.avatar}
                    alt={video.creator.name}
                    fallback={video.creator.name.charAt(0)}
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {video.creator.name}
                    </h3>
                    <p className="text-slate-400">
                      {formatNumber(video.creator.subscribers)} subscribers
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSubscribe}
                  className={`${video.creator.isSubscribed
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-red-600 hover:bg-red-700"} text-white px-6`}
                >
                  {video.creator.isSubscribed ? (
                    <>
                      <Bell className="w-4 h-4 mr-2" />
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card className="bg-slate-900 border border-slate-800">
            <CardContent className="p-0">
              <button
                onClick={toggleDescription}
                className="flex items-center justify-between w-full p-6 text-left hover:bg-slate-800 transition-colors rounded-lg"
              >
                <h2 className="text-xl font-semibold text-white">Description</h2>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${descriptionExpanded ? "rotate-180" : ""
                    }`}
                />
              </button>

              {descriptionExpanded && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-slate-800">
                    {video.description.split("\n\n").map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-slate-300 leading-relaxed text-lg mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {video.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center gap-2 p-4 backdrop-blur-md rounded-2xl shadow-md w-full max-w-lg">
            <input 
            type="text" 
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
            }}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 text-gray-800 placeholder-gray-400 bg-transparent border border-green-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-white"
          />
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:bg-green-600 active:scale-95 transition duration-200 shadow-md"
            onClick={postComment}
          >
            ➡️
          </button>
        </div>

        
        
        <div
        className=""
        >
        <h1 className="text-2xl font-bold pl-6 pb-6 pt-10">Comments:</h1>
        
        {
          comments.map((c) => (
            <Comment
            key = {c._id}
            userName = {c?.owner?.[0]?.username}
            timestamp = {c?.createdAt}
            avatarUrl = {c?.owner?.[0]?.avatar}
            commentText = {c?.content}
            _id = {c?._id}
            initialLikes = {c?.likes?.length}
            />
          ))
        }
        
        </div>
        
      </div>
    </div>
  );
}
