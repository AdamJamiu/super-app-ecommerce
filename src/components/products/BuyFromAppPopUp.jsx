import { CloseTwoTone } from "@mui/icons-material";
import {  Modal } from "@mui/material"
import logo from "../../assets/images/logo.jpg"
// import { useNavigate } from "react-router-dom";

const BuyFromAppPopUp = ({ open, onClose }) => {
    const isClicked = localStorage.getItem('isClicked')

    const handleClick = () => {
        localStorage.setItem('isClicked', true)
        // navigate('https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp', '_blank')
        window.open('https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp', '_blank')
        onClose()
    }

    const isAndroid = navigator.userAgent.toLowerCase().includes('android');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const getLink = () => {
        if (isAndroid) {
            handleClose()
            localStorage.setItem('isClicked', true)
            window.open('https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp', '_blank');
            return
        } else if (isIOS) {
            handleClose()
            localStorage.setItem('isClicked', true)

            window.open('https://apps.apple.com/app/joi/id6459510124', '_blank');
            return
        } else {
            handleClose()
            localStorage.setItem('isClicked', true)
            // Default link for other platforms
            window.open('https://play.google.com/store/apps/details?id=com.TDAfrica.justownitapp', '_blank');
            return
        }
    }

    const handleClose = () => {
        localStorage.setItem('isClicked', true)
        onClose()
    }

    if (window.innerWidth >= 468 || isClicked === "true") return null;

    return (
        <Modal
            open={open}
            // onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex flex-col items-center justify-center w-full h-[280px] bg-white rounded-t-3xl shadow-md px-5 fixed bottom-0 pb-10">
                <div className="flex flex-col justify-between items-center w-full py-10">
                    <img src={logo} alt="logo" className="w-24 m-auto rounded-full flex-1" />
                    <div className="flex-2 w-full">
                        <h1 className="font-semibold text-lg text-center">Buy from our app</h1>
                        <p className="text-center text-secondary">Get the best experience by buying from our app</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-4">
                    <button onClick={handleClose} className="bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded-md w-full">Not now</button>
                    <button onClick={getLink} className="search-btn text-white px-5 py-2 rounded-md w-full">Download</button>
                </div>
                {/* <div className="absolute top-2 right-2">
                    <IconButton onClick={handleClick}>
                        <CloseTwoTone />
                    </IconButton>
                </div> */}
            </div>
        </Modal>
    )
}

export default BuyFromAppPopUp;