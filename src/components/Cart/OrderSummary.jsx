import { Link } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useLayoutEffect, useState } from "react"
import { Alert, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Skeleton } from "@mui/material";
import { getDeliveryMethods, getPaymentMethods, getWareHouses } from "../../controllers/dashboard";
import { toast } from "react-toastify";
import { initiatePayment } from "../../controllers/dashboard";
import OrderSumarySkeleton from "./OrderSummarySkeleton";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../interceptors";

const OrderSumary = () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const [isBNPL, setIsBNPL] = useState(false)
    const [paymentMethodId, setPaymentMethodId] = useState("")
    const params = paymentMethodId === "" ? {} : { paymentMethodId }
    const [totalPrice, setTotalPrice] = useState(0)
    const { data, isLoading } = useQuery({
        queryKey: ["userCart", paymentMethodId],
        queryFn: () => httpClient.get(`Cart/GetUserCart/${userId}`, {
            params,
        })
            .then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const [loading, setLoading] = useState(false)
    const { data: warehouses, isLoading: warehouseLoading } = getWareHouses();
    const [deliveryMethodId, setDelivery] = useState("drop-off");
    const [selectedWarehouse, setSelectedWarehouse] = useState("")
    const [deliveryAddress, setDeliveryAddress] = useState("")

    const handleDeliveryAddressChange = (e) => {
        setDeliveryAddress(e.target.value)
    }

    // const [drop]
    const { data: paymentMethods, isLoading: paymentMethodsLoading, isError: paymentMethodsError } = getPaymentMethods()
    const { data: deliveryMethodData, isLoading: deliveryMethodLoading, isError: deliveryMethodError } = getDeliveryMethods()

    // console.log(deliveryMethodId)
    // payment methods state
    const [orderedProducts, setOrderedProducts] = useState([{
        productId: "",
        quantity: 0
    }])

    useLayoutEffect(() => {
        if (data) {
            setOrderedProducts(data?.cartProducts?.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            })))
        }
        // console.log(orderedProducts)
    }, [data])

    const handleSelectedPaymentMethod = (e) => {
        setPaymentMethodId(e.target.value)
        const selectedValue = e.target.selectedOptions[0].getAttribute('data-value');
        setIsBNPL(selectedValue)
    }

    const handleSelectedWarehouse = (e) => {
        setSelectedWarehouse(e.target.value)
        // console.log(e.target.value)
    }

    const handleChange = (e) => setDelivery(e.target.value)

    useEffect(() => {

        let total = 0;
        data?.cartProducts?.map(item => {
            if (item?.product?.specialPrice < 1) {
                total += item?.quantity * item?.product?.price;
            } else {
                total += item?.quantity * item?.product?.specialPrice;
            }
        })
        setTotalPrice(total);

    }, [data])

    // console.log(totalPrice)

    const convertToCurrency = (amount) => {
        return amount.toLocaleString('en-US');
    }

    const handleSubmit = async () => {
        // check if user selected a payment method or not
        if (paymentMethodId === null) {
            return toast("Please select a payment method", {
                type: "error",
                autoClose: 1000,
                toastId: "paymentMethod",
                hideProgressBar: true,
            })
        }

        // check if user choose drop-off or pick-up
        if (deliveryMethodId === "617caadc-a0f6-4ba9-98f2-eedafc242116") {
            if (deliveryAddress === "") {
                return toast("Please enter your address", {
                    type: "error",
                    autoClose: 1000,
                    toastId: "address",
                    hideProgressBar: true,
                })
            }
            return await initiatePayment({ userId, paymentMethodId, deliveryMethodId, deliveryAddress, orderedProducts, setLoading });
        }

        // check if user selected a warehouse
        if (deliveryMethodId === "23afed39-5408-4294-ad2f-e4f869703ff5") {
            if (selectedWarehouse === "") {
                toast("Please select a warehouse", {
                    type: "error",
                    autoClose: 1000,
                    toastId: "warehouse",
                    hideProgressBar: true,
                })
                return;
            }
            await initiatePayment({ userId, paymentMethodId, warehouseId: selectedWarehouse, deliveryMethodId, orderedProducts, setLoading })
        }
    }

    return (
        <div className="h-full flex flex-col items-stretch justify-start top-28 sticky w-full lg:w-[50%] flex-auto lg:flex-2 shadow-md bg-white rounded-md p-5">
            {warehouseLoading ? <OrderSumarySkeleton />
                :
                <>
                    <div className="pt- pb-2 text-lg font-medium border-b">
                        Order Summary
                    </div>

                    <FormControl sx={{ mt: 3 }}>
                        <p className="text-sm">Delivery method</p>
                        <RadioGroup
                            row
                            aria-labelledby="Delivery-method"
                            name="row-radio-buttons-group"
                            value={deliveryMethodId}
                            onChange={handleChange}
                        >
                            {deliveryMethodData?.map(item => (
                                <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.method} />
                            ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <div className="mt-5 mb-2">
                        {deliveryMethodId === "617caadc-a0f6-4ba9-98f2-eedafc242116" &&
                            <>
                                <p className="text-sm text-secondary font-medium mb-3">Delivery Address</p>
                                <input value={deliveryAddress} onChange={handleDeliveryAddressChange} type="text" placeholder="Enter your address" className="border border-gray-300 w-full rounded-md px-5 py-2 focus:outline-none focus:ring-1 focus:ring-primary ease transition-all" />
                            </>
                        }
                        {deliveryMethodId === "23afed39-5408-4294-ad2f-e4f869703ff5" &&
                            <div className="mb-3">
                                <p className="text-sm text-secondary font-medium mb-2">Pick up location</p>
                                <select onChange={handleSelectedWarehouse} value={selectedWarehouse} className="border rounded-md px-5 py-3 focus:outline-none focus:ring-1 focus:ring-primary ease transition-all">
                                    <option selected disabled={selectedWarehouse === "" ? false : true} value="">Select a location</option>
                                    {warehouses?.map((item, index) => (
                                        <option selected={index === 0 ? true : false} key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        }
                    </div>

                    <div>
                        <div className="w-max flex flex-col mb-4">
                            <label className="text-sm">Payment method</label>
                            <select value={paymentMethodId} onChange={handleSelectedPaymentMethod} className="border mt-4 px-5 py-3 rounded-md">
                                <option value={null} selected>Select payment method</option>
                                {paymentMethods?.map((item, index) => (
                                    <option data-value={item.isBNPL} key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        {isBNPL === "true" ?
                            <Alert color="warning" className="rounded-lg p-3 bg-yellow-200 text-black font-medium">
                                The payment method you selected will allow to pay in installment
                            </Alert> : null}
                        <div className="flex flex-row items-center justify-between border-b py-4 mt-4">
                            <p className="text-lg">Total</p>
                            <p className="text-xl font-semibold">&#8358; {convertToCurrency(totalPrice)}</p>
                        </div>

                        <button disabled={loading} onClick={handleSubmit} className="search-btn text-white w-full  text-md rounded-sm px-5 py-2 mt-5 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Processing..." : "Proceed to checkout"}
                        </button>
                        <Link to="/products" className="text-secondary flex flex-row items-center justify-center hover:bg-gray-50 text-md rounded-md px-5 py-2 mt-2">
                            <ArrowBackIcon fontSize="inherit" className="mr-2" />
                            <p>Continue Shopping</p>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderSumary