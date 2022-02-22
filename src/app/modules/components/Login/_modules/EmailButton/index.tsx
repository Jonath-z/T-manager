import React from "react";
import { AiOutlineMail } from 'react-icons/ai';
import { signInwithPopup } from "../../../../../auth";
import {useNavigate } from 'react-router-dom';

const EmailButton = () => {
    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const res = await signInwithPopup();
            navigate('/home');
            console.log(res.user?.displayName, res.user?.email);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="fixed bottom-10 left-0 right-5 w-full">
            <button
                className="
                 py-5 rounded-md bg-gradient-to-l w-full
                from-violet-700 to-blue-500 text-white
                 flex  justify-center items-center font-Mulish"
                
                onClick={signIn}
            >
                <AiOutlineMail className='mx-5' />
                Continue with email
            </button>
        </div>
    );
}

export default EmailButton;