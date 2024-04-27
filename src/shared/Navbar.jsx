import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { Badge, IconButton } from '@mui/material';
import NavMenu from '../components/customs/NavMenu';
import { getUserCart, searchForProducts } from '../controllers/dashboard';
import logo from "/images/logo.png"
import SearchIcon from '@mui/icons-material/Search';
import HamburgerMenu from '../components/customs/HamburgerMenu';
import NavSearchModal from '../components/customs/NavSearchModal';

const Navbar = () => {
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate();
    const { data = [] } = getUserCart({ navigate })
    const { data: searchResult = [], isLoading } = searchForProducts({ SearchString: searchString })
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isOpen, setIsOPen] = useState(false)

    const hanleOpen = () => setIsOPen(true)
    const hanleClose = () => setIsOPen(false)

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

    const token = localStorage.getItem('joi_web_token');
    const user = localStorage.getItem('user');

    const handleSearchClick = (e) => {
        e.preventDefault()
        if (searchString.length > 0) {
            navigate(`/products/search/${searchString}`)
            setIsSearchOpen(false)
        }
    }

    const return_url = window.location.pathname;

    // useEffect(() => {
    //     if (!token || !user) {
    //         navigate(`/auth/login?return_url=${return_url}`)
    //     }
    // }, [token, user])

    return (
        <nav className="z-50 sticky top-0 left-0 right-0 border-b h-20 text-gray-900 bg-white flex flex-row justify-between sm:justify-center gap-4 lg:gap-[8em] sm:px-5 px-3 items-center w-full font-satoshi">
            <NavSearchModal onClose={hanleClose} open={isOpen} />

            <Link to="/" className=''>
                <img src={logo} alt="TD AFRICA LOGO" className="w-20 h-20 object-cover" />
            </Link>
            <div className="relative flex-row justify-center items-center hidden sm:flex w-[580px] gap-5">
                <form onSubmit={handleSearchClick} className='w-full relative h-fit'>
                    <input onBlur={() => setIsSearchOpen(false)} onChange={handleSearch} type="search" placeholder="i'm shopping for..." className="h-full w-full border-2 border-[#ff4000] rounded pl-4 pr-5 py-3 focus:outline-none  ease transition-all placeholder:text-black" />
                    <div onClick={handleSearchClick} className='absolute right-0 flex justify-center items-center px-7 top-0  h-full text-white cursor-pointer search-btn'>
                        <p className='font-semibold'>search</p>
                    </div>
                </form>

                {searchResult?.length > 0 &&
                    <ul className={`${isSearchOpen ? "" : "invisible"} absolute top-14 min-h-min max-h-52 overflow-y-auto left-0 right-0 bg-white z-50 p-3 w-full shadow-md ease transition-all`}>
                        {searchResult?.map(product => (
                            <Link to={`/products/${product?.id}`} onClick={() => setIsSearchOpen(false)} key={product?.id} className="py-2 px-5 hover:bg-gray-100 cursor-pointer hidden sm:flex flex-row items-center justify-start gap-4">
                                <img src={product?.productImageUrls[0]?.url} alt="product" className="w-10 h-10 rounded-md" />
                                <span>{truncateName(product?.productName)}</span>
                            </Link>
                        ))}
                    </ul>
                }
            </div>

            <div className="xs:flex flex-row hidden justify-center items-center w-max flex-nowrap gap-3">
                <div className='flex sm:hidden hover:text-primary'>
                    <IconButton className='text-primary' color='inherit' onClick={hanleOpen}>
                        <SearchIcon />
                    </IconButton>
                </div>

                <NavMenu />

                <Link to="/cart" className='hover:text-primary flex flex-row justify-start items-centers gap-3 cursor-pointer'>
                    <Badge badgeContent={data?.cartProducts?.length ? data?.cartProducts?.length : "0"} color="error">
                        <LocalGroceryStoreOutlinedIcon />
                    </Badge>
                    <p className='font-medium hidden xl:block'>Cart</p>
                </Link>
            </div>

            <HamburgerMenu onOpen={hanleOpen} />

        </nav>
    );
}

export default Navbar;