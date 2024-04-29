import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";

const SearchModal = ({ isSearchOpen, handleSearchOpen, handleSearchClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <motion.div>
      <AnimatePresence mode="popLayout">
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="md:grid grid-cols-12 fixed inset-0 px-4 md:px-0 z-10"
          >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative">
              <button
                onClick={handleSearchClose}
                className="absolute w-[40px] h-[40px] p-2 rounded-full bg-red-800 left-2 z-[99] top-4 flex items-center text-md justify-center"
              >
                <CloseOutlined className="text-white" size="40px" />
              </button>
            </div>
            <div className="col-span-8 col-start-3 my-32 relative">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  required=""
                  name="email"
                  placeholder="Search products"
                  className="ease focus:border-light-500 w-full outline-none ease transition-all py-3 px-4 text-sm border rounded bg-light-100 text-black pl-11"
                  value=""
                />
                <SearchOutlined
                  size="20px"
                  className="absolute top-3 left-4 fill-light-500"
                />
                <button className="md:w-auto flex gap-2 items-center bg-blue-500 text-[17px] text-white px-8 py-3 rounded">
                  <span className="block text-xs md:text-[17px]">Search</span>
                </button>
              </div>
              {!isLoading ? (
                <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 my-4 md:gap-4 gap-2">
                  <Link to="/">
                    <div className="p-4 rounded bg-white text-center">
                      <p className="text-black text-center text-sm">
                        {/* {titleCase(categories?.data?.data[4].name)} */}
                      </p>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="p-4 rounded bg-white text-center">
                      <p className="text-black text-center text-sm">
                        {/* {titleCase(getFirstName(categories?.data?.data[2].name))} */}
                      </p>
                    </div>
                  </Link>
                  <Link to="/[category]">
                    <div className="p-4 rounded bg-white text-center">
                      <p className="text-black text-center text-sm">
                        {/* {titleCase(getFirstName(categories?.data?.data[1].name))} */}
                      </p>
                    </div>
                  </Link>
                  <Link to="/[category]">
                    <div className="p-4 rounded bg-white text-center">
                      <p className="text-black text-center text-sm">
                        {/* {titleCase(categories?.data?.data[3].name)} */}
                      </p>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 my-4 md:gap-4 gap-2">
                  <div className="min-h-[50px] rounded animate-pulse bg-slate-200"></div>
                  <div className="min-h-[50px] rounded animate-pulse bg-slate-200"></div>
                  <div className="min-h-[50px] rounded animate-pulse bg-slate-200"></div>
                  <div className="min-h-[50px] rounded animate-pulse bg-slate-200"></div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchModal;
