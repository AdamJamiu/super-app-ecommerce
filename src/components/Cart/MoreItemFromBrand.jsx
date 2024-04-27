import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCardSkeleton from "../products/ProductsCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { dashboardClient } from "../../interceptors";

const MoreItemFromBrand = ({ brandName, brandId }) => {
    const { data = {}, isLoading } = useQuery({
        queryKey: ["getbrandById", brandId],
        queryFn: async () => await dashboardClient.get(`Brand/GetBrand/${brandId}`).then(res => res?.data?.data),
        retry: 1,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const truncateName = (name) => {
        if (name.length > 20) {
            return name.slice(0, 20) + '...'
        }
        return name
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US')
    }

    useEffect(() => {
        document.title = `${brandName} | Ecommerce`
    }, [brandName])

    return (
        <div className="my-3 sm:my-5 flex flex-col justify-start w-full h-full items-stretch">
            {isLoading ? <ProductCardSkeleton />
                : data?.products?.length > 0 &&
                <div className="flex flex-col justify-start w-full h-full items-stretch text-center flex-auto">
                    <div className="flex flex-row items-center  justify-between w-full gap-3 p-5 bg-blue-500 border-b text-white">
                        <h1 className="font-medium text-lg">More items from {brandName || ""}</h1>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-4 w-full  md:bg-white p-3">
                        {data?.products?.length === 0 && <div className="col-span-4 py-10 w-full flex flex-col items-center justify-center">
                            <p className="w-full">No items</p>
                        </div>}
                        {data?.products?.map((item, index) => (
                            <Link to={`/products/${item.id}`} key={index} className="flex flex-col items-center md:items-start justify-start p-2 flex-2 border bg-white hover:border-orange-500">
                                <div className="overflow-hidden">
                                    <img loading="lazy" src={item?.productImageUrls[0]?.url} alt={item?.productName} className="ease transition-all w-[200px] h-[200px] hover:scale-[1.03] ease-in-out object-contain" />
                                </div>

                                <div className="py-4 flex flex-col items-start justify-start text-left">
                                    <p className="">{truncateName(item?.productName)}</p>
                                    <p className="text-xl text-[#FF6000] mt-3 font-bold"><span className="text-sm">&#8358;</span>{formatCurrency(item.price)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default MoreItemFromBrand;