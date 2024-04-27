import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full flex-2 p-5 bg-white rounded-md">
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-col justify-between gap-6 items-center flex-nowrap ">
                <Skeleton width="100%" variant="rectangular" height={150} />
                <Skeleton className="my-2" width="100%" variant="rectangular" height={10} />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
        </div>
    );
}

export default ProductCardSkeleton;