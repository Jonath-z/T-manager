import React, { useEffect, useState } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { useSweepDown } from '../../../../contexts/sweepDown';
import { useUsers } from '../../../../contexts/users';
import { localStorageGet } from '../../../../utils/helpers/localStorage';
import { decrypt } from '../../../../utils/helpers/cryptoJS';
import useWeb3 from '../../../../hooks/useWeb3';
import { useTasks } from '../../../../contexts/task';
import useResponsive from '../../../../hooks/useResponsive';
import useClickOutside from '../../../../hooks/useClickOutside';

interface User {
  name: string;
  email: string;
  profile: string;
  id: number;
}

interface IProps {
  onOutSideClick: () => void;
}

const AddTaskFrame = ({ onOutSideClick }: IProps) => {
  const {
    frame,
    sweepDown,
    frameContainer,
    onTouchStart,
    onTouchmouve,
    onTouchend,
  } = useSweepDown();
  const { users } = useUsers();
  const { updateAfterAddTask } = useTasks();
  const { createTask } = useWeb3();
  const [user, setUser] = useState<User>();
  const [textareaValue, setTextareaValue] = useState('');
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  const token = localStorageGet('to_do_token_');

  const getUserByEmail = (email: string) => {
    users.forEach((user) => {
      if (user.email === email) {
        setUser(user);
      }
    });
  };

  useEffect(() => {
    if (token) {
      const email = decrypt(token);
      getUserByEmail(email);
    }
  }, [users]);

  const createNewTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.currentTarget.getElementsByTagName('input');
    await createTask(
      target.namedItem('title')?.value,
      textareaValue,
      target.namedItem('startTime')?.value,
      target.namedItem('endTime')?.value,
      user?.name,
      user?.email,
      target.namedItem('date')?.value,
      '0',
    );
    await updateAfterAddTask();
    isDesk && onOutSideClick();
  };

  const getTextareaValue = (e: any) => {
    setTextareaValue(e.target.value);
  };

  const outSideRef = useClickOutside(onOutSideClick);

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10"
      id="taskFrameContainer"
      ref={!isDesk ? frameContainer : outSideRef}
    >
      <div
        className="home fixed bottom-0 left-0 right-0 top-32 rounded-t-3xl pt-5 overflow-y-auto 2xl:w-96 2xl:relative 2xl:m-auto 2xl:rounded-lg"
        id="taskFrame"
        ref={frame}
      >
        {!isDesk && (
          <div
            ref={() => isDesk && sweepDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchmouve}
            onTouchEnd={onTouchend}
            id="sweepDown"
          >
            <AiOutlineMinus className="mx-auto text-slate-500 text-2xl font-Mulish" />
          </div>
        )}
        <p className="font-Mulish font-extrabold text-white text-3xl px-5 py-5">
          Add New Task
        </p>
        <form onSubmit={createNewTask} className="">
          <div>
            <p className="text-white font-Mulish px-5 pt-2">Title</p>
            <input
              type="text"
              name="title"
              required
              placeholder="Title"
              className="py-2 ml-5 bg-transparent border-b border-slate-500 outline-none text-gray-200 w-11/12 2xl:w-80"
            />
            <p className="text-white font-Mulish px-5 pt-3">
              Content
            </p>
            <TextareaAutosize
              name="content"
              onChange={getTextareaValue}
              required
              placeholder="Task content"
              className="py-2 ml-5 bg-transparent  resize-none border-b border-slate-500 outline-none text-gray-200 w-11/12 2xl:w-80"
            />
            <p className="text-white font-Mulish px-5 pt-2">Date</p>
            <input
              type="date"
              name="date"
              className="py-2 ml-5 bg-transparent border-b border-slate-500 outline-none text-gray-200 w-11/12 2xl:w-80"
            />
            <div className="flex justify-around my-5">
              <div>
                <p className="text-white font-Mulish">Start Time</p>
                <input
                  type="time"
                  name="startTime"
                  required
                  placeholder="time"
                  className="bg-transparent border-b border-slate-500 outline-none text-gray-200"
                />
              </div>
              <div>
                <p className="text-white font-Mulish">End Time</p>
                <input
                  type="time"
                  name="endTime"
                  required
                  placeholder="time"
                  className="bg-transparent border-b border-slate-500 outline-none text-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="my-8 w-fit mx-auto">
            <button
              type="submit"
              className="loginButton text-white py-5 w-full px-20 rounded-lg mr-5"
            >
              Add the task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskFrame;
