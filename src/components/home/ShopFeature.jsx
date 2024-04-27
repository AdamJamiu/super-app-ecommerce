import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';

const ShopFeature = () => {
    return (
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-y-10 justify-between items-center shadow-md bg-white rounded-md w-full md:divide-x-2 mt-5 sm:p-10 p-5 text-secondary">
            <div className="flex flex-row justify-start flex-auto items-center gap-7">
                <LocalShippingTwoToneIcon sx={{ fontSize: "2.5em" }} />
                <div className=''>
                    <p className="font-semibold">Pick-up & Drop-Off Delivery</p>
                    <p className="text-gray-500 text-sm">Free shipping on all order</p>
                </div>
            </div>
            <div className="flex flex-row justify-start items-center flex-auto gap-7 md:pl-7">
                <SecurityTwoToneIcon sx={{ fontSize: "2.5em" }} />
                <div className=''>
                    <p className="text-md font-semibold capitalize">Secure Payments</p>
                    <p className="text-gray-500 text-sm">Secure, seamless transactions on all orders</p>
                </div>
            </div>
            <div className="flex flex-row justify-start items-center flex-auto gap-7 md:pl-7">
                <CachedTwoToneIcon sx={{ fontSize: "2.5em" }} />
                <div className=''>
                    <p className="text-md font-semibold">Online Support 24/7</p>
                    <p className="text-gray-500 text-sm">Reliable customer support at any time</p>
                </div>
            </div>

        </div>
    );
}

export default ShopFeature;