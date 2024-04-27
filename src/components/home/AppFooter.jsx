import logo from '../../assets/images/logo.jpg';

// MUI social links icons
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const AppFooter = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className='bg-secondary md:flex-nowrap flex-wrap text-white pt-20 pb-5 px-5 xs:px-20 w-full flex flex-col justify-center items-center'>
            <div className='max-w-6xl w-full'>

                <div className="flex flex-row gap-14 items-stretch justify-center w-full flex-wrap md:flex-nowrap h-full">
                    <img src={logo} alt="logo" className='self-start w-20' />
                    <div className='w-full  sm:w-[30%]'>
                        <h1 className='font-bold'>Questions: </h1>
                        <h1 className='font-bold text-xl mt-2'>+234 9029174191</h1>
                        <div className='flex flex-row justify-start items-center gap-5 mt-3'>
                            <Link target='_blank' to="http://www.facebook.com/tdafrica1" className='cursor-pointer rounded-full p-1 hover:bg-white hover:text-primary'>
                                <FacebookIcon />
                            </Link>
                            <Link target='_blank' to="https://www.instagram.com/justownitng?igsh=MWJ0d3BzMWJ2ZzM5ZQ==" className='cursor-pointer rounded-full p-1 hover:bg-white hover:text-primary'>
                                <InstagramIcon />
                            </Link>
                            <Link target='_blank' to="https://www.twitter.com/Td_africa1/" className='cursor-pointer rounded-full p-1 hover:bg-white hover:text-primary'>
                                <TwitterIcon />
                            </Link>
                            <Link target='_blank' to="https://www.linkedin.com/company/just-own-it-joi/" className='cursor-pointer rounded-full p-1 hover:bg-white hover:text-primary'>
                                <LinkedInIcon />
                            </Link>
                        </div>
                    </div>
                    <div className="flex-auto w-full">
                        <p>
                            <b>Just Own It</b> effortlessly fills this gap.
                            <b>Just Own It</b> is a first of its kind asset-financing platform that bridges the gap between
                            financial institutions, customers and Original Equipment Manufacturers (OEMs). In line with
                            the mission to ensure products and services are accessible, affordable and usable across Africa,
                            we have implemented an Asset Financing technology
                            solution to ensure a stable supply of assets with minimal hassles in order to ease your journey to acquisition.
                        </p>
                    </div>
                </div>
                <hr className='my-10 border-[#999999] ' />
                <div className="flex flex-row justify-start items-start px-5 sm:px-0 xs:px-20 text-white">
                    <p className='w-max'>TD e-commerce ©{currentYear}. All Rights Reserved.</p>
                </div>

            </div>
        </footer>
    );
}

export default AppFooter;