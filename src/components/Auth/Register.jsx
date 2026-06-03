import { Link } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";
const Register = (props) => {

    useEffect(()=>{
        axios.get("http://localhost:8080/api/test-api").then(response => {
            console.log(">>>check data: ",response.data);
        })
    }, [])


    
  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center h-[calc(100vh-4rem)] py-12">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex border border-black">
          <img src="https://picsum.photos/200/300" className="mx-auto" />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 border border-black flex justify-center">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
                Register
            </h1>
            <form action="/" method="POST">
                    <div className="w-full flex-1 mt-8">                   
                        <div className="mx-auto max-w-xs">
                            <label className="text-gray-600 font-medium" htmlFor="email">Email:</label>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
                                type="email" placeholder="Email" id="email" name="email"/>
                            <label className="text-gray-600 font-medium mt-5" htmlFor="phone">Phone number:</label>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
                                type="text" placeholder="Phone number" id="phone" name="phone"/>
                            <label className="text-gray-600 font-medium mt-5" htmlFor="username">User name:</label>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
                                type="text" placeholder="User name" id="username" name="username"/>
                            <label className="text-gray-600 font-medium mt-5" htmlFor="password">Password:</label>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
                                type="password" placeholder="Password" id="password" name="password"/>
                            <label className="text-gray-600 font-medium mt-5" htmlFor="re-password">Re-Password:</label>
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-2"
                                type="password" placeholder="Re-Password" id="re-password" name="re-password"/>
                            <button
                                className="mt-5 tracking-wide font-semibold bg-black text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">
                                    Register
                                </span>
                            </button>
                            <p className="mt-6 text-xs text-gray-600 text-center flex gap-1 justify-center">
                                Already have an account?
                                <Link to="/login" className="border-b border-gray-500 border-dotted text-indigo-500">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
                </div>       
            </div>
        </div>
  );
}

export default Register;