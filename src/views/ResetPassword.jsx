import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ResetPasswordToken } from "../API/Authentication.api";
import { toast } from "react-toastify";
import GenerateResetTokenModal from "../components/customs/GenerateResetToken.modal";

const ResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, token } = useParams();
  //   console.log(email);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const generatePasswordMutation = useMutation(ResetPasswordToken, {
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

    const newPassword = formData.get("newPassword");
    const oldPassword = formData.get("oldPassword");

    await generatePasswordMutation.mutateAsync({
      email: "adamjamiu98@gmail.com",
      newPassword,
      oldPassword,
    });
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
              <div className="rounded-full p-4 mt-[-6rem] md:mt-0 md:mx-0 mx-auto md:my-0 mb-10 md:bg-transparent bg-[#F1F1F8] md:shadow-none shadow h-[100px] w-[100px] md:w-full md:h-full md:p-0 md:block flex items-center xl:h-auto xl:w-auto">
                <img className="w-[80px]" src="/images/logo.png" />
              </div>

              <div className="pt-8 space-y-2">
                <h1 className="font-bold text-[30px] font-satoshi w-full text-gray-700">
                  Reset password
                </h1>
                <p className="text-base w-full leading-5 text-black">
                  Kindly provide a new password and confirm password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full text-black">
                <div className="mt-9 w-full">
                  <label className="font-medium text-sm text-[#3c4257]">
                    Old Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      placeholder="********"
                      name="newPassword"
                      type={showPassword ? "password" : "text"}
                      required
                      // {...register("password", {
                      //   required: true, minLength: {
                      //     value: 8,
                      //     message: "Please enter a stronger password",
                      //   },
                      // })}
                      className="w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-200 outline-none rounded-sm border text-sm px-4 py-3 mt-3 border-gray-200"
                    />
                    <div onClick={() => setShowPassword(!showPassword)}>
                      <svg
                        className={`cursor-pointer absolute top-[1.6rem] right-[0.6rem] w-[20px] h-[20px] ${
                          showPassword ? "block" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                      >
                        <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
                      </svg>
                      <svg
                        className={`absolute top-[1.6rem] right-[0.6rem] w-[20px] h-[20px] ${
                          !showPassword ? "block" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                      >
                        <path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    aria-required
                    className="font-medium text-sm text-[#3c4257]"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      placeholder="********"
                      type={showPassword ? "password" : "text"}
                      name="oldPassword"
                      className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                    />
                    <div onClick={() => setShowPassword(!showPassword)}>
                      <svg
                        className={`cursor-pointer absolute top-[1.6rem] right-[0.6rem] w-[20px] h-[20px] ${
                          showPassword ? "block" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                      >
                        <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
                      </svg>
                      <svg
                        className={`absolute top-[1.6rem] right-[0.6rem] w-[20px] h-[20px] ${
                          !showPassword ? "block" : "hidden"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                      >
                        <path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm mt-1 text-gray-700">
                    Password must contain at least 1 uppercase character,
                    lowercase character , a number, a special character and must
                    be at least 8 characters in length.
                  </p>
                </div>

                <div className="mt-10">
                  <button
                    disabled={generatePasswordMutation.isLoading}
                    type="submit"
                    className="flex items-center justify-center text-center disabled:pointer-events-none disabled:opacity-50 ease transition-all hover:opacity-75 shadow-md w-full px-2 text-gray-100 rounded-sm bg-red-900 font-medium h-10"
                  >
                    {generatePasswordMutation.isLoading
                      ? "Please wait"
                      : "Reset Password"}
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
      <div className="bg-reset bg-cover bg-right col-span-5 relative hidden md:block"></div>

      <GenerateResetTokenModal open={open} onClose={handleCloseModal} />
    </div>
  );
};

export default ResetPassword;
