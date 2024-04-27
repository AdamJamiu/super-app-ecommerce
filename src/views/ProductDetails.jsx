import { useEffect, useState } from "react"
import { CircularProgress, IconButton } from "@mui/material"
import { useParams, Link, useNavigate } from "react-router-dom"
import DashboardLayout from "../global/DashboardLayout"
import { addProductToCart, getProductById } from "../controllers/dashboard"
import { useAppContext } from "../provider/AppProvider"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ArrowBack, FavoriteBorderOutlined } from "@mui/icons-material"
import ProductDetailsSkeleton from "../components/products/ProductDetailsSkeleton"
import MoreItemFromBrand from "../components/Cart/MoreItemFromBrand"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet"
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductDetails = () => {
    const navigate = useNavigate()
    const { id: productId } = useParams()
    const { data, isLoading, isFetching } = getProductById({ productId })
    const queryClient = useQueryClient()
    const { handleSignInOpen } = useAppContext();
    const [counter, setCounter] = useState(1);
    const [animationKey, setAnimationKey] = useState(0);
    const [activeImgUrl, setActiveImgUrl] = useState(null)
    // console.log(data)

    const currencyFormat = (number) => {
        const money = Number(number)
        return money.toLocaleString('en-US')
    }

    const handleIncrement = () => {
        setCounter(counter + 1);
        setAnimationKey(animationKey + 1);
    };

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setAnimationKey(animationKey + 1);
        }
    };

    useEffect(() => {
        if (data) {
            document.title = `${data?.productName} - JOI Web`
        }
    }, [data])

    const mutation = useMutation({
        mutationFn: addProductToCart,
        onError: (error) => {
            toast(error?.response?.data?.message, {
                type: "error",
                autoClose: 1000,
                toastId: "addProductToCart",
                closeOnClick: true,
                hideProgressBar: true,
            })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] })
            toast("Item added to cart", {
                type: "success",
                autoClose: 1000,
                toastId: "addProductToCart",
                closeOnClick: true,
                hideProgressBar: true,
            })
        }
    })

    const handleAddToCart = () => {
        mutation.mutate({
            quantity: counter,
            productId,
            handleSignInOpen: () => handleSignInOpen(true)
        })
    }

    useEffect(() => {
        if (data) {
            setActiveImgUrl(data?.productImageUrls[0]?.url)
        }
    }, [data])

    const uniqueObjects = data?.productImageUrls?.filter((obj, index, self) =>
        index === self.findIndex((o) => o.url === obj.url)
    );

    return (
        <DashboardLayout>
            <Helmet>
                <title>{`${data?.productName ? data?.productName + " -" : ""} Just Own It E-Commerce Store`}</title>
                <meta name="description" content={data?.productDescription} />

                <meta property="og:title" content={`${data?.productName} - Just Own It`} />
                <meta property="og:description" content={data?.description} />
                <meta property="og:type" content="product" />
                <meta property="og:url" content={`https://www.justownitapp.com/products/${data?.id}`} />
                <meta property="og:image" content={data?.productImageUrls[0]?.url} />
                <meta property="og:image:alt" content={data?.productName} />

                {/* Twitter Card (for Twitter sharing) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${data?.productName} - Your E-Commerce Store`} />
                <meta name="twitter:description" content={data?.productDescription} />
                <meta name="twitter:image" content={data?.productImageUrls[0]?.url} />
                <meta name="twitter:image:alt" content={data?.productName} />
            </Helmet>

            <div className="mt-0 sm:mt-10">
                {isLoading || isFetching ?
                    <div className="flex flex-col w-full justify-center items-center shadow-md h-full px-5 py-10 bg-white rounded-md">
                        <ProductDetailsSkeleton />
                    </div>
                    :
                    <>
                        <div className="shadow-md h-full px-5 py-10 bg-white rounded-md relative">
                            {/* <div className="absolute right-2 top-2">
                                <IconButton>
                                    <FavoriteBorderOutlined />
                                </IconButton>
                            </div> */}
                            <div className="flex flex-row justify-start items-center gap-2 w-full mb-5 cursor-pointer" onClick={() => navigate(-1)}>
                                <ArrowBack fontSize="small" className="cursor-pointer" />
                                <p>Back</p>
                            </div>
                            <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-10">
                                <div className="flex-auto">
                                    <img key={activeImgUrl} loading="lazy" src={activeImgUrl} alt={data?.productName} className="w-full h-[450px] object-contain ease-in-out transition-opacity" />

                                    <Swiper slidesPerView={5} spaceBetween={10} className="mt-4">
                                        {uniqueObjects?.map((item, index) => (
                                            <SwiperSlide key={index} onClick={() => setActiveImgUrl(item?.url)} className="cursor-pointer h-20 w-20 hover:border-primary border-transparent border ease transition-all object-contain">
                                                <img src={item?.url} alt={item?.url} className="h-20 w-20 object-contain" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="flex flex-col justify-start items-start flex-auto">
                                    <div>
                                        <h1 className="text-xl font-bold">{data?.productName}</h1>
                                        <div className="flex flex-row my-3">
                                            <div className="text-sm">Brand: <Link to={`/products/brand/${data?.brand?.id}`} className="text-blue-500 font-medium hover:underline">{data?.brand.name}</Link></div>
                                        </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: data?.productDescription }} className="text-md w-full mt-3 lowercase" />
                                    <hr className="w-full my-5" />
                                    {data?.specialPrice > 0 ? <>
                                        <p className="text-2xl font-bold">&#8358; {currencyFormat(data?.specialPrice)}</p>
                                        <p className="text-orange-500"><s className="text-lg font-medium">&#8358;{currencyFormat(data?.price)}</s></p>
                                    </>
                                        :
                                        <p className="text-2xl font-bold">&#8358;{currencyFormat(data?.price)}</p>
                                    }

                                    <hr className="w-full my-5" />
                                    <p className="text-sm font-semibold">Quantity</p>

                                    <div className="flex flex-row justify-start items-center gap-5 sm:gap-10 mt-3">
                                        <div className="flex flex-row gap-3 items-center justify-between h-11 w-24 font-bold">
                                            <div className={`bg-gray-200 ${counter === 1 ? "bg-gray-100 opacity-50 cursor-not-allowed" : "cursor-pointer"} text-black px-3 py-1 rounded-full font-bold`} onClick={handleDecrement}>
                                                -
                                            </div>
                                            <span className="font-bold ease-out counter-animation">{counter}</span>
                                            <div className="bg-gray-200 text-black px-3 cursor-pointer py-1 font-bold rounded-full" onClick={handleIncrement}>
                                                +
                                            </div>
                                        </div>
                                        <button
                                            disabled={mutation.isLoading}
                                            onClick={handleAddToCart}
                                            className="bg-primary hover:opacity-80 search-btn font-semibold shadow-md rounded-md px-4 w-52 h-10 ease transition-all disabled:cursor-not-allowed disabled:opacity-50">
                                            {mutation.isLoading ? <CircularProgress color="inherit" size={20} /> : "Add to cart"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MoreItemFromBrand brandName={data?.brand?.name} brandId={data?.brand?.id} />
                    </>
                }
            </div>
        </DashboardLayout>
    )
}

export default ProductDetails