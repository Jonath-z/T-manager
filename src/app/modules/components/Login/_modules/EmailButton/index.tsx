import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { signInwithPopup } from '../../../../../auth';
import { useNavigate } from 'react-router-dom';
import web3Service from '../../../../../services/web3';
import { useUsers } from '../../../../../contexts/users';
import { localStorageSet } from '../../../../../utils/helpers/localStorage';
import { crypt } from '../../../../../utils/helpers/cryptoJS';

const EmailButton = () => {
  const navigate = useNavigate();
  const users = useUsers();

  console.log('users', users);

  const generateToken = (email: string) => {
    const token = crypt(email);
    localStorageSet('to_do_token_', token);
    return token;
  };

  const signIn = async () => {
    try {
      const res = await signInwithPopup();
      users.forEach(async (user) => {
        console.log('user', user);

        if (user.email !== res.user?.email) {
          try {
            await web3Service.createUser(
              res.user?.displayName,
              res.user?.email,
              res.user?.photoURL,
            );

            generateToken(res.user?.email as string);
            navigate(`/home`);
          } catch (err) {
            alert('fail to login');
            throw err;
          }
        } else {
          navigate(`/home`);
          console.log('user exist');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bottom-10 mx-5 h-full py-10">
      <button
        className="loginButton px-10 flex justify-center items-center rounded-md font-Mulish font-bold text-white py-5 w-full"
        onClick={signIn}
      >
        <AiOutlineMail className="mx-5" />
        <span>Continue with email</span>
      </button>
    </div>
  );
};

export default EmailButton;
