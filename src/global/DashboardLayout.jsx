import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import CartDrawer from "../components/customs/CartDrawer";

const DashboardLayout = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("super_app_user_details"));

  return (
    <div className="w-full bg-[#F9FAFB] flex flex-col justify-center items-center">
      <div className="m-0 px-4 md:p-0 relative w-full max-w-5xl">
        <Navbar />
        <div className="flex flex-col justify-stretch items-center md:p-0 h-full min-h-screen">
          <div className="flex flex-col justify-center items-center h-full w-full">
            {children}
          </div>
        </div>
        <CartDrawer />
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
