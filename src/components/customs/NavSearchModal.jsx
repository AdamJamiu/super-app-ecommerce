import { IconButton, Modal } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchForProducts } from "../../controllers/dashboard";


const NavSearchModal = ({ open, onClose }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [search, setSearch] = useState("")
    const { data = [], isLoading } = searchForProducts({ SearchString: search })

    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length > 0) {
            setIsSearchOpen(true)

        }
        if (isSearchOpen === false) {
            setIsSearchOpen(true)
        }
    }

    const handleSearchClick = (e) => {
        e.preventDefault()
        if (search.length > 0) {
            navigate(`/products/search/${search}`)
            setIsSearchOpen(false)
            onClose()
        }
    }

    const truncateName = (name) => {
        if (name.length > 25) {
            return name.slice(0, 20) + '...';
        }
        return name;
    }

    const handleNavigate = (id) => {
        navigate(`/products/${id}`)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className="absolute top-0 bg-white right-0 left-0 bottom-0">
                <div className="bg-white shadow-md p-3 flex flex-row gap-3 justify-between items-center">
                    <IconButton onClick={onClose}>
                        <KeyboardBackspaceIcon />
                    </IconButton>

                    <input onChange={handleSearch} type="search" className="w-full focus:outline-none active:outline-none outline-none active:ring-0" placeholder="Search products by name........" />

                    <IconButton onClick={handleSearchClick}>
                        <SearchIcon />
                    </IconButton>
                </div>

                <ul className={`${isSearchOpen ? "" : "invisible"} h-full py-4 px-2 w-full ease transition-all flex flex-col justify-start items-start overflow-y-auto pb-3`}>
                    {data?.map(product => (
                        <Link to={`/products/${product?.id}`} key={product?.id} className="py-2 px-3 hover:bg-gray-100 cursor-pointer sm:hidden flex flex-row items-center justify-start gap-4 w-full">
                            <img loading="lazy" src={product?.productImageUrls[0]?.url} alt="product" className="w-10 h-10 rounded-md" />
                            <span>{truncateName(product?.productName)}</span>
                        </Link>
                    ))}
                </ul>

            </div>
        </Modal>
    )
}

export default NavSearchModal;