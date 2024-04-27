import AppBar from "../components/home/AppBar";
import AppFooter from "../components/home/AppFooter";

const AppLayout = ({ children }) => {
    return (
        <div className="bg-[]">
            <AppBar />
            <div className="bg-[#F1F1F1] flex flex-col justify-stretch items-center mt-15 p-5 min-h-screen m-0">
                <div className="max-w-6xl flex flex-col justify-center items-center h-full w-full">
                    {children}
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default AppLayout;