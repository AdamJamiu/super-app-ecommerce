import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBrandById } from "../../controllers/dashboard";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ProductCardSkeleton from "./ProductsCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { dashboardClient } from "../../interceptors";
import CustomPagination from "../customs/Pagination";

const BrandCatgories = ({ handleOpen }) => {
    // const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);

    const [isIdChanged, setIsIdChanged] = useState(false)
    const { brandId } = useParams();
    const { data = {}, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["brandById", brandId, isIdChanged, currentPage],
        // queryFn: async () => await dashboardClient.get(`/Brand/GetBrand/${brandId}`, { params: { pageSize } })
        queryFn: async () => await dashboardClient.get(`/Brand/GetBrandWithPaginatedProduct/${brandId}`, { params: { pageSize: 20, PageNumber: currentPage } })
            .then(res => res?.data?.data),
        retry: 4,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })

    const brandName = data?.name;

    const truncateName = (name) => {
        if (name?.length > 18) return name?.slice(0, 18) + '...'
        return name
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('en-US')
    }

    useEffect(() => {
        document.title = `${brandName || ""} | Ecommerce`
    }, [brandName])

    const usersPerPage = 20;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
        // refetch()
    };

    useEffect(() => {
        setIsIdChanged(prev => !prev)
        setCurrentPage(1);

    }, [brandId])

    return (
        <div className="flex flex-col overflow-y-auto justify-start w-full h-full items-stretch text-center flex-auto scroller">
            <div className="flex flex-row items-center justify-start w-full gap-3 bg-primary border-b">
                <div className="md:hidden block">
                    <IconButton onClick={handleOpen}>
                        <MenuIcon fontSize="medium" />
                    </IconButton>
                </div>
                <h1 className="font-medium text-xl text-white p-4">{brandName || ""}</h1>
            </div>
            {isLoading && isFetching ? <ProductCardSkeleton />
                :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-3 w-full mt-4">
                    {data?.paginatedProducts?.data?.length === 0 && <div className="col-span-4 py-10 w-full flex flex-col items-center justify-center">
                        <p className="w-full">No items</p>
                    </div>}
                    {data?.paginatedProducts?.data?.map((item, index) => (
                        <Link to={`/products/${item.id}`} key={index} className="flex flex-col items-start justify-start p-4 rounded-md flex-2 border bg-white hover:border-orange-500">
                            <div>
                                <img loading="lazy" src={item?.productImageUrls[0]?.url} alt={item?.productName} className="ease transition-all w-[200px] h-[200px] hover:scale-[1.03] ease-in-out object-contain" />
                            </div>
                            <div className="py-2 flex flex-col items-start justify-start text-left mt-2">
                                <p className="text-sm text-secondary mb-3">{truncateName(item?.productName)}</p>
                                {item?.specialPrice > 0 ?
                                    <>
                                        <p className="text-xl text-[#FF6000] font-bold"><span className="text-sm">&#8358;</span>{formatCurrency(item?.specialPrice)}</p>
                                        <p className="text-sm text-orange-500 font-medium"><s> &#8358;{formatCurrency(item?.price)}</s></p>
                                    </>
                                    :
                                    <>
                                        <p className="text-xl text-[#FF6000] font-bold"><span className="text-sm">&#8358;</span> {formatCurrency(item?.price)}</p>
                                        <span className="text-xs text-gray-700 mt-2">{item?.quantity} left in stock</span>
                                    </>
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

export default BrandCatgories;