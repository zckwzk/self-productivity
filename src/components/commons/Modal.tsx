import React from 'react'
import ctl from "@netlify/classnames-template-literals";

interface ModalProps {
    show: boolean,
    toggleModal: () => void
}

export default function Modal({ show, toggleModal }: ModalProps) {
    const modalContainer = ctl(`
        w-full 
        h-full 
        bg-transparent 
        top-0 
        absolute
        transition-all duration-500
        ${!show && "hidden"}
    `);

    const modalBody = ctl(`sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFEB] rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute transition-all duration-500 ${!show && "hidden"}`)
    return (
        <div className="w-full h-full">
            <div onClick={() => toggleModal()} id="modal-bg" className={modalContainer}></div>
            <div id="modal-box" className={modalBody}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7" />
                </svg> */}
                <span className="text-2xl font-medium">Payment Successful</span>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, consequatur?</p>
                <button id="modal-close" className="p-3 bg-[#4F46E5] rounded-lg w-full text-white">Click Background</button>
            </div>
        </div>
    )
}
