/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useSweepDown } from '../../../contexts/sweepDown';

interface IProps {
  onChange: (e: any) => void;
}

const SearchBar = ({ onChange }: IProps) => {
  const { setIsSearchFrameOpened } = useSweepDown();
  return (
    <div className="text-center 2xl:text-right mx-8 py-2 md:mx-[6rem]">
      <input
        onFocusCapture={() => setIsSearchFrameOpened(true)}
        onChange={onChange}
        type="search"
        placeholder="&#x1F50E; Search"
        className="w-full 2xl:w-96 py-3 px-5 rounded-lg bg-slate-600 text-white font-Mulish"
      />
    </div>
  );
};

export default SearchBar;
