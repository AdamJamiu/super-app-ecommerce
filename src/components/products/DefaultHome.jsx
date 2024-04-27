import { useState, useEffect } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { getBrandById, useGetDashboardInfo } from "../../controllers/dashboard";
import GridViewIcon from '@mui/icons-material/GridView';
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from '@mui/icons-material/Menu';
import ProductCardSkeleton from "./ProductsCardSkeleton";
import { dashboardClient } from "../../interceptors";
import { useQuery } from "@tanstack/react-query";
import CustomPagination from "../customs/Pagination";

const DefaultHome = ({ handleOpen }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isIdChanged, setIsIdChanged] = useState(false)
    const brandId = "a00de4fc-f147-4f5c-4b5c-08dbf0d0503d"
    const { data = {}, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["brand-By-Id", isIdChanged, currentPage],
        // queryFn: async () => await dashboardClient.get(`/Brand/GetBrand/${brandId}`, { params: { pageSize } })
        queryFn: async () => await dashboardClient.get(`/Brand/GetBrandWithPaginatedProduct/${brandId}`, { params: { pageSize: 20, PageNumber: currentPage } })
            .then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const brandName = data?.name;


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
        setIsIdChanged(prev => !prev)
    }, [brandId])


    const usersPerPage = 20;

    // console.log(currentPage);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentProducts = data?.products?.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        // refetch()
    };

    return (
        <div className="flex flex-col overflow-y-auto justify-start w-full h-full items-stretch text-center border rounded-md flex-auto">
            <div className="flex flex-row items-center justify-start w-full gap-3 p-4 border-b bg-primary">
                <div className="md:hidden block">
                    <IconButton onClick={handleOpen}>
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                </div>
                <h1 className="font-medium text-white text-lg">{brandName || ""}</h1>
            </div>
            {isLoading && isFetching ? <ProductCardSkeleton />
                :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 mt-3 lg:gap-4 w-full">
                    {data?.paginatedProducts?.data?.length === 0 && <div className="col-span-4 py-10 w-full flex flex-col items-center justify-center">
                        <p className="w-full">No items</p>
                    </div>}
                    {data?.paginatedProducts?.data?.map((item, index) => (
                        <Link to={`/products/${item.id}`} key={index} className="flex flex-col items-start justify-start p-2 flex-2 border bg-white hover:border-orange-500 min-h-max rounded-md">
                            <div>
                                <img loading="lazy" src={item?.productImageUrls[0]?.url} alt={item?.productName} className="ease transition-all w-[200px] h-[200px] hover:scale-[1.03] ease-in-out object-cover" />
                            </div>
                            <div className="py-2 flex flex-col items-start justify-between text-left mt-2">
                                <p className="text-sm text-secondary my-3">{truncateName(item?.productName)}</p>
                                {item?.specialPrice > 0 ?
                                    <>
                                        <p className="sm:text-xl text-md text-[#FF6000] font-medium sm:font-semibold"> <span className="text-xs font-light sm:font-medium sm:text-sm">&#8358;</span>{formatCurrency(item?.specialPrice)}</p>
                                        <p className="text-sm text-orange-500 font-medium"><s> &#8358;{formatCurrency(item?.price)}</s></p>
                                    </>
                                    :
                                    <div className="w-full flex flex-col justify-start items-start gap-1">
                                        <span className="sm:text-xl text-sm text-[#FF6000] font-medium sm:font-semibold"> <span className="text-xs font-light sm:font-medium sm:text-sm">&#8358;</span>{formatCurrency(item?.price)}</span>
                                        <span className="text-xs text-gray-700">{item?.quantity} left in stock</span>
                                    </div>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            }

            {data &&
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(data?.paginatedProducts?.count / usersPerPage)}
                    onPageChange={paginate}
                />
            }
        </div>
    )
}

export default DefaultHome;