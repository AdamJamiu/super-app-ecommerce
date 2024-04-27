import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import { searchForProducts } from '../../controllers/dashboard';
import { useState } from 'react';

const AppBar = () => {
    const [searchString, setSearchString] = useState("")
    const { data: searchResult = [], isLoading } = searchForProducts({ SearchString: searchString })
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const navigate = useNavigate()

    const isAndroid = navigator.userAgent.toLowerCase().includes('android');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const getLink = (() => {
        if (isAndroid) {
            return "https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp";
        } else if (isIOS) {
            return 'https://apps.apple.com/app/joi/id6459510124';
        } else {
            // Default link for other platforms
            return "https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp";
        }
    })()

    const handleSearch = (e) => {
        setSearchString(e.target.value)
        if (e.target.value.length > 0) {
            setIsSearchOpen(true)
        }
        if (isSearchOpen === false) {
            setIsSearchOpen(true)
        }
    }

    const truncateName = (name) => {
        if (name.length > 25) {
            return name.slice(0, 20) + '...';
        }
        return name;
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        if (searchString.length > 0) {
            navigate(`/products/search/${searchString}`)
            setIsSearchOpen(false)
        }
    }

    const handleClick = ({ productId }) => {
        navigate(`/products/${productId}`)
        // setIsSearchOpen(false)
    }

    return (
        <nav className="z-50 sticky top-0 left-0 right-0 border-b h-20 text-gray-900 bg-white flex flex-row justify-between md:justify-around lg:gap-[5em] gap-5 lg:px-10 px-2 items-center ">
            <Link to='/'>
                <img src={logo} alt="logo" className="w-20 h-20 object-cover" />

            </Link>

            <div className="relative flex-row justify-center items-center hidden md:flex w-[530px] gap-5">
                <form onSubmit={handleSearchClick} className='w-full relative h-fit'>
                    <div className='absolute top-4 left-2'>
                        <img src="https://img.alicdn.com/imgextra/i1/O1CN01KOmULR1cUg5F4IR8C_!!6000000003604-2-tps-48-48.png" className='h-4' />
                    </div>
                    <input onChange={handleSearch} type="search" placeholder="i'm shopping for..." className="h-full w-full border-2 border-[#ff4000] rounded pl-7 pr-5 py-3 focus:outline-none ease transition-all placeholder:text-black text-sm" />
                    <div onClick={handleSearchClick} className='absolute right-0 flex justify-center items-center px-7 top-0 h-full text-white cursor-pointer search-btn'>
                        <p className='text-md font-bold'>search</p>
                    </div>
                </form>

                {searchResult?.length > 0 &&
                    <ul className={`${isSearchOpen ? "" : "hidden"} absolute top-10 min-h-min max-h-52 overflow-y-auto left-0 right-0 bg-white z-50 p-3 w-full ease transition-all`}>
                        {searchResult?.map(product => (
                            <div onClick={() => handleClick({ productId: product?.id })} key={product?.id} className="py-2 px-5 hover:bg-gray-100 cursor-pointer hidden sm:flex flex-row items-center justify-start gap-4">
                                <img loading="lazy" src={product?.productImageUrls[0]?.url} alt="product" className="w-10 h-10 rounded-md" />
                                <span>{truncateName(product?.productName)}</span>
                            </div>
                        ))}
                    </ul>
                }
            </div>

            <div className="flex font-medium text-md flex-row justify-between items-center min-w-max flex-nowrap gap-5 text-secondary text-sm">

                <Link to={getLink} className="px-4 py-3 transition ease font-medium">
                    Download
                </Link>
                <Link to="/auth/login" className="font-medium ease transition-all bg-orange-100 text-orange-500 border-[#ff4000] rounded-md py-3 px-4 border">
                    Log in
                </Link>
                <Link to="/auth/signup" className="px-4 py-3 text-center search-btn text-white rounded-md font-medium ease transition-all hover:opacity-70 hidden xs:block">
                    Get started
                </Link>
            </div>
        </nav>
    );
}

export default AppBar;