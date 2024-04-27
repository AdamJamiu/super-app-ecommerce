import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { searchForProducts } from "../../controllers/dashboard";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ProductCardSkeleton from "./ProductsCardSkeleton";
import binnocularImg from "../../assets/images/binocular.png"
import { dashboardClient } from "../../interceptors";
import { useQuery } from "@tanstack/react-query";

const SearchPage = ({ handleOpen }) => {
    const { searchString } = useParams();
    // const { data = {}, isLoading, isFetching } = getBrandById({ brandId, isIdChanged })
    const { data = [], isLoading, isFetching } = useQuery({
        queryKey: ["searchForProducts", searchString],
        queryFn: async () => await dashboardClient.get(`Product/GetProducts`, {
            params: {
                SearchString: searchString,
            }
        }).then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: false,
        refetchOnWindowFocus: false
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
        document.title = `${searchString} | JOI`
    }, [searchString])

    return (
        <div className={`${data?.length > 0 ? "" : "bg-transparent"} flex flex-col overflow-y-auto justify-start w-full h-full items-stretch text-center flex-auto`}>
            <div className={`${data?.length > 0 ? "flex" : "hidden"} flex-row items-center justify-between flex-nowrap w-full border-b p-5 bg-white`}>
                <div className="flex flex-row items-center justify-start w-full gap-3">
                    <div className="md:hidden block">
                        <IconButton onClick={handleOpen}>
                            <MenuIcon fontSize="medium" />
                        </IconButton>
                    </div>
                    <h1 className="font-semibold text-lg">Search results for:  <i className="font-medium"> {searchString || ""}</i></h1>
                </div>
                <p className="text-sm text-gray-500 w-full text-end">{data?.length} {data?.length <= 1 ? "Product" : "Products"} found</p>
            </div>
            {isLoading && isFetching ? <ProductCardSkeleton />
                :
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-1">
                    {data?.length === 0 &&
                        <div className="col-span-4 py-10 w-full flex flex-col items-center justify-center bg-white h-full shadow-sm rounded-md">
                            <div className="flex flex-col">
                                <div className="bg-white p-2 flex flex-col justify-center items-center rounded-full w-fit self-center">
                                    <img loading="lazy" src={binnocularImg} alt="binnocular" className="w-20 h-20" />
                                </div>
                                <p className="w-full  font-semibold my-4">There are no results for "{searchString}"</p>
                                <div className="w-full text-left">
                                    <li className="w-full text-sm font-light">Check for typos or misspellings</li>
                                    <li className="w-full text-sm font-light">Broaden your search by using fewer words</li>
                                    <li className="w-full text-sm font-light">Use general product terms instead of brand names</li>
                                </div>
                            </div>
                        </div>}
                    {data && data?.map((item, index) => (
                        <Link to={`/products/${item.id}`} key={index} className="flex flex-col items-start justify-between py-3 flex-2 shadow-sm rounded-sm bg-white p-1 border">
                            <div>
                                <img loading="lazy" src={item?.productImageUrls[0]?.url} alt={item?.productName} className="ease transition-all w-[200px] h-[200px] hover:scale-[1.03] ease-in-out object-contain" />
                            </div>
                            <div className="py-2 flex flex-col items-start justify-start text-left mt-2">
                                <p className="text-sm text-secondary">{truncateName(item?.productName)}</p>
                                {item?.specialPrice === 0 ?
                                    <p className="text-xl text-[#FF6000] mt-3 font-bold"><span className="text-sm">&#8358;</span>{formatCurrency(item?.price)}</p>
                                    :
                                    <Fragment>
                                        <p className="text-lg text-secondary font-bold">&#8358;{formatCurrency(item?.specialPrice)}</p>
                                        <s className="text-sm text-orange-500 font-medium">&#8358;{formatCurrency(item?.price)}</s>
                                    </Fragment>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default SearchPage;