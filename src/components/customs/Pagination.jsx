import React from 'react';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-7 mb-2 text-sm">
            <ul className="flex space-x-2">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            className={`w-7 h-7 rounded-full ease transition-all focus:outline-none 
                ${currentPage === pageNumber
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white hover:bg-blue-200 text-blue-500'}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomPagination;