import React from 'react';
import loginImageCard from '../../static/loginImageCard.png';
import EmailButton from './_modules/EmailButton';

const LoginPage = (): JSX.Element => {
  return (
    <div className="pt-20 absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b to-violet-800 from-[#051125]">
      <img
        src={loginImageCard}
        alt="login-card"
        className="flex justify-center"
      />
      <p className="px-5 text-5xl pt-20 text-white font-Mulish">
        Management everything with one app
      </p>
      <EmailButton />
    </div>
  );
};

export default LoginPage;
