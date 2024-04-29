import { Close, ShoppingCart } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { useState } from "react";

const ProductDetailsDrawer = ({ open, onClose, cartDetails }) => {
  //   console.log(cartDetails);
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => {
    if (quantity < 2) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        onClick={onClose}
        className="p-2 text-white absolute right-2 top-3 rounded-full bg-red-500 sm:hidden"
      >
        <Close />
      </div>
      <div className="md:w-[40vw] lg:w-[37vw] sm:w-[65vw] w-screen bg-white sm:px-10 p-5 font-satoshi">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="rounded-md shadow-md p-1 bg-white w-full">
            <img src={cartDetails.image} className="mx-auto" />
          </div>

          <p className="mt-5 p-3">
            The iPhone XS Max has the same hardware and cameras, but a larger
            6.46 inch (164 mm) OLED display (marketed as 6.5 inch) with a
            resolution of 2688 × 1242 pixels (3.3 megapixels) at 458 ppi and a
            larger battery (3,174mAh). The XS has a smaller battery than the X,
            dropping to 2,658 mAh from 2,716 mAh.
          </p>

          <hr className="my-5 w-full" />
          <h2 className="font-semibold w-full text-left text-2xl">
            &#8358; 100, 000
          </h2>
          <hr className="my-5 w-full" />

          <div className="w-full flex flex-row justify-between items-center p-3">
            <div className="w-max flex flex-row justify-start items-center gap-4">
              <button
                disabled={quantity < 2}
                onClick={handleDecreaseQuantity}
                className="ease-in transition-opacity px-5 py-1 rounded-md bg-red-200 font-semibold text-lg text-red-900 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                -
              </button>

              <p>{quantity}</p>

              <button
                onClick={handleIncreaseQuantity}
                className="px-5 py-1 rounded-md bg-red-200 font-semibold text-lg text-red-900 cursor-pointer"
              >
                +
              </button>
            </div>

            <button className="bg-red-800 ease-in-out transition-all hover:opacity-70 text-white w-max rounded py-2 px-4 flex flex-row justify-center items-center gap-1">
              <span>Add to cart</span>
              <ShoppingCart fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ProductDetailsDrawer;
