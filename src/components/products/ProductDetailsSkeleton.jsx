import { Skeleton } from "@mui/material"

const ProductDetailsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 md:p-0 w-full">
            <Skeleton variant="rectangular" width={300} height={370} />
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={50} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
        </div>
    )
}

export default ProductDetailsSkeleton;