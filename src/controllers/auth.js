import { useQuery } from "@tanstack/react-query";
import { authCaller, dashboardClient } from "../interceptors";
import { toast } from 'react-toastify';

export const signUp = async ({
    firstName,
    lastName,
    userName,
    houseNumber,
    street,
    city,
    state,
    email,
    phoneNumber,
    gender,
    password,
    setIsLoading,
    navigate,
}) => {
    setIsLoading(true);
    await authCaller.post("Authentication/SignUp", { firstName, lastName, userName, houseNumber, street, city, state, email, phoneNumber, gender, password })
        .then((response) => {
            localStorage.setItem("email", email);
            toast(response?.data?.message, {
                type: "success",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })

            if (response?.status === 400) return;

            if (response?.status === 200) navigate("/Auth/ConfirmEmail");
        })
        .catch((error) => {
            console.log(error.response?.data?.message);
            toast(error?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
            })
            // setIsSuccess(false);
        })
        .finally(() => {
            setIsLoading(false);
        });
};

export const getUserDetails = ({ isUpdated }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    return useQuery({
        queryKey: ["userDetails", isUpdated],
        queryFn: async () => await dashboardClient.get(`Authentication/GetUserDetails/${userId}`).then((res) => res?.data?.data),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}

export const signIn = async ({ email, password, setLoading, callbackFn }) => {
    setLoading(true);
    await authCaller.post("Authentication/SignIn", { email, password })
        .then((res) => {
            // console.log(res?.data?.data?.accessToken);
            localStorage.setItem("joi_web_token", res?.data?.data?.accessToken);
            localStorage.setItem("user", JSON.stringify(res?.data?.data?.userDetails));
            callbackFn();
        })
        .catch((error) => {
            console.log(error);
            toast(error?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "login"
            })
        })
        .finally(() => {
            setLoading(false);
        });
}
export const signInModal = async ({ email, password, setLoading, onClose }) => {
    setLoading(true);
    await authCaller.post("Authentication/SignIn", { email, password })
        .then((res) => {
            toast("Login Successful", {
                type: "success",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "login"
            })

            localStorage.setItem("joi_web_token", res?.data?.data?.accessToken);
            localStorage.setItem("user", JSON.stringify(res?.data?.data?.userDetails));
            onClose();
        })
        .catch((error) => {
            console.log(error);
            toast(error?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "login"
            })
        })
        .finally(() => {
            setLoading(false);
        });
}

export const forgotPassword = async ({ email, setLoading }) => {
    setLoading(true);
    await authCaller.post("Authentication/ForgotPassword", { email })
        .then((response) => {
            console.log(response);
            toast(response.data.message, {
                type: "success",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "forgotPassword"
            })
        })
        .catch((error) => {
            console.log(error);
            toast(error?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "forgotPassword"
            })
        })
        .finally(() => {
            setLoading(false);
        });
}

export const changePassword = async ({ email, oldPassword, newPassword }) => {
    await authCaller.post("Authentication/ChangePassword", { email, oldPassword, newPassword })
        .then((response) => {
            console.log(response);
            toast(response.data.message, {
                type: "success",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "changePassword"
            })
        })
        .catch((error) => {
            console.log(error);
            toast(error.response.data.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "changePassword"
            })
        });
}

export const generatePasswordResetToken = async ({ value, setIsLoading, callbackFn }) => {
    setIsLoading(true);
    await authCaller.post("Authentication/GeneratePasswordResetToken", { value })

        .then((response) => {
            // console.log(response);
            console.log(response.status);
            if (response.status === 200) {
                toast("Password reset token sent", {
                    type: "success",
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastId: "generatePasswordResetToken"
                })

                localStorage.setItem("joi_reset_email", value)

                if (callbackFn) callbackFn()
                return;
            }
            if (response.status === 404) {
                toast("user record not found", {
                    type: "error",
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastId: "generatePasswordResetToken"
                })
            }

        })

        .catch((error) => {
            if (error?.response?.data?.status === 400) {
                return toast("You email is invalid", {
                    type: "error",
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastId: "generatePasswordResetToken"
                })
            }
            toast(error?.response?.data?.title, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "generatePasswordResetToken"
            })
        })

        .finally(() => setIsLoading(false))
}

export const confirmEmailToken = async ({ email, token, setLoading, navigate }) => {
    setLoading(true);
    await authCaller.post("Authentication/ConfirmEmailToken", { email, token })
        .then((response) => {
            console.log(response);
            toast(response.data.message, {
                type: "success",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "confirmEmailToken"
            })

            if (response.status === 400) return;

            if (response.status === 200) navigate("/auth/login");
        })
        .catch((error) => {
            console.log(error);
            toast(error.response.data.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "confirmEmailToken"
            })
        })
        .finally(() => {
            setLoading(false);
        });
}

export const generateEmailConfirmationToken = async ({ value }) => {
    const loadingId = toast.loading("Sending Email...");
    await authCaller.post("/Authentication/GenerateEmailConfirmationToken", { value })
        .then((response) => {
            console.log(response);
            toast.update(loadingId, {
                render: response.data.message,
                type: "success",
                isLoading: false,
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "generateEmailConfirmationToken"
            })
        })
        .catch((error) => {
            console.log(error);
            toast.update(loadingId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                toastId: "generateEmailConfirmationToken"
            })
        })
        .finally(() => {
            toast.dismiss(loadingId);
        });
}

export const confirmPasswordResetToken = async ({ token, email, setIsLoading, callbackFn }) => {
    setIsLoading(true)
    await authCaller.post("/Authentication/ConfirmPasswordResetToken", { email, token })

        .then(res => {
            if (res.status === 200) if (callbackFn) callbackFn()

        })

        .catch(err =>
            toast(err?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            })
        )

        .finally(() => setIsLoading(false))

}

export const completePasswordReset = async ({ email, newPassword, setIsLoading, callbackFn }) => {
    setIsLoading(true)

    await authCaller.post("/Authentication/CompletePasswordReset", { email, newPassword })
        .then(res => {
            if (res.status === 200) if (callbackFn) callbackFn();
            else {
                toast(res?.data?.message, {
                    type: "error",
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                })
                console.log(res?.data?.message)
            }

        })
        .catch(err => {
            toast(err?.response?.data?.message, {
                type: "error",
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            })
        })
        .finally(() => setIsLoading(false))
}