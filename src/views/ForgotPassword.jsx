import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GeneratePasswordResetToken,
  LoginUser,
} from "../API/Authentication.api";
import { toast } from "react-toastify";
import GenerateResetTokenModal from "../components/customs/GenerateResetToken.modal";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const generatePasswordMutation = useMutation(GeneratePasswordResetToken, {
    onSuccess: (res) => {
      console.log(res);

      if (res?.data) {
        handleOpenModal();
      }
    },
    onError: (err) => {
      console.log(err);
      toast(err?.response?.data?.message || "Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");

    await generatePasswordMutation.mutateAsync({ email });
  };

  return (
    <div className="md:grid font-satoshi grid-cols-12 md:relative md:z-10 md:px-0 bg-light-100 h-screen overflow-y-auto overflow-x-hidden 2xl:overflow-hidden">
      <div className="col-span-7 h-full relative bg-[#F9FAFA]">
        <div className="block md:hidden bg-[#0F172A] min-h-[200px] w-full rounded-b-full z-[1] relative">
          <div className="login-overlay bg-[45%_auto]"></div>
        </div>
        <div className="h-full flex flex-col justify-center relative mx-auto lg:w-[60%]">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="lg:px-16 md:pt-10 sm:px-20 px-4 py-10 w-full z-30 flex flex-col rounded-md modal-card">
              <div className="rounded-full p-4 mt-[-10rem] md:mt-0 md:mx-0 mx-auto md:my-0 mb-10 md:bg-transparent bg-[#F1F1F8] md:shadow-none shadow h-[100px] w-[100px] md:w-full md:h-full md:p-0 md:block flex items-center xl:h-auto xl:w-auto">
                <img className="w-[80px]" src="/images/logo.png" />
              </div>

              <div className="pt-8 space-y-2">
                <h1 className="font-bold text-[30px] font-satoshi w-full text-gray-700">
                  Forget password
                </h1>
                <p className="text-lg w-full leading-5 text-black">
                  Enter your email address below, you will receive a code to
                  reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full text-black">
                <div className="w-full mt-2">
                  <input
                    required
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    className="w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-200 outline-none rounded-sm border text-sm px-4 py-3 mt-3 border-gray-200"
                  />
                </div>

                <div className="mt-10">
                  <button
                    disabled={generatePasswordMutation.isLoading}
                    type="submit"
                    className="flex items-center justify-center text-center disabled:pointer-events-none disabled:opacity-50 ease transition-all hover:opacity-75 shadow-md w-full px-2 text-gray-100 rounded-sm bg-red-900 font-medium h-10"
                  >
                    {generatePasswordMutation.isLoading
                      ? "Please wait"
                      : "Submit"}
                    {generatePasswordMutation.isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 ml-3 fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                      >
                        <path d="M692-120q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm-424-70q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q37 0 62.5-25.5T356-398q0-37-25.5-62.5T268-486q-37 0-62.5 25.5T180-398q0 37 25.5 62.5T268-310Zm169-274q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm255 376ZM268-398Zm169-334Z" />
                      </svg>
                    ) : (
                      <></>
                    )}
                  </button>
                </div>
              </form>
              <div className="w-full text-center pl-4 mt-7 text-sm text-[#3c4257]">
                <Link to="/login" className="pl-2 text-blue-600">
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-forget bg-cover bg-center col-span-5 relative hidden md:block"></div>

      <GenerateResetTokenModal open={open} onClose={handleCloseModal} />
    </div>
  );
};

export default ForgotPassword;
