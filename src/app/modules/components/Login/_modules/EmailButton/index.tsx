import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { signInwithPopup } from '../../../../../auth';
import { useNavigate } from 'react-router-dom';
import web3Service from '../../../../../utils/services/web3';
import { useUsers } from '../../../../../contexts/users';

const EmailButton = () => {
  const navigate = useNavigate();
  const users = useUsers();

  console.log('users', users);

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
            );
            navigate('/home');
          } catch (err) {
            alert('fail to login');
            throw err;
          }
        } else {
          navigate('/home');
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
