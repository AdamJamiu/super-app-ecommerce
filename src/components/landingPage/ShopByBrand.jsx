import { Divider, Skeleton } from '@mui/material';
import { getBrands } from '../../controllers/dashboard';
import { Link } from 'react-router-dom';

const ShopByBrand = () => {
    const { data, isLoading } = getBrands()

    return (
        <div className='rounded w-full'>
            <div className='flex flex-row justify-between items-center text-white bg-[#478118] p-4 rounded-t-md'>
                <h1 className='text-lg font-medium text-white'>Shop By Brands</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-1 sm:gap-4">
                {data?.map((item, index) => (
                    isLoading ?
                        <Skeleton variant="rectangular" width="100%" height={40} key={index} className='rounded-md' />
                        :
                        <Link key={index} to={`products/brand/${item.id}`} className='p-5 flex flex-col justify-center items-center shadow-sm rounded-md text-sm hover:shadow-md ease transition-all bg-white'>
                            <p className="">{item.name}</p>
                        </Link>

                ))}
            </div>
        </div>
    );
}

export default ShopByBrand;