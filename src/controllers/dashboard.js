import { dashboardClient, httpClient } from "../interceptors"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const deleteAccount = async ({userId}) => {
    const res = await httpClient.delete(`Authentication/DeleteAccount/${userId}`)
    return res.data
}

export const changePassword = async ({email, oldPassword, newPassword}) => {
    const res = await dashboardClient.post(`Authentication/ChangePassword`, {email, oldPassword, newPassword})
    return res.data
}

export const getUserCart = ({ navigate }) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
        navigate("/auth/login");
        return [];
    }
    const userId = user ? user.id : null

    if (userId === null || userId === undefined) {
        toast("No user id", {
            type: "error",
            autoClose: 1000,
            toastId: "getUserCart",
            closeOnClick: true,
            hideProgressBar: true,
        })
        navigate("/auth/login");
        return null;
    }

    return useQuery({
        queryKey: ["userCart"],
        queryFn: async () => await httpClient.get(`Cart/GetUserCart/${userId}`).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    })
}

export const getCartLength = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user ? user.id : null
    if (userId === null) {
        toast("No user id", {
            type: "error",
            autoClose: 1000,
            toastId: "getUserCart",
            closeOnClick: true,
            hideProgressBar: true,
        })
        return null;
    }

    return useQuery({
        queryKey: ["userCart"],
        queryFn: async () => await httpClient.get(`Cart/GetUserCart/${userId}`).then((res) => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchIntervalInBackground: 1000,
    })
}

export const useGetDashboardInfo = () => {
    return useQuery({
        queryKey: ["dashboardInfo"],
        queryFn: async () => await dashboardClient.get("Dashboard/GetUserDashboardInfo").then(function (res) {
            // localStorage.setItem("products", JSON.stringify(res?.data?.data?.products))
            return res.data.data
        }),
        retry: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const addProductToCart = async ({ productId, quantity, handleSignInOpen }) => {
    const token = localStorage.getItem("joi_web_token")
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null
    if (userId === null || userId === undefined || !token || !user) {
        handleSignInOpen()
        return Promise.reject("No user id");
    }

    const res = await httpClient.post(`Cart/AddProductsToCart/${userId}`, [{ productId, quantity }])
    return res.data;
}

export const addItemToCart = async ({ payload }) => {
    const token = localStorage.getItem("joi_web_token")
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null
    if (userId === null || userId === undefined || !token || !user) {
        handleSignInOpen()
        return Promise.reject("No user id");
    }

    const res = await httpClient.post(`Cart/AddProductsToCart/${userId}`, payload)
    return res.data;
}

export const removeProductFromCart = async ({ productId }) => {
    const userId = JSON.parse(localStorage.getItem("user")).id

    if (userId === null) {
        toast("No user id", {
            type: "error",
            autoClose: 1000,
            toastId: "getUserCart",
            closeOnClick: true,
            hideProgressBar: true,
        })
        return null;
    }

    const res = await httpClient.post("Cart/RemoveProduct", { productId, userId })
    return res.data;
}

export const clearCart = async () => {
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null;
    const response = await httpClient.post(`Cart/ClearCart/${userId}`);
    return response.data;
};

export const updateCart = async ({ productId, quantity }) => {
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null;
    const response = await httpClient.post(`Cart/ChangeProductQuantity/${userId}`, { productId, quantity });
    return response.data;
}

export const getBrands = () => {
    return useQuery({
        queryKey: ["brands"],
        queryFn: async () => await dashboardClient.get("Brand/GetBrands").then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const getWareHouses = () => {
    return useQuery({
        queryKey: ["warehouses"],
        queryFn: async () => await dashboardClient.get("Warehouse/GetWarehouses").then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const getBrandById = ({ brandId, isIdChanged }) => {
    return useQuery({
        queryKey: ["brandById", isIdChanged, brandId],
        queryFn: async () => await dashboardClient.get(`/Brand/GetBrand/${brandId}`).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
}

export const getProductById = ({ productId }) => {
    return useQuery({
        queryKey: ["productById", productId],
        queryFn: async () => await dashboardClient.get(`Product/GetProduct/${productId}`).then(res => res?.data?.data),
        retry: 2,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const searchForProducts = ({ SearchString }) => {
    return useQuery({
        queryKey: ["searchForProducts", SearchString],
        queryFn: async () => await dashboardClient.get(`Product/GetProducts`, {
            params: {
                SearchString,
            }
        }).then(res => res?.data?.data),
        retry: 4,
    })
}

export const getDeliveryMethods = () => {
    return useQuery({
        queryKey: ["deliveryMethods"],
        queryFn: async () => await dashboardClient.get(`Dashboard/GetDeliveryMethods`).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const getPaymentMethods = () => {
    return useQuery({
        queryKey: ["paymentMethods"],
        queryFn: async () => await dashboardClient.get(`Dashboard/GetPaymentMethods`).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const initiatePayment = async ({ paymentMethodId, deliveryMethodId, warehouseId, orderedProducts, deliveryAddress, setLoading }) => {
    setLoading(true)
    const userId = JSON.parse(localStorage.getItem("user")).id
    const name = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName
    const phoneNumber = JSON.parse(localStorage.getItem("user")).phoneNumber
    const callback_url = "https://www.justownitapp.com/customer/account/orders";

    await httpClient.post(`Order/OrderProducts`, { userId, deliveryMethodId, paymentMethodId, warehouseId, name, phoneNumber, orderedProducts, deliveryAddress, medium: "WEB", callback_url })
        .then(res => {
            window.location.href = res?.data?.data;
        })
        .catch((err) => {
            toast(err?.response?.data?.message, {
                type: "error",
                autoClose: 1000,
                toastId: "initiatePayment",
                closeOnClick: true,
                hideProgressBar: true,
            })
        })
        .finally(() => setLoading(false))
}

export const getAllOrdersByUserId = ({ userId, Classification }) => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => await dashboardClient.get(`Order/GetAllUserOrders/${userId}`, {
            params: {
                PageSize: 100,
                Classification
            }
        }).then(res => res?.data?.data),
        retry: 5,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchInterval: 30 * 1000,
    })
}

export const getPendingOrdersByUserId = ({ userId }) => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => await dashboardClient.get(`Order/GetAllUserOrders/${userId}`, {
            params: {
                PageSize: 100
            }
        }).then(res => res?.data?.data),
        retry: 5,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchInterval: 30 * 1000,
    })
}

export const getOrderById = ({ orderId }) => {
    return useQuery({
        queryKey: ["orderById", orderId],
        queryFn: async () => await dashboardClient.get(`Order/GetOrder/${orderId}`).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
}

export const editUser = async ({ firstName, lastName, userName, houseNumber, street, city, state, phoneNumber, gender, userId }) => {
    const res = await httpClient.put(`Authentication/EditUser/${userId}`, { firstName, lastName, phoneNumber, userName, street, city, gender, houseNumber, state })
    return res?.data;
}

export const reInitializePayment = async ({ setLoading, orderId }) => {
    setLoading(true)
    const callback_url = "https://www.justownitapp.com/customer/account/orders";

    await dashboardClient.post("Order/InitializePayment", { orderId, medium: "WEB", callback_url })
        .then(res => {
            window.location.href = res?.data?.data;
        })
        .catch((err) => {
            toast(err?.response?.data?.message, {
                type: "error",
                autoClose: 1000,
                toastId: "initiatePayment",
                closeOnClick: true,
                hideProgressBar: true,
            })
        })
        .finally(() => setLoading(false))
}

export const getPromos = () => {
    return useQuery({
        queryKey: ["promo"],
        queryFn: async () => await dashboardClient.get(`Promo/GetPromos`).then(res => res?.data?.data),
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })
}