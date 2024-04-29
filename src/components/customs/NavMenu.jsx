import React, { useState, useEffect, useRef } from "react";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { Logout } from "../../helpers/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { KeyboardArrowUp } from "@mui/icons-material";

const NavMenu = () => {
  const userName = JSON.parse(sessionStorage.getItem("super_app_user_details"));
  const { firstName, lastName } = userName;
  const firstNameChar = firstName.charAt(0);
  const lastNameChar = lastName.charAt(0);
  const abbreviatedFullName = firstNameChar + lastNameChar;

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
    sessionStorage.removeItem("super_app_user_details");
    navigate("/login");
    closeMenu();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative w" ref={menuRef}>
      <div
        onClick={toggleMenu}
        className={` cursor-pointer flex flex-row flex-nowrap items-center w-fit p-3 rounded-md relative ${
          isOpen ? "bg-gray-200" : ""
        } ease-in-out transition-all`}
      >
        <p className="font-medium px-2 w-max">
          Hi, {firstName || ""} {lastName || ""}
        </p>
        <KeyboardArrowDownIcon
          className={`${
            isOpen
              ? "rotate-180 ease-in-out transition-transform duration-300"
              : "rotate-0 ease-in-out transition-transform duration-300"
          } ease-in-out transition-transform duration-300`}
        />
      </div>
      <div
        className={`absolute top-16 border right-0 w-80 bg-white text-secondary shadow-lg rounded-md transition-transform ${
          isOpen
            ? "transform translate-x-0 opacity-100"
            : "none transform -translate-y-full opacity-0"
        }`}
      >
        <ul>
          <div className="p-5 flex flex-row justify-start gap-5 items-center w-full border-b mb-3">
            <div className="py-3 px-3.5 border border-gray-300 text-sm font-semibold bg-gray-50 rounded-full">
              {abbreviatedFullName || ""}
            </div>

            <p>
              {firstName || ""} {lastName || ""}
            </p>
          </div>
          <NavLink
            onClick={closeMenu}
            to="/products"
            className="flex flex-row justify-start font- items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 py-2 px-5  ease transition-all"
          >
            <CategoryOutlinedIcon fontSize="small" />
            <p className="text-sm">Category</p>
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/deals"
            className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4  ease transition-all"
          >
            <LocalOfferOutlinedIcon fontSize="small" />
            <p className="text-sm">Deals</p>
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/customer/account/profile"
            className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4  ease transition-all"
          >
            <Person2OutlinedIcon fontSize="small" />
            <p className="text-sm">Profile</p>
          </NavLink>
          <NavLink
            onClick={closeMenu}
            to="/customer/account/orders"
            className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4  ease transition-all"
          >
            <AllInboxIcon fontSize="small" />
            <p className="text-sm">Orders</p>
          </NavLink>
          <li
            onClick={handleLogOut}
            className="flex flex-row justify-start items-center gap-3 active:bg-gray-200 focus:bg-gray-200 cursor-pointer hover:bg-gray-100 p-4 text-red-500"
          >
            <ExitToAppIcon fontSize="small" />
            <p className="text-sm">Log out </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
