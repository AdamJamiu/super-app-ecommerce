// social links icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Helmet } from 'react-helmet';
// images
import appleStore from "../assets/images/appstore.png"
import playstore from "../assets/images/googleplay.png"
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer className='bg-[#333333] text-[#999999] pt-10 px-5 sm:px-20'>
            <div className="flex flex-row gap-10 items-stretch justify-center w-full flex-wrap md:flex-nowrap h-full">
                <div className="flex-auto w-full">

                    <div className="flex flex-col justify-between items-start gap-5">
                        <h1 className="text-md font-medium">Contact Info</h1>

                        <div className="flex flex-row gap-3 justify-start text-sm">
                            <LocationOnOutlinedIcon fontSize="small" />
                            <p>13, Yudala Heights Building, Opposite Redington Hospital, Idowu Martins Street, Victoria island, Lagos.</p>
                        </div>
                        <div className="flex flex-row gap-3 items-center justify-start text-sm">
                            <EmailOutlinedIcon fontSize="small" />
                            <div>Email: <Link className='hover:underline' to="info@justownitapp.com">info@justownitapp.com</Link></div>
                        </div>
                        <div className="flex flex-row gap-3 justify-start text-sm">
                            <LocalPhoneOutlinedIcon fontSize="small" />
                            <div>Phone number:
                                <Link className='hover:underline' to="09029993178"> 0902 999 3178, </Link>
                                <Link className='hover:underline' to="09121160192"> 0912 116 0192</Link>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <h1 className='text-md font-medium '>Our Apps</h1>
                        <div className="flex flex-row mt-4 justify-start items-start gap-5">
                            <Link to="https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp">
                                <img src={playstore} alt="" className='w-28' />
                            </Link>

                            <Link to="https://apps.apple.com/app/joi/id6459510124">
                                <img src={appleStore} alt="" className='w-28' />
                            </Link>
                        </div>
                    </div>

                </div>
                {/*  */}
                <div className="flex-auto w-[50%]">
                    <div>
                        <h1 className='text-md  font-medium'>Information</h1>
                        <div className="flex flex-col mt-5 justify-between items-start gap-3 text-sm">
                            <Link to="/data-privacy" className='ease transition-all'>Data Privacy & Protection Policy</Link>
                            <Link to="/terms&conditions" className='ease transition-all'>Terms & Conditions</Link>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h1 className='text-md font-medium '>Social</h1>
                        <div className="flex flex-row mt-2 justify-start text-sm items-start gap-3">
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

                    {/* Payment methods */}
                    <div className='mt-8'>
                        <h1 className='text-md font-medium '>Payment Methods</h1>
                        <div className="flex flex-row mt-4 justify-start items-center gap-7">

                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512" className='fill-white'>
                                <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z" /></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512" className='fill-white'>
                                <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512" className='fill-white'>
                                <path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" /></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512" className='fill-white'>
                                <path d="M186.3 258.2c0 12.2-9.7 21.5-22 21.5-9.2 0-16-5.2-16-15 0-12.2 9.5-22 21.7-22 9.3 0 16.3 5.7 16.3 15.5zM80.5 209.7h-4.7c-1.5 0-3 1-3.2 2.7l-4.3 26.7 8.2-.3c11 0 19.5-1.5 21.5-14.2 2.3-13.4-6.2-14.9-17.5-14.9zm284 0H360c-1.8 0-3 1-3.2 2.7l-4.2 26.7 8-.3c13 0 22-3 22-18-.1-10.6-9.6-11.1-18.1-11.1zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM128.3 215.4c0-21-16.2-28-34.7-28h-40c-2.5 0-5 2-5.2 4.7L32 294.2c-.3 2 1.2 4 3.2 4h19c2.7 0 5.2-2.9 5.5-5.7l4.5-26.6c1-7.2 13.2-4.7 18-4.7 28.6 0 46.1-17 46.1-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.2 8.2-5.8-8.5-14.2-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9 0 20.2-4.9 26.5-11.9-.5 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H200c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm40.5 97.9l63.7-92.6c.5-.5.5-1 .5-1.7 0-1.7-1.5-3.5-3.2-3.5h-19.2c-1.7 0-3.5 1-4.5 2.5l-26.5 39-11-37.5c-.8-2.2-3-4-5.5-4h-18.7c-1.7 0-3.2 1.8-3.2 3.5 0 1.2 19.5 56.8 21.2 62.1-2.7 3.8-20.5 28.6-20.5 31.6 0 1.8 1.5 3.2 3.2 3.2h19.2c1.8-.1 3.5-1.1 4.5-2.6zm159.3-106.7c0-21-16.2-28-34.7-28h-39.7c-2.7 0-5.2 2-5.5 4.7l-16.2 102c-.2 2 1.3 4 3.2 4h20.5c2 0 3.5-1.5 4-3.2l4.5-29c1-7.2 13.2-4.7 18-4.7 28.4 0 45.9-17 45.9-45.8zm84.2 8.8h-19c-3.8 0-4 5.5-4.3 8.2-5.5-8.5-14-10-23.7-10-24.5 0-43.2 21.5-43.2 45.2 0 19.5 12.2 32.2 31.7 32.2 9.3 0 20.5-4.9 26.5-11.9-.3 1.5-1 4.7-1 6.2 0 2.3 1 4 3.2 4H484c2.7 0 5-2.9 5.5-5.7l10.2-64.3c.3-1.9-1.2-3.9-3.2-3.9zm47.5-33.3c0-2-1.5-3.5-3.2-3.5h-18.5c-1.5 0-3 1.2-3.2 2.7l-16.2 104-.3.5c0 1.8 1.5 3.5 3.5 3.5h16.5c2.5 0 5-2.9 5.2-5.7L544 191.2v-.3zm-90 51.8c-12.2 0-21.7 9.7-21.7 22 0 9.7 7 15 16.2 15 12 0 21.7-9.2 21.7-21.5.1-9.8-6.9-15.5-16.2-15.5z" /></svg>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex-auto w-[50%]">
                    <div className=''>
                        <h1 className='text-md  font-medium'>Customer Service</h1>
                        <div className="flex flex-col mt-4 justify-between text-sm items-start gap-3">
                            <Link to="/our-story" className='hover:'>Our Story</Link>
                            <Link to="/return-policy" className='hover:'>Return Policy</Link>
                            <p className='hover:'>Epress Delivery</p>
                            <p className='hover:'>Pay and Pick up</p>
                        </div>
                    </div>
                </div>
                {/*  */}

            </div>
            <hr className='mt-10 border-[#999999]' />
            <div className="flex flex-row justify-between items-center pt-10 pb-5 w-full">
                <p className='text-sm'>© {currentYear} Just Own It. All Rights Reserved.</p>
            </div>
            {/* SEO Optimization for Footer */}
            <Helmet>
                {/* Metadata */}
                <meta name="description" content="Just Own It is a first of its kind asset-financing platform that bridges the gap between financial institutions, customers and Original Equipment Manufacturers (OEMs). In line with the mission to ensure products and services are accessible, affordable and usable across Africa, we have implemented an Asset Financing technology solution to ensure a stable supply of assets with minimal hassles in order to ease your journey to acquisition." />
                <meta name="keywords" content="footer, website footer, Just own it footer" />
                <meta name="author" content="Adam Jamiu" />

                {/* Structured Data Markup */}
                <script type="application/ld+json">
                    {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",,
              "name": "TD Africa",
              "description": "TD Africa commenced business in May 1999 as the pioneer ICT distributor in West Africa and currently representsHP, Microsoft, APC by Schneider Electric, IBM, Huawei, Dell Technologies, Cisco, D-Link, Checkpoint, Huawei, Lenovo, Philips, Infinix, Tecno, Oppo, Vivo, Logitech, Nokia, Bosch, Vertiv, Samsung, Zebra, and Mercury.
              As the first manufacturer-accredited local distributor for the sub-region, TD, with the support of the OEMs, successfully confronted the myriad challenges posed by the hitherto unstructured market. Among the first measures was the formulation of a clear policy on the channel of distribution that led to the adoption of the prevailing four-tier market structure comprising Manufacturer (OEM), Distributor, Reseller and End-User.
              This development, coupled with TD's high stocking capability, brought relief to all stakeholders by ending decades of problematic reliance on foreign distributors with no local value add.",
              "url": "https://tdafrica.com/",
              "logo": "https://store.tdafrica.com/pub/media/logo/stores/1/1z4gQKBOktEdu6qqqLMT1NI3RsNGeCxnJ.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2349029174191",
                "contactType": "customer service",
                "areaServed": "NGN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.twitter.com/Td_africa1/",
                "http://www.facebook.com/tdafrica1",
                "https://instagram.com/tdafrica",
                "https://www.youtube.com/channel/UCdSRItLHtTlyc8sVamS98AA",
                "https://www.linkedin.com/company/tdafrica
              ]
            }
          `}
                </script>
            </Helmet>
        </footer>
    );
}

export default Footer;