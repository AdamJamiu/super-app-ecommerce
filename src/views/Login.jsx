import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  IconButton,
  CircularProgress,
  Backdrop,
  TextField,
  Button,
} from "@mui/material";
import useForm from "../hooks/useForm";
import { signIn } from "../controllers/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const return_url = searchParams.get("return_url");
  const isCompleted = values.email && values.password;

  useEffect(() => {
    localStorage.clear();

    window.scrollTo(0, 0);
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const callbackFn = () => {
    if (return_url) {
      return navigate(return_url);
    }
    navigate("/products");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ ...values, setLoading, navigate, callbackFn });
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="overflow-hidden relative">
      <img
        src="/images/millipede.svg"
        className="h-80 absolute opacity-20 -top-20 -right-10 hidden md:block"
      ></img>
      <div className="grid grid-cols-1 md:grid-cols-2 md:p-0 w-full h-full min-h-screen">
        <div className="h-48 md:h-full bg-login-img bg-cover bg-right bg-no-repeat flex-col justify-center items-center w-full">
          <div className="w-full h-full flex justify-center items-center backdrop-brightness-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 191.1 53.34"
              className="absolute block md:hidden -bottom-1"
            >
              <defs></defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    d="M.28,0S55,75.22,86.16,28.34s69.07-16.72,69.07-16.72L191.1,43.77l-.1,9.57L0,53Z"
                    className="fill-white"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="flex flex-col w-full justify-start items-start h-full xs:px-1 py-7 sm:py-10 bg-white rounded-lg mt-10 max-w-xl">
          <div className="w-full flex flex-col justify-center items-stretch px-4 sm:px-20">
            <h1 className="text-[37px] font-semibold text-[#0A3167]">
              Welcome.
            </h1>
            <p className="text-[#0A3167]">Sign in to continue</p>
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 mt-8"
              >
                <TextField
                  value={values.email}
                  required
                  fullWidth
                  onChange={handleChange}
                  name="email"
                  type="text"
                  label="Email"
                  variant="standard"
                  className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10"
                />
                <TextField
                  required
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  variant="standard"
                  className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10"
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleShowPassword}>
                        {!showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                  type={showPassword ? "text" : "password"}
                />

                <button
                  className="bg-blue-500 text-md text-white h-12 my-4 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !isCompleted}
                  type="submit"
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="flex flex-row justify-between flex-wrap items-center gap-2 text-sm w-full">
                  <Link
                    to="/Auth/Forgot-Password"
                    className="text-blue-600 hover:underline "
                  >
                    Forgot password?
                  </Link>
                  <Link to="/auth/signup" className=" hover:underline">
                    Don't have an account?{" "}
                    <span className="text-blue-600">Click here</span>
                  </Link>
                </div>

                <div className="w-full text-sm text-gray-500">
                  Copyright © <Link to="/">JustOwnIt</Link> {currentYear}.
                </div>
              </form>
            </div>
          </div>
        </div>

        <Backdrop
          open={loading}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}
        >
          <CircularProgress size={20} color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
};

export default Login;
