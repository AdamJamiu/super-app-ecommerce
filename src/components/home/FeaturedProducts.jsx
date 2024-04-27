// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowRightTwoTone';
import ProductCardSkeleton from "../products/ProductsCardSkeleton"

const FeaturedProducts = ({ data, isLoading }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US').format(amount);
    }

    const truncateName = (name) => {
        if (name.length > 30) {
            return name.slice(0, 30) + '...'
        }
        return name;
    }

    return (
        <div className='w-full my-5 rounded-md'>
            <div className='flex flex-row justify-between items-center bg-[#FFC108] p-4 rounded-t-md'>
                <h1 className='text-lg font-medium'>Featured Products</h1>
                <div className='flex flex-row items-center transition-all ease cursor-pointer hover:text-primary justify-start'>
                    <Link to="/products" className='text-sm font-medium'>SEE ALL</Link>
                    <KeyboardArrowRightTwoToneIcon fontSize='small' className='hover:translate-x-1 transition-all ease-in-out self-center' />
                </div>
            </div>
            {isLoading ? <ProductCardSkeleton />
                :
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mt-5 gap-1 md:gap-4">
                    {data?.products?.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id} className="relative card-wrap flex flex-col rounded-md items-stretch justify-center hover:border-orange-500 transition-all ease cursor-pointer bg-white border">
                            <div className='overflow-hidden'>
                                <img loading="lazy" src={product?.productImageUrls[0].url} alt={product.productName} className="w-full h-52 hover:scale-105 transition-all ease object-contain" />
                            </div>
                            <div className='xs:pl-4 pt-4 p-5 text-md'>
                                <p className="text-sm md:text-md mb-4">{truncateName(product.productName)}</p>
                                {product?.specialPrice === 0 ?
                                    <span className="sm:text-xl text-md text-[#FF6000] font-medium sm:font-semibold"> <span className="text-xs font-light sm:font-medium sm:text-sm">&#8358;</span>{formatCurrency(product?.price)}</span>
                                    :
                                    <div className='w-full flex flex-col justify-start items-start gap-1'>
                                        <p className="sm:text-xl text-md text-[#FF6000] font-medium sm:font-semibold"> <span className="text-xs font-light sm:font-medium sm:text-sm">&#8358;</span>{formatCurrency(product?.specialPrice)}</p>
                                        <s className="text-sm text-gray-400">&#8358;{formatCurrency(product?.price)}</s>
                                    </div>
                                }
                            </div>
                            {/* <FavoriteBorderIcon className="absolute love-icon top-2 right-2 text-white bg-primary rounded-full p-1 hover:bg-white hover:text-primary" /> */}
                        </Link>
                    ))}
                </div>
            }
        </div>
    );
}

export default FeaturedProducts;