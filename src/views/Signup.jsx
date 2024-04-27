import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { allStates } from "../data/states-cities";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "../API/Authentication.api";
import AccountSuccessfulModal from "../components/customs/AccountSuccessful.modal";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const confirmPasswordRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const registerUserMutation = useMutation(RegisterUser, {
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
        theme: "colored",
        type: "error",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const FirstName = formData.get("FirstName");
    const LastName = formData.get("LastName");
    const PhoneNumber = formData.get("PhoneNumber");
    const UserName = formData.get("UserName");
    const Email = formData.get("Email");
    const Street = formData.get("Street");
    const CompanyName = formData.get("CompanyName");
    const AddressLine = formData.get("AddressLine");
    const State = formData.get("State");
    const City = formData.get("City");
    const CAC_File = formData.get("CAC_File");
    const Utility_File = formData.get("Utility_File");
    const Password = formData.get("Password");
    const ConfirmPassword = formData.get("ConfirmPassword");

    if (Password !== ConfirmPassword) {
      confirmPasswordRef.current.focus();
      return toast("Password must match", {
        type: "warning",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }

    await registerUserMutation.mutateAsync({
      AddressLine,
      CAC_File,
      City,
      CompanyName,
      Email,
      FirstName,
      LastName,
      Password,
      PhoneNumber,
      State,
      Street,
      UserName,
      Utility_File,
      AddressLine,
    });
  };

  return (
    <div className="font-satoshi bg-light-100 h-screen overflow-y-auto overflow-x-hidden md:relative md:z-10 md:px-0">
      <div className="md:grid grid-cols-12 bg-[#F9FAFA]">
        <div className="col-span-8 md:py-[70px] h-full relative">
          <div className="block md:hidden bg-[#0F172A] min-h-[200px] w-full rounded-b-full z-[1] relative">
            <div className="login-overlay bg-[45%_auto]"></div>
          </div>
          <div className="h-full relative mx-auto lg:w-[60%]">
            <div className="flex flex-col justify-center items-center w-full">
              <div className="md:py-5 px-4 py-10 w-full z-30 flex flex-col rounded-md modal-card">
                <div className="rounded-full p-4 mt-[-6rem] md:mt-0 md:mx-0 mx-auto md:my-0 mb-10 md:bg-transparent bg-[#F1F1F8] md:shadow-none shadow h-[100px] w-[100px] md:w-full md:h-full md:p-0 md:block flex items-center xl:h-auto xl:w-auto">
                  <img className="w-[80px]" src="/images/logo.png" />
                </div>

                <div className="pt-8 space-y-2">
                  <h1 className="font-bold text-[30px] font-satoshi w-full text-gray-700">
                    Finally create an account
                  </h1>
                  <p className="text-lg w-full text-black">
                    Enter your details
                  </p>
                </div>

                <form
                  className="w-full text-black mt-7"
                  onSubmit={handleSubmit}
                >
                  <div className="w-full grid lg:grid-cols-2 gap-5">
                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        placeholder="e.g John"
                        type="text"
                        name="FirstName"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="LastName"
                        placeholder="e.g Doe"
                        type="text"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="w-full grid lg:grid-cols-2 gap-5">
                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        User Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="UserName"
                        placeholder="e.g johndoe_1"
                        type="text"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        Email
                      </label>
                      <input
                        placeholder="johndoe@gmail.com"
                        type="email"
                        name="Email"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-medium text-sm text-[#3c4257]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g 08012345678"
                      type="text"
                      name="PhoneNumber"
                      //   {...register("phone", {
                      //     required: true, pattern: {
                      //       value: /(^0[789]\d{9}$)/,
                      //       message: "Please enter a valid phone number",
                      //     },
                      //   })}
                      className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                    />
                  </div>

                  <hr className="w-full my-10" />

                  <div className="mt-4">
                    <label className="font-medium text-sm text-[#3c4257]">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g TD Africa"
                      type="text"
                      name="CompanyName"
                      className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                    />
                  </div>
                  <div className="w-full grid lg:grid-cols-2 gap-5">
                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        Street Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        placeholder="e.g Yudala height"
                        type="text"
                        name="Street"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        Company Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your address..."
                        name="AddressLine"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="w-full grid lg:grid-cols-2 gap-5">
                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        type="text"
                        placeholder="Choose state"
                        name="State"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      >
                        <option disabled>Choose state</option>
                        <option value="Lagos">Lagos Island</option>
                        <option value="Ikeja">Ikeja</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="font-medium text-sm text-[#3c4257]">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        type="text"
                        placeholder="Choose city"
                        name="City"
                        className="ease focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                      >
                        <option disabled>Choose city</option>
                        <option value="Lagos">Lagos Island</option>
                        <option value="Ikeja">Ikeja</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="font-medium text-sm text-[#3c4257]">
                      Cac File
                    </label>
                    <input
                      type="file"
                      placeholder="Choose city"
                      name="CAC_File"
                      className="ease bg-white focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="font-medium text-sm text-[#3c4257]">
                      Utility File
                    </label>
                    <input
                      type="file"
                      placeholder="Choose city"
                      name="Utility_File"
                      className="ease bg-white focus:border-blue-200 w-full outline-none ease transition-all py-3 px-4 text-sm focus:ring-2 focus:ring-blue-200 border rounded-sm mt-3 border-gray-200"
                    />
                  </div>

                  <hr className="w-full my-10" />

                  <div className="mt-9 w-full">
                    <label className="font-medium text-sm text-[#3c4257]">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full">
                      <input
                        placeholder="********"
                        name="Password"
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
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        ref={confirmPasswordRef}
                        placeholder="********"
                        type={showPassword ? "password" : "text"}
                        name="ConfirmPassword"
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
                  </div>
                  <div className="mt-10">
                    <button
                      disabled={registerUserMutation.isLoading}
                      type="submit"
                      className="text-center flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 ease transition-all hover:opacity-75 shadow-md w-full px-2 text-gray-100 rounded-sm bg-red-900 font-medium h-10"
                    >
                      {registerUserMutation.isLoading ? (
                        <>
                          <span>Please wait</span>
                          <svg
                            className="animate-spin h-5 w-5 ml-3 fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                            height="48"
                            viewBox="0 -960 960 960"
                            width="48"
                          >
                            <path d="M692-120q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm-424-70q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q37 0 62.5-25.5T356-398q0-37-25.5-62.5T268-486q-37 0-62.5 25.5T180-398q0 37 25.5 62.5T268-310Zm169-274q-62 0-105-43t-43-105q0-62 43-105t105-43q62 0 105 43t43 105q0 62-43 105t-105 43Zm0-60q38 0 63-25t25-63q0-38-25-63t-63-25q-38 0-63 25t-25 63q0 38 25 63t63 25Zm255 376ZM268-398Zm169-334Z" />
                          </svg>
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </div>
                </form>
                <div className="w-full text-center pl-4 mt-7 text-sm mb-10 text-[#3c4257]">
                  <span>Already have an account?</span>
                  <Link to="/login" className="pl-2 text-blue-600">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-onboard bg-cover bg-right col-span-5 p-6 hidden items-center min-h-screen fixed md:block w-[40%] right-0 top-0"></div>
      </div>
      <AccountSuccessfulModal open={open} onClose={handleCloseModal} />
    </div>
  );
};

export default Signup;
