import React from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';

interface IProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: IProps) => {
  return (
    <button
      className="addButton px-5 py-5 rounded-full absolute bottom-10 right-10 text-white shadow-2xl shadow-black z-10"
      onClick={onClick}
    >
      <HiOutlinePlusSm className="text-2xl" />
    </button>
  );
};

export default AddButton;
