import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { IconButton, CircularProgress, Backdrop, Modal } from "@mui/material";
import useForm from "../../hooks/useForm";
import { useAppContext } from "../../provider/AppProvider";
import { CloseSharp } from "@mui/icons-material";
import { signInModal } from "../../controllers/auth";

const LoginModal = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { values, handleChange } = useForm();
    const [loading, setLoading] = useState(false);
    const { isSignedInModal, handleSignInClose } = useAppContext()
    // const navigate = useNavigate();

    useEffect(() => {
        // localStorage.clear();
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInModal({ ...values, setLoading, onClose: handleSignInClose });
    }

    return (
        <Modal
            open={isSignedInModal}
            onClose={handleSignInClose}
            aria-labelledby="JOI web Login modal"
            aria-describedby="JOI e-commerce login modal"
        >
            <div className="w-full max-w-md absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 shadow-md p-5 bg-white rounded-md">
                <CloseSharp onClick={handleSignInClose} className="absolute top-4 right-4 cursor-pointer" />
                <div className="w-full flex flex-col justify-center text-center items-stretch">
                    <h1 className="text-2xl font-black">Sign in</h1>
                    <p className="my-2">Sign to continue shopping</p>
                    <div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
                            <input value={values.email} required onChange={handleChange} name="email" className="border border-gray-400 p-2 rounded-md focus:bg-gray-100" type="text" placeholder="Email" />
                            <div className="relative">
                                <input required value={values.password} onChange={handleChange} name="password" className="border border-gray-400 p-2 rounded-md focus:bg-gray-100 w-full" type={showPassword ? "text" : "password"} placeholder="Password" />
                                <div className="absolute top-2 right-2">
                                    <IconButton onClick={handleShowPassword}>
                                        {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className="hover:bg-white hover:text-primary border border-primary ease transition-all bg-primary text-white p-2 shadow-md font-bold text-sm rounded-md">
                                {loading ? <CircularProgress color="inherit" size={18} /> : "SIGN IN"}
                            </button>

                            <div className="flex flex-row justify-between flex-wrap items-center gap-2">
                                <a href="/Auth/Forgot-Password" className="hover:text-red-600 text-blue-500 hover:underline">Forgot password?</a>
                                <p>Don't have an account?
                                    <a href="/auth/signup" className="hover:text-primary hover:underline text-blue-500"> Signup</a>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal;