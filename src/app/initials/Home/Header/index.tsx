import React from 'react';
import { RiMenu4Line } from 'react-icons/ri';

interface IProps {
  name: string | undefined;
}

const Header = ({ name }: IProps) => {
  const date = new Date();
  const days = ['sun', 'Tue', 'wed', 'Thu', 'Fri', 'Sat', 'Mon'];
  return (
    <div className="px-5 py-5">
      <RiMenu4Line className="float-left  text-3xl text-white" />
      <p className="flex flex-col text-center">
        <span className="text-sm font-Mulish text-slate-400">
          Hi {name}
        </span>
        <span className="font-Mulish font-bold text-white">
          {days[date.getDay() - 1]} {date.getDate()}{' '}
          {date.getFullYear()}
        </span>
      </p>
    </div>
  );
};

export default Header;
