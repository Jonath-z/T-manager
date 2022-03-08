import React from 'react';
import metamMask_Logo from '../../../../modules/static/metamask.png';
import { useAccount } from '../../../../contexts/task';

const LoadingPage = () => {
  const { failedToConnect } = useAccount();
  return (
    <div className="flex flex-col justify-center items-center h-full bg-[#051125]">
      <img
        src={metamMask_Logo}
        alt="metamask"
        className={
          !failedToConnect ? 'animate-pulse' : 'animate-none'
        }
      />
      <p className="py-10 font-Mulish text-white text-center">
        {!failedToConnect
          ? 'Connecting to Metamask ...'
          : 'connection To metamask failed, check if metamask is installed in your broswer'}
      </p>
    </div>
  );
};

export default LoadingPage;
