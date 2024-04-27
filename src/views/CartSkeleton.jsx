import { Skeleton } from "@mui/material"

const CartSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-white rounded-md px-5 mt-10 shadow-md">
            <Skeleton width="100%" className="col-span-2" height={400} />
            <Skeleton width="100%" height={400} />
        </div>
    )
}

export default CartSkeleton;