import React, { useState, useEffect, useRef } from 'react';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { Logout } from '../../helpers/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { KeyboardArrowUp } from '@mui/icons-material';

const NavMenu = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user?.firstName;
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLogOut = () => {
        Logout({ navigate });
        closeMenu();
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={menuRef}>
            <div onClick={toggleMenu} className={`hover:text-primary cursor-pointer flex flex-row flex-nowrap items-center w-fit p-3 rounded-md ${isOpen ? "bg-gray-100" : ""} ease-in-out transition-all`}>
                <Person2OutlinedIcon />
                <p className="hidden xl:inline-block font-medium px-2">Hi, {userName}</p>
                <KeyboardArrowDownIcon className={`${isOpen ? "rotate-180 ease-in-out transition-transform duration-300" : "rotate-0 ease-in-out transition-transform duration-300"} ease-in-out transition-transform duration-300`} />
            </div>
            <div className={`fixed top-20 right-8 lg:right-40 w-52 bg-white text-secondary shadow-lg rounded-md transition-transform ${isOpen ? 'transform translate-x-0 opacity-100' : 'none hidden transform -translate-y-full opacity-0'}`}>
                <ul>
                    <NavLink onClick={closeMenu} to="/products" className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 hover:text-primary ease transition-all">
                        <CategoryOutlinedIcon fontSize='small' />
                        <p className='text-sm'>Category</p>
                    </NavLink>
                    <NavLink onClick={closeMenu} to="/deals" className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 hover:text-primary ease transition-all">
                        <LocalOfferOutlinedIcon fontSize='small' />
                        <p className='text-sm'>Deals</p>
                    </NavLink>
                    <NavLink onClick={closeMenu} to="/customer/account/profile" className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 hover:text-primary ease transition-all">
                        <Person2OutlinedIcon fontSize='small' />
                        <p className='text-sm'>Profile</p>
                    </NavLink>
                    <NavLink onClick={closeMenu} to="/customer/account/orders" className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 hover:text-primary ease transition-all">
                        <AllInboxIcon fontSize='small' />
                        <p className='text-sm'>Orders</p>
                    </NavLink>
                    <li onClick={handleLogOut} className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 text-red-500">
                        <ExitToAppIcon fontSize='small' />
                        <p className='text-sm'>Log out </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavMenu;