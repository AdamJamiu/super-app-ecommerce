import { useEffect, useState } from "react";
import SearchModal from "../../components/customs/Search.modal";
import { SearchTwoTone, ShoppingCart } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { orders } from "../../data/orders";
// import CartDrawer from "../../components/customs/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../interceptors";
import ProductDetailsDrawer from "../../components/customs/ProductDetailsDrawer";
import ProtectedRoute from "../../global/ProtectedRoute";
import { formatCurrency, truncateName } from "../../helpers/utility";
import ProductLoadingSkeleton from "./ProductLoadingSkeleton";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartDetails, setCartDetails] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("super_app_user_details"));
  const userId = user?.userStatus?.id;
  const [pageNumber, setPageNumber] = useState(1);

  const { data: products, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: () =>
      httpClient
        .post(`Dashboard/GetDashboardInformation/${userId}`, {
          numberOfItemsPerPage: 20,
          pageNumber,
        })
        .then((res) => res.data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // console.log(products);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Initial scroll position
    handleScroll();

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenCart = ({ item }) => {
    setIsOpen(true);
    setCartDetails(item);
  };
  const handleCloseCart = () => setIsOpen(false);

  return (
    <ProtectedRoute>
      <div className="w-full my-10 sm:px-0 px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-lg bg-white border shadow-sm p-4"></div>
        </div>

        {/* Products */}
        {isLoading && <ProductLoadingSkeleton />}
        <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-10 font-satoshi">
          {products?.data?.products?.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg sm:border-none border shadow-lg cursor-pointer flex flex-col justify-between items-start"
            >
              <div className="h-40 w-40 mx-auto overflow-hidden">
                <img
                  src={item?.productImageUrls[0]?.url}
                  className="mx-auto h-full w-full"
                />
              </div>
              <p className="text-sm text-gray-500 py-4 pl-2">
                {truncateName(item?.productName)}
              </p>

              <p className="text-lg font-semibold text-gray-800 mb-4 pl-2">
                <span className="font-normal text-sm">&#8358;</span>{" "}
                {formatCurrency(item?.priceInNaira)}
              </p>

              <button
                onClick={() => handleOpenCart({ item })}
                className="bg-red-800 ease-in-out transition-all hover:opacity-70 text-white w-full rounded py-1 flex flex-row justify-center items-center gap-1 mb-4"
              >
                <span>Add to cart</span>
                <ShoppingCart fontSize="small" />
              </button>
            </div>
          ))}
        </div>
        <SearchModal
          handleSearchClose={handleClose}
          handleSearchOpen={handleOpen}
          isSearchOpen={open}
        />
        {open ? null : (
          <div className="fixed bottom-28 sm:bottom-14 right-5">
            <Tooltip title="Search for product" placement="left">
              <div
                className={`px-2.5 ${
                  scrollPosition < 350 ? "animate-none" : "animate-bounce"
                } py-2.5 text-2xl sm:text-3xl flex justify-center items-center cursor-pointer hover:opacity-60 bg-red-900 rounded-full text-white`}
              >
                <SearchTwoTone
                  onClick={handleOpen}
                  color="inherit"
                  fontSize="inherit"
                />
              </div>
            </Tooltip>
          </div>
        )}

        <ProductDetailsDrawer
          open={isOpen}
          onClose={handleCloseCart}
          cartDetails={cartDetails}
        />
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
