import { CircularProgress, Modal } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../controllers/dashboard";
import { toast } from "react-toastify";
import { Logout } from "../../helpers/Logout";
import { useNavigate } from "react-router-dom";

export const DeleteAccountModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const deletAccountMutation = useMutation(deleteAccount, {
        onSuccess: (res) => {
            console.log(res);

            toast("Account deleted successfully", {
                autoClose: 2000,
                hideProgressBar: true,
                progress: undefined,
                type: "success",
            });

            onClose();
            Logout({ navigate });
        },
        onError: (err) => {
            console.log(err);

            if (err?.response?.status === 404) {
                toast(err?.response?.data?.message || "User not found", {
                    autoClose: 1000,
                    hideProgressBar: true,
                    progress: undefined,
                    type: "error",
                });
            } else {
                toast("Error deleting account", {
                    autoClose: 1000,
                    hideProgressBar: true,
                    progress: undefined,
                    type: "error",
                });
            }
        },
    });

    const user = JSON.parse(localStorage.getItem("user"));

    const handleDeleteUser = async () => {
        await deletAccountMutation.mutateAsync({ userId: user?.id });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-0 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-50 bg-white rounded-md shadow-md w-full max-w-[350px] h-fit max-h-[600px] overflow-y-auto p-7">
                <p className="text-center text-lg">
                    Are you sure you want to delete your account?
                </p>

                <div className="grid grid-cols-2 w-ful mt-7 gap-7 text-sm">
                    <button
                        className="bg-gray-600 text-white px-2 rounded-md hover:bg-opacity-75 ease transition-all h-10"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteUser}
                        disabled={deletAccountMutation.isLoading}
                        className="bg-red-600 text-white px-2 rounded-md hover:bg-opacity-75 ease transition-all h-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {deletAccountMutation.isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            "Confirm"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteAccountModal;
