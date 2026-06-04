import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import {toast} from "react-toastify";


import {registerNewUser} from "../../services/userService";

const Register = (props) => {

    const navigation = useNavigate();

    const  [email, setEmail] = useState("");
    const  [phone, setPhone] = useState("");
    const  [username, setUsername] = useState("");
    const  [password, setPassword] = useState("");
    const  [rePassword, setRePassword] = useState("");
    const [isValidInput, setIsValidInput] = useState({
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,

    })
    const handleRegister = async () => {

        if(!isValid()){
            return;
        }

        let check = isValid();
        
        if(check) {
           let res = await registerNewUser(email, password, phone, username);
           console.log(">>>check res: ", res);
           if(res?.data?.EC === 0){
            toast.success(res.data.EM);
            navigation("/login");
           }
           else {
            toast.error(res.data.EM);
           }
        }
    }

    const isValid = () => {

        const validation = {
            isValidEmail: true,
            isValidPhone: true,
            isValidUsername: true,
            isValidPassword: true,
        }

        let check = true;
        let error = "";

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phoneRegex = /^\d{10}$/;
        let usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
        
        if(!email && !phone && !username && !password) {
            validation.isValidEmail = false;
            validation.isValidPhone = false;
            validation.isValidUsername = false;
            validation.isValidPassword = false;
            error = "Please fill in all the fields";
            check = false;
        }
        else if(!email || !email.match(emailRegex)){
            validation.isValidEmail = false;
            error = "Email is not valid";
            check = false;
        }
        else if (!phone || !phone.match(phoneRegex)){
            validation.isValidPhone = false;
            error = "Phone is not valid";
            check = false;
        }
        else if (!username || !username.match(usernameRegex)){
            validation.isValidUsername = false;
            error = "Username is not valid";
            check = false;
        }
        else if (!password || password.length < 6){
            validation.isValidPassword = false;
            error = "Password must be at least 6 characters";
            check = false;
        }
        else if (password !== rePassword){
            validation.isValidPassword = false;
            error = "Password do not match";
            check = false;
        }

        setIsValidInput(validation);
        
        if(!check && error){
            toast.error(error);
            return false;
        }

        return check;
    }

    useEffect(()=>{
        // axios.get("http://localhost:8080/api/v1/test-api").then(response => {
        //     console.log(">>>check data: ",response.data);
        // })

        
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
                    <div className="w-full flex-1 mt-8">                   
                        <div className="mx-auto max-w-xs">
                            
                            {/* Email */}
                            <label className="text-gray-600 font-medium" htmlFor="email">Email:</label>
                            <input
                                className= {`${isValidInput.isValidEmail ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                                type="email" placeholder="Email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                            {/* Phone */}
                            <label className="text-gray-600 font-medium mt-5" htmlFor="phone">Phone number:</label>
                            <input
                                className= {`${isValidInput.isValidPhone ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                                type="text" placeholder="Phone number" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>

                            {/* Username */}
                            <label className="text-gray-600 font-medium mt-5" htmlFor="username">User name:</label>
                            <input
                                className= {`${isValidInput.isValidUsername ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                                type="text" placeholder="User name" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

                            {/* Password */}
                            <label className="text-gray-600 font-medium mt-5" htmlFor="password">Password:</label>
                            <input
                                className= {`${isValidInput.isValidPassword ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                                type="password" placeholder="Password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                            {/* Re-Password */}
                            <label className="text-gray-600 font-medium mt-5" htmlFor="re-password">Re-Password:</label>
                            <input
                                className= {`${isValidInput.isValidPassword ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                                type="password" placeholder="Re-Password" id="re-password" name="re-password" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>

                            <button
                                onClick={() => handleRegister()}
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
                </div>       
            </div>
        </div>
  );
}

export default Register;