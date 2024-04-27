import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import AdUnitsTwoToneIcon from "@mui/icons-material/AdUnitsTwoTone";
import OtpInput from "../components/enterOtp/OtpInput";
import {
  confirmEmailToken,
  generateEmailConfirmationToken,
} from "../controllers/auth";
import AppLayout from "../global/AppLayout";

const EnterOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(otp.join("") + " " + email);
    confirmEmailToken({ token: otp.join(""), email, setLoading, navigate });
  };

  const handleResendToken = () => {
    generateEmailConfirmationToken({ value: email });
  };

  useEffect(() => {
    if (!email) {
      navigate("/auth/signup", { replace: true });
    }
  }, [email]);

  return (
    <AppLayout>
      <div className="flex flex-col w-full justify-center items-center shadow-md h-full px-5 py-10 bg-white mt-10 max-w-xl rounded-md">
        <div className="w-fit self-center p-2 rounded-md justify-center items-center">
          <AdUnitsTwoToneIcon fontSize="large" className="text-primary" />
        </div>
        <h1 className="text-xl text-secondary font-black">OTP Verification</h1>
        {/* <h1 className="text-lg text-secondary font-bold my-1">Welcome </h1> */}
        <p className="text-secondary md:text-left text-center my-2">
          Enter otp code sent to <b className="text-primary">{email}</b>
        </p>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            {/*  create a 4 didgits otp input */}
            <OtpInput otp={otp} setOtp={setOtp} />
            <p className="text-secondary w-full text-center">
              Didn't receive OTP code?
            </p>
            <p
              onClick={handleResendToken}
              className="w-fit self-center text-secondary font-semibold cursor-pointer hover:underline hover:text-primary"
            >
              Resend code
            </p>

            <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-primary hover:bg-white border border-primary hover:text-primary text-white px-5 py-2 rounded-md  transition duration-300 shadow-md text-sm font-semibold disabled:bg-gray-400 disabled:hover:bg-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default EnterOtp;
