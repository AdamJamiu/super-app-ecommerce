import { Link } from "react-router-dom";
import Notfound from "../../assets/images/404.svg"
import DashboardLayout from "../../global/DashboardLayout"

const NotFound = () => {
    return (
        <DashboardLayout>
            <div className="flex flex-row justify-around w-full flex-wrap gap-y-20 md:m-0 my-20 md:flex-nowrap sm:items-center h-screen">
                <div className="w-[300px]">
                    <h1 className="pb-4 font-bold text-3xl">Page Not Found</h1>
                    <p className="font-semibold text-md mb-4">We were unable to locate the page you were looking for.</p>
                    <p>But we still have thousands of other goods to look over.</p>
                    <Link to="/products" className=" font-medium">
                        <button className="py-2 px-10 search-btn text-white rounded mt-10" sx={{ mt: 3 }} >go home</button>
                    </Link>
                </div>
                <img loading="lazy" src={Notfound} alt="404" width={400} className="sm:block hidden" />
            </div>
        </DashboardLayout>
    )
}

export default NotFound;