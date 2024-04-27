import { getPromos } from "../../controllers/dashboard";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

const PromoSection = () => {
    const { data = [], isLoading } = getPromos();
    const productImages = data?.filter(item => item?.promoImages?.length > 0);

    return (
        <div className='w-full shadow-md h-fit bg-white rounded-sm mt-20'>
            {isLoading &&
                <div className='bg-white p-2 shadow-lg'>
                    <Skeleton variant="rectangular" width="100%" height={400} />
                </div>
            }

            <div className='p-2 bg-white shadow-lg rounded-md'>
                {productImages?.map((item) => (
                    <Link to={`/promo/${item?.id}`} key={item?.id}>
                        <div className='h-96'>
                            {item?.promoImages?.map((image, idx) => (
                                <img loading="lazy" src={image?.url} alt="slider" className="object-contain bg-center bg-no-repeat" key={idx} />
                            ))}
                        </div>

                    </Link>
                ))}

            </div>
        </div>
    )
}

export default PromoSection