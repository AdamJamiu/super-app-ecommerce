import DashboardLayout from "../global/DashboardLayout";
import { NavLink, Outlet } from "react-router-dom";
import NavigationSkeleton from "../components/products/NavigationSkeleton";

// assets
import { getBrands } from "../controllers/dashboard";
import BrandsDrawer from "../components/products/BrandsDrawer";
import { useEffect, useState } from "react";
import BuyFromAppPopUp from "../components/products/BuyFromAppPopUp";

const Products = ({ open, onClose }) => {
    const { data = [], isLoading } = getBrands();
    const [isPopUpOpened, setIsPopUpOpened] = useState(false)

    const handleOpen = () => setIsPopUpOpened(true)
    const handleClose = () => setIsPopUpOpened(false)

    useEffect(() => {
        setInterval(() => {
            handleOpen()
        }, 5000)
    }, [])

    return (
        <DashboardLayout>
            <div className="h-[90vh] flex flex-row w-full justify-start gap-3 items-stretch my-1">
                {isLoading ? <NavigationSkeleton />
                    :
                    <div className="md:flex hidden flex-col overflow-y-auto items-stretch justify-start w-[30%] flex-2 shadow-md bg-white rounded-md h-[90vh] scroller">
                        <h1 className="search-btn text-white p-4 font-medium text-xl">
                            Brands
                        </h1>
                        {data?.map(brand => (
                            <NavLink to={`brand/${brand?.id}`} key={brand?.id}
                                className={({ isActive }) => isActive ?
                                    "flex flex-row justify-start gap-3 font-medium text-md items-center p-4 border border-b-0  border-l-0 text-orange-500 ease-in transition-all capitalize" :
                                    "flex flex-row justify-start gap-3  text-md items-center p-4 border border-b-0 text-secondary border-l-0 hover:text-primary ease-in transition-all capitalize hover:bg-gray-50"
                                }>
                                {brand?.name?.toLowerCase()}
                            </NavLink>
                        ))}
                    </div>
                }
                <Outlet />
            </div>
            <BuyFromAppPopUp onClose={handleClose} open={isPopUpOpened} />
            <BrandsDrawer open={open} onClose={onClose} />
        </DashboardLayout>
    )
}

export default Products;