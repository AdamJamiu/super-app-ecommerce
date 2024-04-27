import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Button, Divider, IconButton, Skeleton } from "@mui/material";
import LoopIcon from '@mui/icons-material/Loop';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart, getOrderById, reInitializePayment } from "../../controllers/dashboard";
import { toast } from "react-toastify";

const OrderDetails = () => {
    const [loading, setLoading] = useState(false);
    const { orderId } = useParams();
    const { data: order, isLoading } = getOrderById({ orderId });
    console.log(order);
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    // console.log(order)
    const productsToAdd = order?.orderedProducts?.map((item) => ({
        productId: item?.product?.id,
        quantity: item?.quantity,
    }));

    const convertDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    const convertCurrency = (amount) => {
        return amount.toLocaleString('en-US')
    }

    const calculateTotal = () => {
        let total = 0;
        let quantity = 0;
        order?.orderedProducts?.map((item) => {
            total += item.productPrice * item.quantity;
            quantity += item.quantity;
        })
        return { total, quantity }
    }

    // Handle add product to cart and navigate to cart checkout page
    const mutation = useMutation({
        mutationFn: addItemToCart,
        onError: (error) => {
            toast(error?.response?.data?.message || "Item already in cart", {
                type: "error",
                autoClose: 1000,
                toastId: "addProductToCart",
                closeOnClick: true,
                hideProgressBar: true,
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] })
            navigate("/cart")
        }
    })

    const handleAddToCart = () => {
        console.log(productsToAdd)
        mutation.mutate({ payload: productsToAdd })
    }

    return (
        <div className="w-full">
            <div className="text-secondary flex flex-row items-center gap-4 justify-start w-full pb-2">
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <h1 className="text-lg font-bold">Order Details</h1>
            </div>
            <Divider className="my-4" />
            {isLoading ?
                <div className="h-full pb-64">
                    <Skeleton height={300} width="100%" />
                    <Skeleton height={40} width="100%" />
                    <Skeleton height={40} width="100%" />
                </div>
                :
                <>
                    <div className="py-5 text-secondary">
                        <p className="text-md font-medium">Order n&#176;  {order?.id}</p>
                        <p className="text-sm py-2">Placed on {convertDate(order?.dateOrdered)}</p>
                        <p className="text-sm">Total &#8358; {convertCurrency(calculateTotal()?.total)}</p>
                    </div>
                    <Divider className="my-4" />
                    <p className="font-bold my-3 text-md">ITEMS IN YOUR ORDER</p>
                    {order?.orderedProducts?.map((item, idx) => (
                        <div key={idx} className="border rounded p-4 w-full mb-5">
                            <div className="flex flex-row justify-between items-center w-full">
                                <p className={`${order?.orderStatus?.status?.toLowerCase() === "pending" ? "bg-yellow-600" : order?.orderStatus?.status?.toLowerCase() === "approved" ? "bg-green-500" : ""} px-1 text-xs text-white uppercase`}>
                                    {order?.orderStatus?.status}
                                </p>
                                {/* <Link className="text-primary text-sm font-medium p-2 hover:bg-primary hover:text-white">SEE ORDER STATUS</Link> */}
                            </div>
                            <p className="text-md font-medium my-1">On {convertDate(item?.dateOrdered)}</p>
                            <div className="flex flex-row justify-start items-stretch gap-10 w-full mt-3 flex-wrap sm:flex-nowrap">
                                <img loading="lazy" src={item?.product?.productImageUrls[0]?.url} alt={item?.product?.productName} className="w-32 h-28 self-center m-auto mt-4 xs:m-0" />
                                <div className="flex-auto font-medium h-full flex flex-col items-start justify-between gap-1">
                                    <p className="text-secondary font-normal text-md">{item?.product?.productName}</p>
                                    <p className="text-secondary font-normal text-sm">QTY: {item?.quantity}</p>
                                    <p className=" text-secondary font-bold text-md w-full">&#8358; {convertCurrency(item?.productPrice)}</p>
                                    <div className="flex flex-row justify-start items-center gap-5 mt-10 xs:mt-5 w-full">
                                        {order?.orderStatus?.status?.toLowerCase() === "pending" &&
                                            <Button sx={{ textTransform: "capitalize" }} variant="contained" color="error" onClick={() => reInitializePayment({ orderId: order?.id, setLoading })} disabled={loading}>
                                                {loading ? "Loading..." : "Complete Payment"}
                                            </Button>
                                        }
                                        {order?.orderStatus?.status?.toLowerCase() !== "pending" &&
                                            <Button disabled={mutation.isLoading} onClick={handleAddToCart} sx={{ textTransform: "capitalize" }} variant="contained" color="error" startIcon={<LoopIcon />}>
                                                {mutation.isLoading ? "Loading..." : "Buy again"}
                                            </Button>
                                        }
                                        <Link to={`/products/${item?.product?.id}`} className="ease transition-all border text-sm font-semibold p-3 hover:shadow-lg rounded-md text-center ">
                                            View details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full text-secondary">
                        <div className="border rounded">
                            <h2 className="p-3 text-md font-bold">PAYMENT INFORMATION</h2>
                            <Divider my={4} />
                            <div className="px-3 pt-3 pb-10">
                                <p className="text-md mb-1 font-semibold">Payment method</p>
                                <p className="text-sm font-normal">{order?.paymentMethod?.name}</p>
                                <div className="mt-7">
                                    <p className="text-md mb-1 font-bold">Payment details</p>
                                    {/* <p className="text-sm font-normal">Items total:  &#8358;{convertCurrency(calculateTotal()?.total)}</p> */}
                                    <p className="text-sm my-1 font-normal">Shipping:  &#8358;0</p>
                                    <p className="text-md font-normal">Items total:  &#8358; {convertCurrency(calculateTotal()?.total)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded">
                            <h2 className="p-3 text-md font-bold">DELIVERY INFORMATION</h2>
                            <Divider my={4} />
                            <div className="px-3 pt-3 pb-10">
                                <p className="text-md mb-1 font-semibold">Delivery method</p>
                                <p className="text-sm font-normal">{order?.deliveryMethod?.method}</p>
                                {order?.deliveryAddress && <div className="mt-7">
                                    <p className="text-md mb-1 font-semibold">Shipping Address</p>
                                    {/* <p className="text-sm font-normal">{order?.name}</p> */}
                                    <p className="text-sm my-1 font-normal">{order?.deliveryAddress ? order?.deliveryAddress : null}</p>
                                </div>}
                                {order?.warehouse?.address && <div className="mt-7">
                                    <p className="text-md mb-1 font-semibold">Pick up location</p>
                                    <p className="text-sm my-1 font-normal">{order?.warehouse?.address}</p>
                                </div>}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderDetails;