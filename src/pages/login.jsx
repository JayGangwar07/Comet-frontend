import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios";

export default function Login() {
  const navigate = useNavigate(); // For navigation

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const login = () => {
    console.log("Log in initiated");

    axios.post("http://localhost:8080/api/v1/users/login", {
      username: loginData.username,
      password: loginData.password
    }, { withCredentials: true })
      .then((res) => {
        console.log(res.data.data.user);
        navigate('/home'); // Redirect after successful login
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogin = () => {
    const newErrors = {
      username: !loginData.username.trim(),
      password: !loginData.password.trim()
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error);

    if (!hasErrors) {
      console.log('Login submitted:', loginData);
      login();
    } else {
      console.log('Login form has validation errors');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-2">
          <img 
            src="src/assets/logo.png"
            className="w-10 h-10 ml-[-15px]"
            alt="Comet"
          />
          <span className="text-xl font-bold">Comet</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-green-400 transition-colors">Home</a>
          <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Series</a>
          <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Movies</a>
          <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">New & Notable</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            className="text-white hover:text-green-400 transition-colors"
            onClick={() => navigate('/register')} // Redirect to register
          >
            Register
          </button>
          <button 
            onClick={handleLogin} // Login button
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-medium transition-colors"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome back</h1>
            <p className="text-gray-400 text-lg">Ready to dive back into your favorite shows?</p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username or email"
                value={loginData.username}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.username ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-green-500'
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2 px-2">Username or email is required</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-green-500'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 px-2">Password is required</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              className="w-full py-4 bg-green-500 hover:bg-green-600 transition-colors rounded-full text-white font-semibold text-lg mt-6"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400">
                New to Comet? 
                <button 
                  className="text-green-500 hover:text-green-400 ml-1 transition-colors"
                  onClick={() => navigate('/register')} // Redirect to register
                >
                  Sign up now.
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
