import { Drawer, IconButton } from "@mui/material";
import { getBrands } from "../../controllers/dashboard";
import { NavLink } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";

const BrandsDrawer = ({ open, onClose }) => {
    const { data = [], isLoading } = getBrands();

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <div className="flex flex-col overflow-y-auto items-stretch justify-start w-[100vw] md:w-[50vw] bg-white pb-5">
                <div className="sm:search-btn bg-gray-700 text-white p-4 font-medium text-lg flex flex-row justify-between items-center w-full">
                    <h1>Brands</h1>
                    <IconButton color="inherit" onClick={onClose} className="focus:outline-none">
                        <CloseOutlined />
                    </IconButton>
                </div>
                {data?.map(brand => (
                    <NavLink onClick={onClose} to={`brand/${brand?.id}`} key={brand?.id}
                        className={({ isActive }) => isActive ?
                            "flex flex-row justify-start gap-3 font-medium text-md items-center p-4 border border-b-0  border-l-0 text-primary ease-in transition-all bg-gray-100 capitalize" :
                            "flex flex-row justify-start gap-3 text-md items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all hover:bg-gray-100 capitalize"
                        }>
                        {brand?.name?.toLowerCase()}
                    </NavLink>
                ))}
            </div>
        </Drawer>
    )
}

export default BrandsDrawer;