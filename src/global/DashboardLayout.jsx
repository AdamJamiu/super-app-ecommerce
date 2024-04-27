import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import AppBar from "../components/home/AppBar";
import LoginModal from "../components/customs/LogInModal";

const DashboardLayout = ({ children }) => {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("joi_web_token")

    return (
        <div className="m-0 p-0 relative">
            {/* {user && token ? <Navbar /> : <AppBar />} */}
            <Navbar />
            <div className="bg-[#F1F1F1] flex flex-col justify-stretch items-center md:p-0 h-full min-h-screen">
                <div className="max-w-6xl flex flex-col justify-center items-center h-full w-full">
                    {children}
                </div>
            </div>
            <LoginModal />
            <Footer />
        </div>
    );
}

export default DashboardLayout;