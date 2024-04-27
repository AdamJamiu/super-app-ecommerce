import { useEffect, useState } from "react";
import DashboardLayout from "../global/DashboardLayout";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";

// Icons
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Logout } from "../helpers/Logout";
import DashboardSidenavDrawer from "../pages/dashboard/DashboardSideNav";
import DeleteAccountModal from "../components/customs/DeleteAccountModal.modal";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const Dashboard = ({ open, onClose }) => {
    const token = localStorage.getItem("joi_web_token");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    useEffect(() => {
        if (!token || !user) {
            navigate("/");
        }
    }, [])

    return (
        <DashboardLayout>
            <div className="my-1 flex flex-row w-full justify-center gap-10 items-stretch h-full relative">
                <div className="md:flex flex-col flex-2 top-24 sticky shadow-md h-full w-96 bg-white rounded-sm hidden">
                    <div className="search-btn text-white p-5">
                        <h1 className="text-lg font-medium ">My Account</h1>
                    </div>
                    <div className="bg-white py-3">
                        <NavLink to="profile"
                            className={({ isActive, isPending }) =>
                                isActive ? "active-link ease  px-5 py-3 transition-all" : "inactive-link px-5 py-3 ease transition-all hover:text-orange-500 hover:pl-6"
                            } >
                            <Person4OutlinedIcon />
                            <p>Profile</p>
                        </NavLink>
                        <NavLink to="orders"
                            className={({ isActive, isPending }) =>
                                isActive ? "active-link transition ease px-5 py-3" : "inactive-link px-5 py-3 ease transition-all hover:text-orange-500 hover:pl-6"
                            } >
                            <AllInboxIcon />
                            <p>Orders</p>
                        </NavLink>

                        <NavLink to="change-password"
                            className={({ isActive, isPending }) =>
                                isActive ? "active-link transition ease px-5 py-3" : "inactive-link px-5 py-3 ease transition-all hover:text-orange-500 hover:pl-6"
                            } >
                            <LockOpenOutlinedIcon />
                            <p>Change password</p>
                        </NavLink>
                        {/* <NavLink to="wishlist"
                            className={({ isActive, isPending }) =>
                                isActive ? "active-link transition ease px-5 py-3" : "inactive-link px-5 py-3 ease transition-all hover:text-orange-500 hover:pl-6"
                            } >
                            <FavoriteBorderIcon />
                            <p>Wishlist</p>
                        </NavLink> */}
                        <div
                            onClick={() => Logout({ navigate })}
                            className="ease px-5 py-3 inactive-link ease transition-all hover:text-orange-500 hover:pl-6 cursor-pointer"
                        >
                            <ExitToAppOutlinedIcon />
                            <p>Logout</p>
                        </div>

                        <div
                            onClick={handleOpen}
                            className="ease px-5 py-3 inactive-link ease transition-all hover:pl-6 cursor-pointer hover:text-red-500"
                        >
                            <DeleteOutlineOutlinedIcon color="error" />
                            <p>Delete Account</p>
                        </div>


                    </div>
                </div>
                <div className="w-full shadow-md  p-5 bg-white rounded-sm">
                    <Outlet />
                </div>
            </div>
            <DashboardSidenavDrawer openDelete={handleOpen} onClose={onClose} open={open} />
            <DeleteAccountModal open={isOpen} onClose={handleClose} />
        </DashboardLayout>
    );
}

export default Dashboard;