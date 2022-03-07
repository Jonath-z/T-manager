import React from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { useSweepDown } from '../../../contexts/sweepDown';

interface IProps {
  name: string | undefined;
  profile: string | undefined;
}

const Header = ({ name, profile }: IProps) => {
  const { toggleMenuFrame } = useSweepDown();
  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="py-5 flex justify-around items-center">
      <RiMenu4Line
        className="float-left  text-3xl text-white"
        onClick={toggleMenuFrame}
      />
      <p className="flex flex-col text-center">
        <span className="text-sm font-Mulish text-slate-400">
          Hi {name}
        </span>
        <span className="font-Mulish font-bold text-white">
          {days[date.getDay()]} {date.getDate()}-
          {(date.getMonth() + 101).toString().substring(1)}-
          {date.getFullYear()}
        </span>
      </p>
      <img
        src={profile}
        alt="profile"
        className="rounded-full w-12"
      />
    </div>
  );
};

export default Header;
