import React, { useEffect, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { FaEthereum } from 'react-icons/fa';
import { useSweepDown } from '../../../../contexts/sweepDown';
import useWeb3 from '../../../../hooks/useWeb3';
import { useUsers } from '../../../../contexts/users';
import { localStorageGet } from '../../../../utils/helpers/localStorage';
import { decrypt } from '../../../../utils/helpers/cryptoJS';

const Menu = () => {
  const [balance, setBalance] = useState('');
  const {
    frameContainer,
    frame,
    sweepDown,
    onTouchStart,
    onTouchend,
    onTouchmouve,
  } = useSweepDown();
  const { getBalance, account } = useWeb3();
  const { users } = useUsers();

  useEffect(() => {
    (async () => {
      const balance = await getBalance();
      const intBalance = Number(balance);
      const reducedLength = intBalance / Math.pow(10, 18);
      setBalance(balance);
    })();
  }, []);

  const token = localStorageGet('to_do_token_');
  const email = decrypt(token as string);

  const user = users.filter((user) => user.email === email)[0];

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10"
      id="taskFrameContainer"
      ref={frameContainer}
    >
      <div
        className="home fixed bottom-0 left-0 right-0 top-40 rounded-t-3xl pt-5 overflow-y-scroll"
        id="taskFrame"
        ref={frame}
      >
        <div
          ref={sweepDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchmouve}
          onTouchEnd={onTouchend}
          id="sweepDown"
        >
          <AiOutlineMinus className="mx-auto text-slate-500 text-2xl font-Mulish" />
        </div>
        <p className="font-Mulish font-extrabold text-3xl text-white py-5 px-5">
          User Information
        </p>
        <div className="addButton flex flex-col justify-between h-32 mx-8 rounded-lg">
          <p className="flex justify-between items-center px-5 py-5">
            <span className=" px-2 py-2 rounded-full home text-white shadow-md">
              <FaEthereum className="text-2xl" />
            </span>
            <span className="text-white">
              {balance}
              ETH
            </span>
          </p>
          <p className="text-[10px] px-5 py-5 text-white">
            ID: {account}
          </p>
        </div>
        <p className="text-white font-Mulish pt-5 px-8">
          Email: {user.email}
        </p>
        <p className="text-white font-Mulish py-2 px-8">
          Names: {user.name}
        </p>
        <p className="text-white font-Mulish pt-4 px-5 font-extrabold text-3xl">
          Option
        </p>
        <p className="font-Mulish py-2 px-8 text-white">
          <a href="/">Log out</a>
        </p>
      </div>
    </div>
  );
};

export default Menu;
