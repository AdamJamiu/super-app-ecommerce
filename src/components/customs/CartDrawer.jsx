import { Close } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import useApp from "../../hooks/useApp";

const CartDrawer = () => {
  const { isCartOpen, handleCloseCart } = useApp();
  const [viewportSize, setViewportSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(viewportSize);

  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => {
    if (quantity < 2) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <Drawer
      anchor={viewportSize <= 640 ? "bottom" : "right"}
      open={isCartOpen}
      onClose={handleCloseCart}
    >
      <div
        onClick={handleCloseCart}
        className="p-2 text-white] absolute right-2 top-3 rounded-full bg-red-500 sm:hidden"
      >
        <Close />
      </div>
      <div className="md:w-[40vw] lg:w-[37vw] sm:w-[65vw] w-screen sm:h-full h-[70vh] bg-white sm:px-10 p-5 font-satoshi"></div>
    </Drawer>
  );
};

export default CartDrawer;
