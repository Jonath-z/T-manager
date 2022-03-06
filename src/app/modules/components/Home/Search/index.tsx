import React from 'react';
import { useSweepDown } from '../../../../contexts/sweepDown';

interface IProps {
  onChange: (e: any) => void;
}

const SearchBar = ({ onChange }: IProps) => {
  const { setIsSearchFrameOpened } = useSweepDown();
  return (
    <div className="text-center mx-8 py-2">
      <input
        onFocusCapture={() => setIsSearchFrameOpened(true)}
        onChange={onChange}
        type="search"
        placeholder="&#x1F50E; Search"
        className="w-full py-3 px-5 rounded-lg bg-slate-600 text-white font-Mulish"
      />
    </div>
  );
};

export default SearchBar;
