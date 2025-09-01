import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from "./components/login.jsx"
import Register from "./components/register.jsx"
import Video from "./components/video.jsx"
import Tweet from "./components/tweet.jsx"
import Channel from "./components/channel.jsx"

// Pages import
import Loader from "./pages/loader.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Channel />
  </StrictMode>,
)
