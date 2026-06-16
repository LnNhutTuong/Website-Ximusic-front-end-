import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLogin } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isValidInput, setIsValidInput] = useState({
    isValidValueLogin: true,
    isValidPassword: true,
  });

  const isValid = () => {
    let check = true;
    let error = "";
    const validation = {
      isValidValueLogin: true,
      isValidPassword: true,
    };

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\d{10}$/;

    if (!valueLogin || !password) {
      validation.isValidPassword = false;
      validation.isValidValueLogin = false;
      check = false;
      error = "Please fill in all the fields";
    }

    if (
      !valueLogin ||
      (valueLogin.match(emailRegex) && valueLogin.match(phoneRegex))
    ) {
      validation.isValidValueLogin = false;
      check = false;
      error = "Your Email or Phone number is invalid";
    }

    if (!password || password.length < 6) {
      validation.isValidPassword = false;
      check = false;
      error = "Your Password is invalid";
    }

    setIsValidInput(validation);

    if (!check && error) {
      toast.error(error);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!isValid) {
      console.log("sai rooif con!");
      return;
    }

    let check = isValid();

    if (check) {
      let res = await handleLogin(valueLogin, password);
      console.log(">>>>>Check res: ", res);

      if (res.EC === 0) {
        let data = {
          isAuthenticated: true,
          token: "fake token hehe",
        };

        sessionStorage.setItem("account", JSON.stringify(data));
        toast.success(res.EM);
        navigate("/");
        window.location.reload();
      } else {
        toast.error(res.EM);
      }
    }
  };

  const handleEnter = (event) => {
    if (event.charCode === 13 && event.code === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 flex justify-center h-[calc(100vh-4rem)] py-12">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex border border-black">
        <img src="https://picsum.photos/200/300" className="mx-auto" />
      </div>
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 border border-black flex justify-center">
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
          <div className="w-full flex-1 mt-8">
            <div className="mx-auto max-w-xs">
              <label
                className="text-gray-600 font-medium "
                htmlFor="valueLogin"
              >
                Email or phone number:
              </label>
              <input
                className={`${isValidInput.isValidValueLogin ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                type="text"
                placeholder="Email or phone number"
                name="valueLogin"
                value={valueLogin}
                onChange={(e) => setValueLogin(e.target.value)}
              />

              <div className="mt-5">
                <label className="text-gray-600 font-medium" htmlFor="password">
                  Password:
                </label>
                <input
                  className={`${isValidInput.isValidPassword ? "border-gray-200 " : "border-red-300 focus:border-red-500"} w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border placeholder-gray-500 text-sm focus:outline-none  focus:bg-white mb-2`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleEnter(e)}
                />
              </div>

              <button
                onClick={() => handleSubmit()}
                className="mt-5 tracking-wide font-semibold bg-black text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Login</span>
              </button>

              <p className="mt-6 text-xs text-gray-600 text-center flex gap-1 justify-center">
                Don't have an account?
                <Link
                  to="/register"
                  className="border-b border-gray-500 border-dotted text-indigo-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
