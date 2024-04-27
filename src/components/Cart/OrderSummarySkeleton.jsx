import { Skeleton } from "@mui/material"

const OrderSumarySkeleton = () => {
    return (
        <div className="w-full flex flex-col justify-start gap-5 items-center">
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={40} />
        </div>
    )
}

export default OrderSumarySkeleton;