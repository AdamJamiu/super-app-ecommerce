import { useState } from "react";
import useForm from "../../hooks/useForm";
import { getUserDetails } from "../../controllers/auth";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { editUser } from "../../controllers/dashboard";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import StateSelect from "../../components/customs/StateInput";
import CitiesSelect from "../../components/customs/CityInput";
import { httpClient } from "../../interceptors";

const Profile = ({ onOpen }) => {
    const { values, handleChange, reset } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const { data, isLoading } = getUserDetails({ isUpdated });
    const [states, setStates] = useState([]);

    const editUserMutation = useMutation(editUser, {
        onSuccess: async () => {
            setIsUpdated(true);
            reset();
            await httpClient.get(`Authentication/GetUserDetails/${userId}`)
                .then((res) => localStorage.setItem("user", JSON.stringify(res?.data?.data)));
            toast("Profile updated successfully", {
                type: "success",
                autoClose: 1000,
            });

        },
        onError: (err) => toast("Something went wrong", {
            type: "error",
            autoClose: 1000,
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // check if the default values are the same as the values
        if (!values) return;
        console.log("Changes made");
        editUserMutation.mutate({ ...values, userId });
    }

    return (
        <div className="md:px-10">
            {isLoading ?
                <div className="flex flex-col w-full h-52 justify-center items-center">
                    <CircularProgress color="primary" />
                </div>
                :
                <div className="w-full">
                    <div className="border-b w-full pb-2 flex flex-row justify-start items-center gap-3">
                        <div className="block bg-re sm:hidden">
                            <IconButton onClick={onOpen}>
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <h1 className="text-xl font-medium text-secondary">Profile</h1>
                    </div>
                    <h1 className="py-5 text-secondary">Hi <b>{user?.firstName}!,</b> you can update your personal information and change your account password.</h1>

                    <form className="flex flex-col gap-10 py-5" onSubmit={handleSubmit}>
                        {/* <h1 className="text-lg font-medium text-secondary">Personal Information</h1> */}

                        <div className="flex flex-row items-center justify-start gap-5 flex-wrap">
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">First Name</label> */}
                                <TextField defaultValue={data?.firstName} value={values.firstName} onChange={handleChange} name="firstName" className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10" variant="standard" type="text" placeholder="First Name" />
                            </div>
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">Last Name</label> */}
                                <TextField defaultValue={data?.lastName}
                                    value={values.lastName}
                                    onChange={handleChange}
                                    name="lastName"
                                    variant="standard"
                                    className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-5 flex-wrap">
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">User Name</label> */}
                                <TextField defaultValue={data?.userName} value={values.userName} onChange={handleChange} name="userName" variant="standard"
                                    className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10" type="text" placeholder="User Name" />
                            </div>
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">House Number</label> */}
                                <TextField defaultValue={data?.houseNumber} value={values.houseNumber} onChange={handleChange} name="houseNumber" variant="standard"
                                    className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10" type="text" placeholder="House number" />
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start gap-5 flex-wrap">
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">Street</label> */}
                                <TextField defaultValue={data?.street} value={values.street} onChange={handleChange} name="street" variant="standard"
                                    className="w-full border-blue-400 font-semibold border-b ease transition-all focus:border-b-2 pt-10" type="text" placeholder="Street Address" />
                            </div>
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">Phone Number</label> */}
                                <TextField defaultValue={data?.phoneNumber} value={values.phoneNumber} onChange={handleChange} name="phoneNumber" className="border border-gray-500 p-3 rounded-sm focus:bg-gray-100 w-full" type="tel" placeholder="Your Phone Number" />
                                {/* <MuiTelInput de  defaultCountry="ng" value={values.phoneNumber} onChange={handleChange} name="phoneNumber" className="border border-gray-500 p-3 rounded-sm focus:bg-gray-100 w-full" /> */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-5">
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">State</label> */}
                                <StateSelect
                                    defaultValue={data?.state}
                                    values={values}
                                    setStates={setStates}
                                    states={states}
                                    name="state"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col flex-auto">
                                {/* <label className="mb-1 text-sm ">City</label> */}
                                <CitiesSelect
                                    defaultValue={data?.city}
                                    name="city"
                                    values={values}
                                    onChange={handleChange}
                                    state={states.find((state) => state.name === values.state)?.iso2}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full items-center justify-center">
                            <Button type="submit" sx={{ textTransform: "capitalize" }} variant="contained" disabled={editUserMutation.isLoading} onClick={handleSubmit} className="w-full ease transition-all hover:opacity-90 ease bg-primary text-white p-3 rounded-sm">
                                {editUserMutation.isLoading ? <CircularProgress color="inherit" size={22} /> : "Update Profile"}
                            </Button>
                        </div>
                    </form>

                    {/* <div className="w-full mt-10 sm:hidden block">
                        <h1 className="font-semibold text-xl text-red-600 w-full border-b pb-4">Delete account</h1>

                        <button>
                            Dele
                        </button>
                    </div> */}
                </div>
            }
        </div>
    )
}

export default Profile;