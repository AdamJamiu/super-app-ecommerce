import { Modal } from "@mui/material";
import vectorImg from "/images/6.jpg";
import { Link } from "react-router-dom";

const GenerateResetTokenModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="max-w-[500px] w-full bg-white rounded p-5 sm:p-10 fixed inset-0 top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] z-50 shadow-md h-fit max-h-[600px] overflow-y-auto font-satoshi">
        <img src={vectorImg} />
        <h1 className="w-full text-center font-bold text-2xl text-gray-900">
          Request Submitted
        </h1>
        <p className="text-center w-full mt-3 mb-5">
          Your will be sent a mail to complete your request.
        </p>
        <Link to="/login">
          <button
            onClick={onClose}
            className="text-center flex justify-center items-center ease transition-all hover:opacity-75 shadow-md w-full px-2 text-gray-100 rounded-sm bg-red-900 font-semibold h-10"
          >
            Done
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default GenerateResetTokenModal;
