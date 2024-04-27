import { useState, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { removeProductFromCart, clearCart, updateCart } from "../../controllers/dashboard";
import { IconButton, Skeleton, Tooltip } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import emptyCart from "../../assets/images/empty-cart.svg"
import { toast } from "react-toastify"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";

const CartItems = ({ data, isLoading }) => {
    const toastIdRef = useRef(null);
    const queryClient = useQueryClient();

    const truncateName = (name) => {
        if (name.length > 30) {
            return name.slice(0, 30) + "...";
        } else {
            return name;
        }
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US');
    }

    const [count, setCounts] = useState(1);

    const handleIncreaseQuantity = async ({ productId, quantity, totalProduct }) => {
        if (quantity > totalProduct) {
            toast("Stock limit reached. Adjust quantity or check later.", {
                autoClose: 2000,
                hideProgressBar: true,
                progress: undefined,
                type: "error"
            })
            return;
        }
        await addProductMutation.mutateAsync({ productId, quantity });
    }

    const handleDecreaseQuantity = async ({ productId, quantity, count }) => {
        // if quantity is 1, do nothing
        if (count === 1) return;
        await addProductMutation.mutateAsync({ productId, quantity });
    }

    const removeProductMutation = useMutation(removeProductFromCart, {
        onMutate: () => {
            toastIdRef.current = toast.loading('Removing product from cart');
        },
        onError: () => {
            toast.update(toastIdRef.current, {
                render: 'Error removing product from cart',
                type: 'error',
                toastId: 'removeProduct',
                autoClose: 1000,
                isLoading: false,
            });
        },
        onSuccess: () => {
            toast.update(toastIdRef.current, {
                render: 'Product removed from cart',
                type: 'success',
                toastId: 'removeProduct',
                autoClose: 1000,
                isLoading: false,
            });
            queryClient.invalidateQueries({ queryKey: ['userCart'] });
        }
    })

    const handleRemoveProduct = async (productId) => {
        await removeProductMutation.mutateAsync(productId);
    };

    const mutation = useMutation(clearCart, {
        onMutate: () => {
            toastIdRef.current = toast.loading('Clearing cart');
        },
        onError: () => {
            toast.update(toastIdRef.current, {
                render: 'Error clearing cart',
                type: 'error',
                autoClose: 1000,
                isLoading: false,
            });
        },
        onSuccess: () => {
            toast.update(toastIdRef.current, {
                render: 'Cart cleared',
                type: 'success',
                autoClose: 1000,
                isLoading: false,
            });
            queryClient.invalidateQueries({ queryKey: ['userCart'] });
        },
        onSettled: () => {
            toast.dismiss(toastIdRef.current);
        },
    });

    const addProductMutation = useMutation(updateCart, {
        onError: (err) => {
            toast.update(err?.response?.data?.message || "Error updating product", {
                type: 'error',
                autoClose: 1000,
                toastId: 'updateProduct',
                isLoading: false,
                hideProgressBar: true,
            });
        },
        onSuccess: () => {
            toast("Product updated successfully", {
                type: 'success',
                toastId: 'updateProduct',
                autoClose: 1000,
                isLoading: false,
                hideProgressBar: true,
            });
            queryClient.invalidateQueries({ queryKey: ['userCart'] });
        }
    });

    const handleClearCart = async () => {
        const user = localStorage.getItem('user');
        const userId = user ? JSON.parse(user).id : null;

        if (userId === null) {
            toast.error('No user id', {
                autoClose: 1000,
                toastId: 'clearCart',
                closeOnClick: true,
                hideProgressBar: true,
            });
            return;
        }

        await mutation.mutateAsync(userId);
    };

    return (
        <div className="flex flex-col justify-start w-full items-start text-center px-5 py-3 bg-white shadow-md rounded-md flex-auto">
            {data?.cartProducts?.length > 0 &&
                <div className="flex flex-row items-center justify-between w-full gap-3 pb-2 border-b">
                    <h1 className="font-medium text-lg">Cart ({data?.cartProducts?.length})</h1>
                    <Tooltip title="Clear cart" placement="top">
                        <IconButton color="error" title="Clear all" onClick={handleClearCart}>
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            }
            {data?.cartProducts?.length === 0 && <div className="flex flex-col justify-center items-center w-full h-[300px]">
                {/* <p className="text-secondary text-lg font-bold">Your cart is empty</p> */}
                <img loading="lazy" src={emptyCart} alt="empty_cart" className="w-[400px] h-[400px]" />
            </div>
            }
            {isLoading ? <Skeleton width="100%" height={200} />
                :
                <>
                    {data?.cartProducts?.map((item, index) => (
                        <div key={index} className="flex flex-col justify-center md:justify-between items-center md:items-start w-full">
                            <div className="flex flex-row w-full items-center justify-center xs:justify-between py-3 flex-wrap md:flex-nowrap border-b">
                                <div className="flex flex-row items-center justify-center md:justify-start flex-wrap md:flex-nowrap py-3 gap-5">
                                    <div className="relative w-[120px] h-fit">
                                        <img loading="lazy" src={item?.product?.productImageUrls[0]?.url} alt="cart_item_image" className="ease transition-all w-fit h-fit border-2 rounded-md hover:opacity-80 ease-in-out object-contain" />
                                        <div className="absolute top-[-17px] right-[-17px]">
                                            <div onClick={() => handleRemoveProduct({ productId: item.product.id })} className="absolute top-0 right-0 bg-white cursor-pointer shadow-md rounded-full py-1 px-2">
                                                <CloseIcon fontSize="inherit" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center sm:justify-start items-center sm:items-start">
                                        {item?.product?.quantity === 0 ?
                                            <p className="capitalize font-medium text-sm sm:text-left text-center">{truncateName(item.product.productName)}</p>
                                            :
                                            <Link to={`/products/${item.product.id}`}>
                                                <p className="text-secondary font-semibold sm:text-left text-center">{truncateName(item.product.productName)}</p>
                                            </Link>
                                        }
                                        <p className=" mt-1 text-gray-500">Quantity: {item.quantity}</p>
                                        <p className="font-semibold mt-1">&#8358; {formatCurrency(item?.product?.specialPrice === 0 ? item.product.price : item.product.specialPrice)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-5">
                                    <button
                                        disabled={item.quantity === 1}
                                        onClick={() => handleDecreaseQuantity({
                                            productId: item.product.id, index: index, quantity: item.quantity - 1, count: item.quantity
                                        })}
                                        className="search-btn px-3 py-1 text-white focus:text-primary focus:bg-white border cursor-pointer focus:scale-105 active:scale-105 rounded ease transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="font-bold">-</span>
                                    </button>
                                    <p className='font-bold transition-opacity duration-100 '>
                                        {item.quantity}
                                    </p>
                                    <button className="search-btn px-3 py-1 text-white focus:opacity-60 hover:opacity-80 focus:bg-white cursor-pointer focus:scale-105 active:scale-105 rounded ease transition-all shadow-md"
                                        onClick={() => handleIncreaseQuantity({ productId: item.product.id, quantity: item.quantity + 1, totalProduct: item?.product?.quantity })}
                                    >
                                        <span className="font-bold">+</span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </>
            }
        </div>
    )
}

export default CartItems