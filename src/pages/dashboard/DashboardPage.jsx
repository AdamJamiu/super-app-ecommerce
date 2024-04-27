import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

// Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const DashboardPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold text-secondary">Dashboard </h1>
                <p className="text-lg">Hi <b>{user?.firstName}!</b> Welcome to your JOI account dashboard</p>
            </div>
            <Divider sx={{ my: 1 }} />
            <div className="my-5">
                <p className="text-md">From your account dashboard you can view your
                    <Link className="text-primary" to="/dashboard/orders"> recent orders </Link>,
                    manage your shipping and billing addresses and <Link to="/dashboard/profile" className="hover:underline text-primary">password and account details.</Link> edit your
                </p>
                <div className="grid grid-cols-2 gap-10 my-10">
                    <Link to="/dashboard/orders" className="hover:text-primary text-secondary shadow-sm px-4 py-10 rounded flex flex-col justify-center items-center border cursor-pointer hover:bg-gray-100 ease transition-all text-xl">
                        <AllInboxIcon className="dashboard-icon" fontSize="large" />
                        <p className="text-lg font-medium">Orders</p>
                    </Link>
                    {/* <Link to="/dashboard/wishlist" className="hover:text-primary text-secondary shadow-sm px-4 py-10 rounded flex flex-col justify-center items-center border cursor-pointer hover:bg-gray-100 ease transition-all text-xl">
                        <FavoriteBorderIcon className="dashboard-icon" fontSize="large" />
                        <p className="text-lg font-medium">Wishlist</p>
                    </Link> */}
                    {/* <Link to="/dashboard/messages" className="hover:text-primary text-secondary shadow-sm px-4 py-10 rounded flex flex-col justify-center items-center border cursor-pointer hover:bg-gray-100 ease transition-all text-xl">
                        <EmailOutlinedIcon className="dashboard-icon" fontSize="large" />
                        <p className="text-lg font-medium">Messages</p>
                    </Link> */}
                    <Link to="/dashboard/profile" className="hover:text-primary text-secondary shadow-sm px-4 py-10 rounded flex flex-col justify-center items-center border cursor-pointer hover:bg-gray-100 ease transition-all text-xl">
                        <Person4OutlinedIcon className="dashboard-icon" fontSize="large" />
                        <p className="text-lg font-medium">Profile</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;