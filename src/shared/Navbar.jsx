import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { Badge, IconButton } from "@mui/material";
import NavMenu from "../components/customs/NavMenu";
import logo from "/images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import HamburgerMenu from "../components/customs/HamburgerMenu";
import { updateQueryParam } from "../helpers/queryParam";
import useApp from "../hooks/useApp";

const Navbar = () => {
  const navigate = useNavigate();
  const { handleOpenCart } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOPen] = useState(false);

  const hanleOpen = () => setIsOPen(true);
  const hanleClose = () => setIsOPen(false);

  const truncateName = (name) => {
    if (name.length > 25) {
      return name.slice(0, 20) + "...";
    }
    return name;
  };

  const return_url = window.location.pathname;

  return (
    <nav className="py-4 text-gray-900 bg-[#F9FAFB] flex flex-row justify-between sm:justify-center gap-4 lg:gap-[8em] sm:px-5 px-3 items-center w-full font-satoshi">
      {/* <NavSearchModal onClose={hanleClose} open={isOpen} /> */}

      <Link to="/dashboard" className="min-w-max">
        <img
          src={logo}
          alt="TD AFRICA LOGO"
          className="w-16 h-16 object-cover"
        />
      </Link>
      <div className="relative flex-row justify-center items-center hidden sm:flex w-[580px] gap-5"></div>

      <div className="sm:flex flex-row hidden justify-center items-center w-max flex-nowrap gap-3">
        <NavMenu />

        <div className="hidden sm:flex">
          <IconButton onClick={handleOpenCart}>
            <Badge badgeContent="0" color="error">
              <LocalGroceryStoreOutlinedIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      <HamburgerMenu onOpen={hanleOpen} />
    </nav>
  );
};

export default Navbar;
