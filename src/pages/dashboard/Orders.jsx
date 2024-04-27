import { IconButton } from "@mui/material";
import OrdersTab from "../../components/customs/OrdersTab";
import MenuIcon from '@mui/icons-material/Menu';

document.title = "Orders | JOI";

const Orders = ({ onOpen }) => {
    return (
        <div className="">
            <div className="border-b w-full pb-2 flex flex-row justify-start items-center gap-3">
                <div className="flex md:hidden">
                    <IconButton onClick={onOpen}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <h1 className="text-xl font-medium text-secondary">Orders</h1>
            </div>
            <div className="my-5">
                <OrdersTab />
            </div>
        </div>
    )
}

export default Orders;