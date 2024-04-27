import { Skeleton } from "@mui/material";

const PromotionSkeleton = () => {
    return (
        <div className="my-7">
            <Skeleton width="100%" height={30} variant="rectangular" />
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full flex-2 py-5 rounded-md">
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
        </div>
    );
}

export default PromotionSkeleton;