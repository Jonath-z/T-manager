import React from 'react';
import { auth, provider } from '../../../../auth';
import { getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../../contexts/users';
import { localStorageSet } from '../../../../utils/helpers/localStorage';
import { crypt } from '../../../../utils/helpers/cryptoJS';
import useWeb3 from '../../../../hooks/useWeb3';
import { FaGoogle } from 'react-icons/fa';

const EmailButton = () => {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { createUser } = useWeb3();

  const generateToken = (email: string) => {
    const token = crypt(email);
    localStorageSet('to_do_token_', token);
    return token;
  };

  const userExists = (email: string): boolean => {
    return users.some((user) => {
      return user.email === email;
    });
  };

  const signUp = () => {
    signInWithRedirect(auth, provider);
  };

  const signIn = async () => {
    const res = await getRedirectResult(auth);

    if (res)
      if (userExists(res.user?.email as string)) {
        generateToken(res.user?.email as string);
        navigate(`/home`);
      } else {
        await createUser(
          res.user?.displayName,
          res.user?.email,
          res.user?.photoURL,
        );
        generateToken(res.user?.email as string);
        navigate(`/home`);
      }
  };

  return (
    <div className="bottom-10 mx-5 h-full py-10 ">
      <button
        className="loginButton px-10 flex justify-center items-center rounded-md font-Mulish font-bold text-white py-5 w-full 2xl:w-96 2xl:m-auto"
        onClick={signIn}
      >
        <FaGoogle className="mx-5" />
        <span>Log in with Google</span>
      </button>
      <span className="text-white flex justify-between items-center font-Mulish py-1">
        <hr className="w-20" />
        or
        <hr className="w-20" />
      </span>
      <button
        className="2xl:px-10 bg-cyan-800 md:px-5 flex justify-center items-center rounded-md font-Mulish font-bold text-white py-5 w-full 2xl:w-96 2xl:m-auto"
        onClick={signUp}
      >
        <FaGoogle className="mx-5" />
        <span>Sign up with Google</span>
      </button>
    </div>
  );
};

export default EmailButton;
