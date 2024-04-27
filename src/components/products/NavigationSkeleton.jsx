import { Skeleton } from "@mui/material";

const NavigationSkeleton = () => {
    return (
        <div className="md:flex hidden flex-col items-stretch gap-5 justify-start w-[30%] flex-2 p-5 shadow-md bg-white rounded-md">
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
            <div className="flex flex-row justify-between gap-6 items-center flex-nowrap ">
                <Skeleton height={30} width={40} variant="circular" />
                <Skeleton width="100%" variant="rectangular" height={10} />
            </div>
        </div>
    );
}

export default NavigationSkeleton;