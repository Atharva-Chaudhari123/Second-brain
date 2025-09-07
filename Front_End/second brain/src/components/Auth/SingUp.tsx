import { useState } from "react";
import { User, Lock, Brain, Eye, EyeOff } from "lucide-react";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext, type IUserData } from "../../context/UsersContext";

const navigate = useNavigate() ;
// Define the shape of the sign-up form data.
interface SignUpFormData {
  username: string;
  password: string;
}

// configuring  context
const context = useContext(UserContext) ;

if(!context){
  throw new Error("Context must be set ") ;
}
const {setUser} = context ;


export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // --- Form Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear any previous messages.
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const username :string  = formData.username ;
    const password :string  = formData.password ;
    if( username.length < 3){
        return setMessage("Username must be more than 3 characters") ;
    }
    if(password.length < 8){
        return setMessage("Password must be more than 8 characters") ;
    }
    await axios.post("http://localhost:8000/user/signup", formData) 
    .then((res : AxiosResponse)=>{
        setMessage("Success :" + res.data.message);
        localStorage.setItem("JWT_TOKEN", res.data.token) ;
        localStorage.setItem("USERNAME", res.data.username) ;
        console.log(res) ;
        const user : IUserData = {
          username : res.data.username ,
          JWTtoken : res.data.token
        } ;
        navigate("/home") ;

    })
    .catch((res : any)=>{
        console.log( "Error occurred ", res ) ;
        setMessage("Error : " +  res.response.data.message ) ;
    }) ;
    
    
    setIsLoading(false);
  };

  // --- UI Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Join Second Brain</h2>
            <p className="text-purple-200">Create your intelligent workspace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-purple-300" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-purple-300" />
              </div>
              <input
                type={ "password" }
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Message Area */}
          {message && (
            <p className={`mt-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-300" : "text-red-300"}`}>
              {message}
            </p>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-purple-200 text-sm">
              Already have an account?{" "}
              <button className="text-pink-300 hover:text-pink-200 font-medium transition-colors">
                 <Link to={"/signin"}> Sign In </Link>
              </button>
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
}
