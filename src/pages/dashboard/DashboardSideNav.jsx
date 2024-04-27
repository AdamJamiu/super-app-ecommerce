import { Drawer, IconButton } from "@mui/material";
import { getBrands } from "../../controllers/dashboard";
import { NavLink } from "react-router-dom";
import { CloseOutlined, Logout } from "@mui/icons-material";

const DashboardSidenavDrawer = ({ open, onClose, openDelete }) => {
    const handleOpenDelete = () => {
        openDelete()
        onClose()
    }
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <div className="flex flex-col overflow-y-auto items-stretch justify-start w-[100vw] sm:w-[50vw] bg-white pb-5">
                <div className="search-btn text-white p-4 font-medium text-lg pt-5 flex flex-row justify-between items-center w-full">
                    <p className="font-medium">My Account</p>
                    <IconButton color="inherit" onClick={onClose} className="focus:outline-none">
                        <CloseOutlined />
                    </IconButton>
                </div>
                <NavLink to="profile" onClick={onClose}
                    className={({ isActive }) => isActive ?
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0  border-l-0 text-primary ease-in transition-all bg-gray-100" :
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all hover:bg-gray-100"
                    }>
                    Profile
                </NavLink>
                <NavLink to="orders" onClick={onClose}
                    className={({ isActive }) => isActive ?
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0  border-l-0 text-primary ease-in transition-all bg-gray-100" :
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all hover:bg-gray-100"
                    }>
                    Orders
                </NavLink>

                <NavLink to="change-password" onClick={onClose}
                    className={({ isActive }) => isActive ?
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0  border-l-0 text-primary ease-in transition-all bg-gray-100" :
                        "flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all hover:bg-gray-100"
                    }>
                    Change Password
                </NavLink>


                <button onClick={() => Logout(navigate)}
                    className="flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all hover:bg-gray-100">
                    Log out
                </button>

                <button onClick={handleOpenDelete}
                    className="flex flex-row justify-start gap-3 font-medium text-sm items-center p-4 border border-b-0 border-l-0 ease-in transition-all text-red-500">
                    Delete Account
                </button>

            </div>
        </Drawer>
    )
}

export default DashboardSidenavDrawer;