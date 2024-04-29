import { Skeleton } from "@mui/material";

const ProductLoadingSkeleton = () => {
  return (
    <div className="w-full mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 font-satoshi">
      <div className="flex flex-col justify-between items-start gap-4 shadow-md px-4 py-7">
        <Skeleton height={100} width={100} variant="circular" />
        <Skeleton height={15} width={50} variant="rounded" />
        <Skeleton height={15} width="100%" variant="rounded" animation="wave" />
      </div>
      <div className="flex flex-col justify-between items-start gap-4 shadow-md px-4 py-7">
        <Skeleton height={100} width={100} variant="circular" />
        <Skeleton height={15} width={50} variant="rounded" animation="wave" />
        <Skeleton height={15} width="100%" variant="rounded" animation="wave" />
      </div>
      <div className="flex flex-col justify-between items-start gap-4 shadow-md px-4 py-7">
        <Skeleton height={100} width={100} variant="circular" />
        <Skeleton height={15} width={50} variant="rounded" animation="wave" />
        <Skeleton height={15} width="100%" variant="rounded" animation="wave" />
      </div>
      <div className="flex flex-col justify-between items-start gap-4 shadow-md px-4 py-7">
        <Skeleton height={100} width={100} variant="circular" />
        <Skeleton height={15} width={50} variant="rounded" animation="wave" />
        <Skeleton height={15} width="100%" variant="rounded" animation="wave" />
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
