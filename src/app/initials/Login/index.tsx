import React from 'react';
import LoginPage from '../../modules/components/Login';
import { useAccount } from '../../contexts/task';
import LoadingPage from '../../modules/components/Login/_modules/Loading';

const Login = () => {
  const { walletConnected, failedToConnect } = useAccount();
  console.log('is wallet connected', walletConnected);
  console.log('connection status', failedToConnect);

  return (
    <>
      {walletConnected && !failedToConnect ? (
        <LoginPage />
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default Login;
