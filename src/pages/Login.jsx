import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import DotLoader from "../components/DotLoader";

const Login = ({ setToast }) => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginNow = () => {
    const user = ref1.current.value;
    const password = ref2.current.value;
    const isAdmin = user === "admin" && password === "Markwave@2025";
    const isSuper = user === "superadmin" && password === "superadmin@2025";

    // ❌ WRONG LOGIN → show error immediately (NO LOADING)
    if (!isAdmin && !isSuper) {
      setToast({ message: "Incorrect username or password!", type: "error" });
      return;
    }


    setLoading(true); // 🔥 Show spinner immediately

    setTimeout(() => {
      const isAdmin = user === "admin" && password === "Markwave@2025";
      const isSuper =
        user === "superadmin" && password === "superadmin@2025";

      if (isAdmin) {
        dispatch(loginSuccess({ username: "admin", role: "ADMIN" }));
        setToast({ message: "Login Successful!", type: "success" });
        navigate("/dashboard");
      } else if (isSuper) {
        dispatch(loginSuccess({ username: "superadmin", role: "SUPERADMIN" }));
        setToast({ message: "Login Successful!", type: "success" });
        navigate("/dashboard");
      } else {
        // ❌ Wrong password → hide spinner
        setToast({ message: "Incorrect username or password!", type: "error" });
        setLoading(false);
      }
    }, 400); // loading delay before dashboard transition
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center 
      bg-gradient-to-br from-[#a2e5e7] via-white to-[#c7f9ff]
      dark:bg-gradient-to-br dark:from-[#0a0f24] dark:via-[#14213d] dark:to-[#1e3a8a]
      animate-bgMove px-4"
    >
      {loading ? (
        // 🔥 FULL PAGE SPINNER
        <DotLoader />
      ) : (
        <div
          className="
          w-full max-w-[900px] 
          h-auto md:h-[70vh] 
          rounded-[28px] border border-[#00c8ff33]
          shadow-[10px_5px_40px_-20px_rgba(0,135,138,0.75),_-20px_5px_40px_-20px_rgba(0,135,138,0.25)] 
          bg-white/30 dark:bg-[#1f2937]/40 backdrop-blur-xl 
          flex flex-col md:flex-row 
          justify-center items-center 
          gap-10 md:gap-[10vw] 
          p-8 md:p-0 animate-fadeIn
        "
        >
          {/* LEFT */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#00878a] dark:text-[#4dd0d0]">
              MARKWAVE
            </h1>
          </div>

          {/* RIGHT / LOGIN BOX */}
          <div className="border border-[#00878a] dark:border-[#4dd0d0] px-8 md:px-12 py-10 rounded-xl bg-white dark:bg-[#1f2937] dark:text-gray-200 w-full max-w-[300px] sm:max-w-[350px]">

            <h1 className="text-center text-xl font-semibold text-[#00878a] dark:text-[#4dd0d0] mb-7">
              Welcome!
            </h1>

            {/* USERNAME */}
            <input
              type="text"
              placeholder="Enter Username"
              ref={ref1}
              className="border-0 border-b border-[#00878a] dark:border-[#4dd0d0]
              bg-transparent dark:text-gray-200 
              w-full py-2 mb-5 focus:outline-none focus:border-b-2"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                ref={ref2}
                className="border-0 border-b border-[#00878a] dark:border-[#4dd0d0]
                bg-transparent dark:text-gray-200 
                w-full py-2 pr-10 focus:outline-none focus:border-b-2"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[#00878a] dark:text-[#4dd0d0]"
              >
                {showPassword ? (
                  <i className="ri-eye-off-line text-xl"></i>
                ) : (
                  <i className="ri-eye-line text-xl"></i>
                )}
              </span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={loginNow}
              className="
              mt-6 w-full border border-[#00878a] dark:border-[#4dd0d0]
              rounded-lg px-3 py-2 font-medium cursor-pointer 
              text-[#00878a] dark:text-[#4dd0d0] bg-transparent
              transition-all duration-300 ease-in-out 
              hover:bg-[#00878a] hover:text-white 
              dark:hover:bg-[#4dd0d0] dark:hover:text-black btn-glow"
            >
              LOGIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
