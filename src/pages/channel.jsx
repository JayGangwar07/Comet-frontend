import React, { useState } from 'react';
import { Search, Bell, Video, User, Clock, Play } from 'lucide-react';

// Video Card Component
const VideoCard = ({ video, onVideoClick }) => {
  return (
    <article 
      className="group cursor-pointer"
      onClick={() => onVideoClick(video)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onVideoClick(video);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-700">
        <img
          src={video.thumbnail}
          alt=""
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" aria-hidden="true" />
        </div>
      </div>
      <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
        {video.title}
      </h3>
      <div className="text-sm text-gray-400 space-y-1">
        <p>{video.views} views</p>
        <p>{video.uploadTime}</p>
      </div>
    </article>
  );
};

// Tweet Card Component
const TweetCard = ({ tweet, userAvatar, userName }) => {
  return (
    <article className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
      <img
        src={userAvatar}
        alt=""
        className="w-12 h-12 rounded-full bg-gray-700"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="font-medium">{userName}</h3>
          <span className="text-gray-400 text-sm">{tweet.timestamp}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{tweet.content}</p>
      </div>
    </article>
  );
};

// Watch History Item Component (now using VideoCard)
const WatchHistoryItem = ({ item }) => {
  // Transform watch history item to match VideoCard expected format
  const videoData = {
    id: item.id,
    title: item.title,
    thumbnail: item.thumbnail,
    channel: item.channel,
    watchedAt: item.watchedAt,
    progress: item.progress
  };

  return (
    <VideoCard 
      video={videoData} 
      variant="list" 
      showProgress={true}
      onVideoClick={(video) => console.log('Playing:', video.title)}
    />
  );
};

// Videos Grid Component
const VideosGrid = ({ videos, onVideoClick }) => {
  return (
    <div role="tabpanel" id="videos-panel" aria-labelledby="videos-tab">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onVideoClick={onVideoClick}
          />
        ))}
      </div>
    </div>
  );
};

// Tweets List Component
const TweetsList = ({ tweets, userAvatar, userName }) => {
  return (
    <div role="tabpanel" id="tweets-panel" aria-labelledby="tweets-tab">
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Recent Tweets</h2>
        {tweets.map((tweet) => (
          <TweetCard 
            key={tweet.id} 
            tweet={tweet} 
            userAvatar={userAvatar}
            userName={userName}
          />
        ))}
      </div>
    </div>
  );
};

// Watch History List Component
const WatchHistoryList = ({ watchHistory }) => {
  return (
    <div role="tabpanel" id="history-panel" aria-labelledby="history-tab">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Watch History</h2>
        <div className="space-y-4">
          {watchHistory.map((item) => (
            <WatchHistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-gray-800 px-4 py-3 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded transform rotate-45"></div>
            <span className="text-xl font-bold">Comet</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Home">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Shorts">Shorts</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Subscriptions">Subscriptions</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              aria-label="Search videos"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors" aria-label="Notifications">
            <Bell className="w-6 h-6" />
          </button>
          <button className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center" aria-label="User menu">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Profile Header Component
const ProfileHeader = ({ profile }) => {
  return (
    <>
      {/* Hero Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-br from-blue-400 via-blue-400 to-green-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-400/30"></div>
        <div className="absolute top-8 right-8 w-32 h-32 bg-orange-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-12 left-12 w-24 h-24 bg-red-500 rounded-full opacity-40"></div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
          <img
            src={profile.avatar}
            alt={`${profile.name} profile picture`}
            className="w-32 h-32 rounded-full border-4 border-gray-900 bg-gray-700"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span>{profile.subscribers} subscribers</span>
              <span>•</span>
              <span>{profile.videoCount} videos</span>
            </div>
            <p className="text-gray-300 max-w-3xl leading-relaxed">{profile.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'tweets', label: 'Tweets', icon: null },
    { id: 'history', label: 'Watch History', icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="border-b border-gray-700 mb-6">
        <nav className="flex space-x-8" role="tablist" aria-label="Content sections">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                onClick={() => onTabChange(tab.id)}
                className={`py-3 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 inline-block mr-2" aria-hidden="true" />}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

// Main Component
export default function VideoCreatorProfile() {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Profile data state
  const [profile] = useState({
    name: "Olivia Bennett",
    subscribers: "1.2M",
    videoCount: "300",
    bio: "Olivia Bennett is a lifestyle vlogger sharing her daily life, travel adventures, and fashion tips. Join her journey for inspiration and positivity!",
    avatar: "/api/placeholder/120/120"
  });

  // Videos state
  const [videos] = useState([
    {
      id: 1,
      title: "Exploring the Hidden Gems of Italy",
      thumbnail: "/api/placeholder/300/200",
      views: "125K",
      uploadTime: "3 days ago"
    },
    {
      id: 2,
      title: "A Day in My Life: Morning Routine",
      thumbnail: "/api/placeholder/300/200",
      views: "98K",
      uploadTime: "1 week ago"
    },
    {
      id: 3,
      title: "Fashion Trends for Summer 2024",
      thumbnail: "/api/placeholder/300/200",
      views: "210K",
      uploadTime: "2 weeks ago"
    },
    {
      id: 4,
      title: "DIY Home Decor Ideas",
      thumbnail: "/api/placeholder/300/200",
      views: "156K",
      uploadTime: "3 weeks ago"
    },
    {
      id: 5,
      title: "Travel Vlog: My Trip to Japan",
      thumbnail: "/api/placeholder/300/200",
      views: "189K",
      uploadTime: "1 month ago"
    },
    {
      id: 6,
      title: "Healthy Eating Habits",
      thumbnail: "/api/placeholder/300/200",
      views: "87K",
      uploadTime: "1 month ago"
    }
  ]);

  // Tweets state
  const [tweets] = useState([
    {
      id: 1,
      content: "Just uploaded a new video! Check out my latest travel vlog from Japan. #travel #japan",
      timestamp: "2d ago"
    },
    {
      id: 2,
      content: "Excited to share my summer fashion trends video with you all! #fashion #summer",
      timestamp: "1w ago"
    },
    {
      id: 3,
      content: "Working on some exciting new content. Can't wait to share it with you!",
      timestamp: "2w ago"
    }
  ]);

  // Watch history state
  const [watchHistory] = useState([
    {
      id: 1,
      title: "Morning Skincare Routine",
      channel: "Beauty Guru",
      thumbnail: "/api/placeholder/160/90",
      watchedAt: "2 hours ago",
      progress: 85
    },
    {
      id: 2,
      title: "Cooking Pasta from Scratch",
      channel: "Chef's Table",
      thumbnail: "/api/placeholder/160/90",
      watchedAt: "1 day ago",
      progress: 100
    },
    {
      id: 3,
      title: "Photography Tips for Beginners",
      channel: "Photo Pro",
      thumbnail: "/api/placeholder/160/90",
      watchedAt: "3 days ago",
      progress: 45
    },
    {
      id: 4,
      title: "Minimalist Home Tour",
      channel: "Design Studio",
      thumbnail: "/api/placeholder/160/90",
      watchedAt: "1 week ago",
      progress: 70
    }
  ]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <ProfileHeader profile={profile} />
      
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4">
        {activeTab === 'videos' && (
          <VideosGrid videos={videos} onVideoClick={handleVideoClick} />
        )}

        {activeTab === 'tweets' && (
          <TweetsList 
            tweets={tweets} 
            userAvatar={profile.avatar}
            userName={profile.name}
          />
        )}

        {activeTab === 'history' && (
          <WatchHistoryList watchHistory={watchHistory} />
        )}
      </div>

      {/* Footer spacing */}
      <div className="h-16"></div>
    </div>
  );
}