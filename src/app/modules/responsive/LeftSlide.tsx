import React from 'react';
import { BiTask } from 'react-icons/bi';
import { MdPostAdd } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';

interface IProps {
  name: string;
  email: string;
  profile: string;
  onAddTaskClick: () => void;
}

const LeftSlide = ({ name, profile, onAddTaskClick }: IProps) => {
  return (
    <div className="flex flex-col justify-between bg-slate-600 px-10 py-5 font-Mulish rounded-r-lg">
      <div className="text-white home py-5 rounded-lg shadow-xl w-56 pl-5">
        <p className="flex items-center py-3 px-3 cursor-pointer">
          <span className="pr-3">{<BiTask />}</span>
          Task
        </p>
        <p
          className="flex items-center py-3 px-3 cursor-pointer"
          onClick={onAddTaskClick}
        >
          <span className="pr-3">{<MdPostAdd />}</span>
          Add Task
        </p>
        <a href="/">
          <p className="flex items-center py-3 px-3 cursor-pointer">
            <span className="pr-3">{<AiOutlineLogout />}</span>
            Log Out
          </p>
        </a>
        <p className="flex items-center py-3 cursor-pointer">
          <span className="px-3 py-3 addButton rounded-full">
            {<FaEthereum />}
          </span>
          <span className="pl-3">Based on Ethereum</span>
        </p>
      </div>
      <div className="flex justify-start items-center">
        <img
          src={profile}
          alt="profile"
          className="rounded-full w-12"
        />
        <div className="px-2">
          <p className="text-gray-200 text-xs w-32">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSlide;
