import React, { useState } from 'react';
import { Search, Bell, Video, MessageSquare, User, Edit, Save, X, UserPlus, Menu } from 'lucide-react';
import VideoComponent from "./video.jsx"
import TweetComponent from "./tweet.jsx"

const CometProfilePage = () => {
  const [activeTab, setActiveTab] = useState('Videos');
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Profile state
  const [profile, setProfile] = useState({
    username: 'jay',
    fullname: 'Olivia Bennett',
    email: 'olivia@example.com',
    avatar: 'src/assets/logo.png',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=300&fit=crop',
    password: ''
  });

  // Mock access token (replace with your actual token check)
  const accessToken = ""; // This will be your actual token variable

  // Mock data
  const videos = [
    {
      videoTitle: "Best funny video",
      videoThumbnail: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=225&fit=crop",
      videoDescription: "Discovering beautiful locations"
    },
    {
      videoTitle: "A Day in My Life: Morning Routine",
      videoThumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
      videoDescription: "My daily morning habits"
    },
    {
      videoTitle: "Fashion Trends for Summer 2024",
      videoThumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=225&fit=crop",
      videoDescription: "Latest summer fashion"
    },
    {
      videoTitle: "DIY Home Decor Ideas",
      videoThumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=225&fit=crop",
      videoDescription: "Creative home decoration"
    },
    {
      videoTitle: "Travel Vlog: My Trip to Japan",
      videoThumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=225&fit=crop",
      videoDescription: "Amazing Japanese adventure"
    },
    {
      videoTitle: "Healthy Eating Habits",
      videoThumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop",
      videoDescription: "Tips for healthy lifestyle"
    }
  ];

  const tweets = [
    {
      user: { name: "Olivia Bennett", avatar: profile.avatar },
      time: "2d ago",
      content: "Just uploaded a new video! Check out my latest travel vlog from Japan.",
      hashtags: ["travel", "japan"]
    },
    {
      user: { name: "Olivia Bennett", avatar: profile.avatar },
      time: "1w ago",
      content: "Excited to share my summer fashion trends video with you all!",
      hashtags: ["fashion", "summer"]
    }
  ];

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditingAbout(false);
    // Here you would typically save to your backend
    console.log('Profile updated:', profile);
  };

  const handleImageUpload = (field, file) => {
    if (file) {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, [field]: imageUrl }));
    }
  };

  const tabs = [
    { name: 'Videos', icon: Video, count: '300' },
    { name: 'Tweets', icon: MessageSquare, count: '1.2K' },
    { name: 'About', icon: User, count: null }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <img 
                src="src/assets/logo.png"
                className="w-13 h-13 ml-[-10px]"
                />
                <span className="text-lg sm:text-xl font-bold">Comet</span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-48 lg:w-64"
                />
              </div>
              <img src={profile.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-700 py-4">
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-md hover:bg-gray-700">Home</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Cover Image */}
        <div className="relative h-32 sm:h-48 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-pink-500/20" />
        </div>

        {/* Profile Info */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative inline-block mb-4">
            <img 
              src={profile.avatar} 
              alt="Profile" 
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 border-gray-800"
            />
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{profile.fullname}</h1>
          
          {/* Stats and Subscribe Button Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <div className="flex items-center text-gray-400 text-sm sm:text-base">
              <span className="mr-4 sm:mr-6">1.2M subscribers</span>
              <span className="mr-4 sm:mr-6">300 videos</span>
              <span>245 subscribed</span>
            </div>
            
            {/* Subscribe Button */}
            <button
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                isSubscribed 
                  ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                  : 'bg-green-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-600/25'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
            </button>
          </div>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            Olivia Bennett is a lifestyle vlogger sharing her daily life, travel adventures, and fashion tips. Join her journey for inspiration and positivity!
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6 sm:mb-8">
          <nav className="flex justify-center overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 sm:space-x-8 min-w-max px-4 sm:px-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex items-center space-x-2 pb-4 px-2 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.name
                        ? 'border-orange-500 text-white'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{tab.name}</span>
                    {tab.count && <span className="text-xs sm:text-sm">({tab.count})</span>}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="min-h-96">
          {activeTab === 'Videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {videos.map((video, index) => (
                <VideoComponent key={index} {...video} />
              ))}
            </div>
          )}

          {activeTab === 'Tweets' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-700">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Recent Tweets
                  </h2>
                </div>
                {tweets.map((tweet, index) => (
                  <TweetComponent key={index} {...tweet} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'About' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold flex items-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    About
                  </h2>
                  {accessToken === "" && (
                    <button
                      onClick={() => isEditingAbout ? handleSaveProfile() : setIsEditingAbout(!isEditingAbout)}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
                    >
                      {isEditingAbout ? (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    {isEditingAbout && accessToken === "" ? (
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => handleProfileUpdate('username', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-3 py-2 rounded-lg text-sm sm:text-base">@{profile.username}</p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    {isEditingAbout && accessToken === "" ? (
                      <input
                        type="text"
                        value={profile.fullname}
                        onChange={(e) => handleProfileUpdate('fullname', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-3 py-2 rounded-lg text-sm sm:text-base">{profile.fullname}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    {isEditingAbout && accessToken === "" ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      />
                    ) : (
                      <p className="text-white bg-gray-700 px-3 py-2 rounded-lg text-sm sm:text-base break-all">{profile.email}</p>
                    )}
                  </div>

                  {/* Avatar Upload */}
                  {isEditingAbout && accessToken === "" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Avatar Image</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <img 
                          src={profile.avatar} 
                          alt="Current avatar" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                        />
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('avatar', e.target.files[0])}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                          />
                          <p className="text-xs text-gray-400 mt-1">Upload a new avatar image (JPG, PNG, GIF)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cover Image Upload */}
                  {isEditingAbout && accessToken === "" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
                      <div className="flex flex-col gap-4">
                        <img 
                          src={profile.coverImage} 
                          alt="Current cover" 
                          className="w-full h-32 rounded-lg object-cover border-2 border-gray-600"
                        />
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('coverImage', e.target.files[0])}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                          />
                          <p className="text-xs text-gray-400 mt-1">Upload a new cover image (JPG, PNG, GIF)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  {isEditingAbout && accessToken === "" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        value={profile.password}
                        onChange={(e) => handleProfileUpdate('password', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  )}

                  {isEditingAbout && accessToken === "" && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        onClick={() => setIsEditingAbout(false)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base order-2 sm:order-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CometProfilePage;