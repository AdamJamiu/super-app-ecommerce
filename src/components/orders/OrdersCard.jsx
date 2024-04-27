import { Link } from "react-router-dom";
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import { CircularProgress, Skeleton } from "@mui/material";

const OrdersCard = ({ data, loading, showMore, isLoading }) => {
    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const truncateText = (text, length) => {
        return text?.length > length ? `${text?.substring(0, length)}...` : text;
    }

    return (
        <div className="grid grid-cols-1 gap-5">

            {isLoading ? <Skeleton height={200} width="100%" /> :
                <>
                    {data?.map((order, idx) => (
                        <div key={idx} className="text-secondary shadow-sm gap-5 p-4 rounded flex flex-row md:flex-nowrap flex-wrap justify-between items-start border ease transition-all">
                            <img loading="lazy" src={order?.orderedProducts[0]?.product?.productImageUrls[0]?.url} alt={order?.product?.productName} className="w-28 m-auto" />
                            <div className="flex-auto font-medium">
                                <p className="text-secondary font-normal text-lg">{truncateText(order?.orderedProducts[0]?.product?.productName, 25)}</p>
                                <p className="mb-4 text-secondary font-normal text-md w-full">Order {order?.id}</p>
                                <p className={`font-normal text-xs w-fit p-1 uppercase  text-white ${order?.orderStatus?.status?.toLowerCase() === "approved" ? "bg-green-500" : order?.orderStatus?.status?.toLowerCase() === "shipped" ? "bg-blue-600" : order?.orderStatus?.status?.toLowerCase() === "pending" ? "bg-yellow-600" : "bg-red-600"}`}>
                                    {order?.orderStatus?.status}
                                </p>
                                <p className="mt-2 text-md font-semibold">Ordered on {convertDate(order?.dateOrdered)}</p>
                            </div>
                            <Link to={`detail/${order?.id}`} className="text-primary hover:text-white hover:bg-primary transition-all ease px-3 py-2 rounded font-bold self-center text-sm w-max">View Details</Link>
                        </div>
                    ))}
                    {!isLoading && data?.length === 0 &&
                        <div className="text-center text-8xl flex flex-col justify-center items-center w-full h-96 text-gray-500">
                            <p className="text-lg font-medium">No orders yet</p>
                            <HourglassTopOutlinedIcon fontSize="inherit" color="inherit" />
                        </div>
                    }

                    <div onClick={() => showMore(prev => prev + 10)} className="text-xm  w-full font-bold text-center cursor-pointer">
                        {loading ? <CircularProgress color="inherit" size={20} /> : "Show more"}
                    </div>
                </>
            }
        </div>
    )
}

export default OrdersCard;