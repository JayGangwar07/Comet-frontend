import React, { useState,useEffect } from 'react';
import { Search, Bell, Play } from 'lucide-react';
import VideoCard from "../components/video.jsx"
import TweetCard from "../components/tweet.jsx"
import Post from "../components/post.jsx"
import axios from "axios"
import time from "../utils/time.js"

export default function CometInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [videos,setVideos] = useState([
    /* {
      id: 1,
      videoTitle: "test",
      videoThumbnail: "src/assets/logo.png",
      videoDescription: "test",
      videoDuration: "9:58",
      videoOwner: "Papa",
      videoSubscribers: "1.2k",
      videoViews: "1.9k",
      videoDaysAgo: "2 days ago"
    },*/
  ])

  const [tweets,setTweets] = useState([])
  
  // Videos
  useEffect(() => {
  console.log("Video Fetching start");

  axios
    .get(`http://localhost:8080/api/v1/videos/?query=${searchQuery}`, {
      withCredentials: true,
    })
    .then(async (res) => {
      const videos = res.data.data.videos;

      // Fetch subCounts in parallel
      const videoWithSubs = await Promise.all(
        videos.map(async (v) => {
          let subCount = 0;
          try {
            const subRes = await axios.get(
              `http://localhost:8080/api/v1/subscriptions/c/${v?.owner?.[0]?._id}`,
              { withCredentials: true }
            );
            console.log(subRes)
            subCount = subRes.data.data?.length || 0;
          } catch (err) {
            console.log(err);
          }

          return {
            vidId: v?.vidId,
            videoTitle: v.title,
            videoThumbnail: v.thumbnail,
            videoDescription: v.description,
            videoDuration: v.duration,
            videoOwner: v?.owner?.[0]?.username,
            videoSubscribers: subCount,
            videoViews: v.views,
            videoDaysAgo: v.createdAt,
            profileImage: v?.owner?.[0]?.avatar
          };
        })
      );

      setVideos(videoWithSubs);
      console.log("Final videos:", videoWithSubs);
    })
    .catch((err) => {
      console.log(err);
    });
}, [searchQuery]);

  // Tweets
  useEffect(() => {
  axios
    .get("http://localhost:8080/api/v1/tweets", { withCredentials: true })
    .then((res) => {
      const allTweets = res.data.data || [];

      // Map ALL tweets once
      const formattedTweets = allTweets.map((tweet) => ({
        id: tweet._id,
        author: tweet?.owner?.[0]?.username,
        handle: "@" + tweet?.owner?.[0]?.username,
        timeAgo: time(tweet.createdAt),
        content: tweet.content,
        initialLikes: tweet?.likes?.length || 0,
        initialComments: tweet?.comments?.length || 0,
        avatar: tweet?.owner?.[0]?.avatar,
        subscribers: tweet?.subscribers?.length,
      }));

      setTweets(formattedTweets)
      
      console.log(tweets)
      
    })
    .catch((err) => {
      console.log(err);
    });
}, [searchQuery]);


  

const createContentGrid = () => {
  const content = [];
  const totalItems = videos.length + tweets.length;

  let v = 0; // pointer for videos
  let t = 0; // pointer for tweets

  // interleave: 3 videos → 1 tweet → repeat
  while (v < videos.length || t < tweets.length) {
    // push up to 3 videos
    for (let i = 0; i < 3 && v < videos.length; i++) {
      const video = videos[v++];
      content.push({
        type: "video",
        data: video,
        key: `video-${video.vidId}`,
      });
    }

    // then 1 tweet (if available)
    if (t < tweets.length) {
      const tweet = tweets[t++];
      content.push({
        type: "tweet",
        data: tweet,
        key: `tweet-${tweet.id}`,
      });
    }
  }

  return content;
};

  



  const contentGrid = createContentGrid();

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img
            src="src/assets/logo.png"
            className="w-10 h-10"
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-600"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">O</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gray-500 focus:bg-gray-600"
            />
          </div>
        </div>

        
        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{contentGrid.map((item) =>
  item.type === 'video' ? (
    <VideoCard
      key={item.key} // ✅ use consistent key
      videoTitle={item.data.videoTitle}
      videoOwner={item.data.videoOwner}
      videoViews={item.data.videoViews}
      videoDaysAgo={item.data.videoDaysAgo}
      videoThumbnail={item.data.videoThumbnail}
      videoSubscribers={item.data.videoSubscribers}
      profileImage={item.data.profileImage}
      videoDuration={item.data.videoDuration}
      vidId={item.data.vidId}
    />
  ) : (
    <TweetCard
  id={item.data.id}
  key={item.key}
  author={item.data.author}
  handle={item.data.handle}
  content={item.data.content}
  timeAgo={item.data.timeAgo}
  profileImage={item.data.avatar}
  initialLikes={item.data.initialLikes}
  initialComments={item.data.initialComments}
  subscribers={item.data.subscribers}
/>)
)}

        <div className="fixed ml-[65%] mt-[115%]">
        <Post />
        </div>

          
        </div>
      </main>
    </div>
  );
}