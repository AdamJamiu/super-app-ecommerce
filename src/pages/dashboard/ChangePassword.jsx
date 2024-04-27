import { useState } from "react";
import useForm from "../../hooks/useForm";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { changePassword } from "../../controllers/dashboard";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import newPasswordSchema from "../../components/schema/ChangePassword.schema";

const ChangePassWordPage = ({ onOpen }) => {
    const [isOldPassword, setIsOldPassword] = useState(false)
    const [isPassword, setIsPassword] = useState(false)

    const handleTogglIsOldPassword = () => setIsOldPassword(prev => !prev)
    const handleTogglIsPassword = () => setIsPassword(prev => !prev)

    const { values, handleChange, reset } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));
    const isComplete = values.oldPassword && values.newPassword && values.confirmPassword

    const validateForm = () => {
        const result = newPasswordSchema.validate({ newPassword: values.newPassword, confirmPassword: values.confirmPassword },
            { abortEarly: false });

        if (!result.error) return null;

        const newErrors = {};
        for (let item of result.error.details) {
            newErrors[item.path[0]] = item.message;
        }
        return newErrors;
    };

    const [errors, setErrors] = useState({});

    const changePasswordMutation = useMutation(changePassword, {
        onSuccess: () => {
            // console.log(res)
            reset()
            toast("Password changed succsessfully", {
                type: "success",
                autoClose: 1000,
                hideProgressBar: true,
                progress: undefined
            });

        },
        onError: (err) => {
            // console.log(err)
            if (err?.response?.status === 401) {
                toast(err?.response?.data?.message || "Error updating password", {
                    type: "error",
                    autoClose: 1000,
                    hideProgressBar: true,
                    progress: undefined
                });
            } else {
                toast("Error updating password", {
                    type: "error",
                    autoClose: 1000,
                    hideProgressBar: true,
                    progress: undefined
                });
            }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        setErrors(newErrors || {});
        // console.log(newErrors)
        if (newErrors) return;

        changePasswordMutation.mutate({ email: user.email, newPassword: values.newPassword, oldPassword: values.oldPassword });
    }

    return (

        <div className="sm:px-10 py-5">
            <div className="border-b w-full pb-3 flex flex-row justify-start items-center gap-3">
                <div className="block sm:hidden">
                    <IconButton onClick={onOpen}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <h1 className="text-xl font-medium text-secondary">Change Password</h1>
            </div>

            <form className="flex flex-col gap-7 mt-8 py-5 max-w-md" onSubmit={handleSubmit}>

                <TextField
                    value={values.oldPassword}
                    onChange={handleChange}
                    name="oldPassword"
                    type={isOldPassword ? 'password' : 'text'}
                    label="Old Password"
                    placeholder="Enter your old password"
                    InputProps={{
                        endAdornment:
                            (
                                <IconButton onClick={handleTogglIsOldPassword}>
                                    {isOldPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            )
                    }}
                />

                <TextField
                    error={errors.newPassword}
                    helperText={errors.newPassword}
                    value={values.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    type={isPassword ? 'password' : 'text'}
                    placeholder="Enter your new password"
                    label="New Password"

                    InputProps={{
                        endAdornment:
                            (
                                <IconButton onClick={handleTogglIsPassword}>
                                    {isPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            )
                    }}
                />

                <TextField
                    error={errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type={isPassword ? 'password' : 'text'}
                    placeholder="Enter your new password"
                    label="New Password"
                    InputProps={{
                        endAdornment:
                            (
                                <IconButton onClick={handleTogglIsPassword}>
                                    {isPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            )
                    }}
                />


                <div className="flex flex-col w-full items-center justify-center">
                    <Button type="submit" sx={{ textTransform: "capitalize" }} variant="contained" disabled={changePasswordMutation.isLoading || !isComplete} onClick={handleSubmit} fullWidth size="large">
                        {changePasswordMutation.isLoading ? <CircularProgress color="inherit" size={22} /> : "Change Password"}
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default ChangePassWordPage;