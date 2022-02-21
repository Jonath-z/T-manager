import React from "react";
import {AiOutlineMail } from 'react-icons/ai';

const EmailButton = () => {
    return (
        <div className="fixed bottom-10 left-0 right-5 w-full">
            <button
                className="
                 py-5 rounded-md bg-gradient-to-l w-full
                from-violet-700 to-blue-500 text-white
                 flex  justify-center items-center font-Mulish"
            >
                <AiOutlineMail className='mx-5' />
                Continue with email
            </button>
        </div>
    );
}

export default EmailButton;