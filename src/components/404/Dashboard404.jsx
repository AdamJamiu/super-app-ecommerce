import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Notfound from "../../assets/images/404.svg"


const Dashboard404 = () => {
    return (
        <div className="flex flex-row justify-center flex-wrap-reverse md:flex-nowrap md:justify-around w-full items-center md:h-full h-[70vh] bg-white">
            <div className="w-[300px] text-secondary">
                <h1 className="py-4 font-black text-secondary text-3xl">Page Not Found</h1>
                <p className="font-black text-md mb-4">We were unable to locate the page you were looking for.</p>
                <p>But we still have thousands of other goods to look over.</p>
                <Link to="/products" className="text-primary font-black ">
                    <Button variant="contained" color="error" sx={{ mt: 3 }} >Go Home</Button>
                </Link>
            </div>
            <img src={Notfound} alt="404" width={400} className="md:flex hidden" />
        </div>
    );
}

export default Dashboard404;