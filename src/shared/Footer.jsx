import { HomeOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { updateQueryParam } from "../helpers/queryParam";

const Footer = () => {
  const [active, setActive] = useState("");

  const handleOpenCart = () => {
    updateQueryParam("cart", "open");
    setActive("carts");
  };

  return (
    <footer className="bg-gray-100 fixed bottom-0 right-0 left-0 sm:hidden p-5">
      <div className="px-5 space-x-7 text-center">
        <IconButton
          onClick={() => setActive("dashboard")}
          color={active === "dashboard" ? "error" : "default"}
        >
          <HomeOutlined
            fontSize="inherit"
            color={active === "dashboard" ? "error" : "default"}
          />
        </IconButton>

        <IconButton
          onClick={() => setActive("products")}
          color={active === "products" ? "error" : "default"}
        >
          <StoreOutlinedIcon
            fontSize="inherit"
            color={active === "products" ? "error" : "default"}
          />
        </IconButton>

        <IconButton
          onClick={() => setActive("orders")}
          color={active === "orders" ? "error" : "default"}
        >
          <TextSnippetOutlinedIcon
            fontSize="inherit"
            color={active === "orders" ? "error" : "default"}
          />
        </IconButton>

        <IconButton
          onClick={handleOpenCart}
          color={active === "carts" ? "error" : "default"}
        >
          <ShoppingCartOutlined
            fontSize="inherit"
            color={active === "carts" ? "error" : "default"}
          />
        </IconButton>
      </div>
    </footer>
  );
};

export default Footer;
