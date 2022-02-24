import React, { useMemo } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';

interface IProps {
  toggleFrame: () => void;
}

const AddTaskFrame = ({ toggleFrame }: IProps) => {
  const taskFrame = document.getElementById('taskFrame');
  const sweepDown = document.getElementById('sweepDown');
  const taskFrameContainer = document.getElementById(
    'taskFrameContainer',
  );

  const windowHeight = window.innerHeight;
  console.log('window height', windowHeight);

  const origin = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );

  const destination = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );

  if (sweepDown !== null)
    sweepDown.addEventListener('touchstart', (e) => {
      e.preventDefault();
      origin.y = e.touches[0].clientY;
      origin.x = e.touches[0].clientX;
    });

  sweepDown?.addEventListener('touchmove', (e) => {
    e.preventDefault();

    destination.y = e.touches[0].clientY;
    destination.x = e.touches[0].clientX;
    const directionY = destination.y - origin.y;
    const directionX = destination.x - origin.x;

    if (Math.sign(e.touches[0].clientY) == -1) {
      sweepDown.removeEventListener('touchmove', () => {
        if (taskFrameContainer !== null)
          taskFrameContainer.style.transform = `translateY(0px)`;
      });
      return;
    }
    if (Math.abs(directionY) < Math.abs(directionX)) {
      sweepDown.removeEventListener('touchmove', () => {
        if (taskFrameContainer !== null)
          taskFrameContainer.style.transform = `translateY(0px)`;
      });
      return;
    }
    if (taskFrameContainer !== null)
      taskFrameContainer.style.transform = `translateY(${e.touches[0].clientY}px)`;
  });

  taskFrame?.addEventListener('touchend', () => {
    console.log(origin.y, 'origin');
    console.log(destination.y, 'destination');
    if (destination.y - origin.y >= 300) {
      while (destination.y < windowHeight) {
        const translateY = (destination.y += 1);
        console.log(translateY);
        if (taskFrameContainer !== null)
          taskFrameContainer.style.transform = `translateY(${translateY}px)`;
      }
      if (destination.y === windowHeight) {
        origin.y = 0;
        destination.y = 0;
        toggleFrame();
      }
    } else {
      if (taskFrameContainer !== null)
        taskFrameContainer.style.transform = `translateY(0px)`;
    }
  });

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
      id="taskFrameContainer"
    >
      <div
        className="home fixed bottom-0 left-0 right-0 top-32 rounded-t-3xl pt-5 overflow-y-scroll"
        id="taskFrame"
      >
        <AiOutlineMinus
          className="mx-auto text-slate-500 text-2xl font-Mulish"
          id="sweepDown"
        />
        <p className="font-Mulish font-extrabold text-white text-3xl px-5 py-5">
          Add New Task
        </p>
        <div>
          <p className="text-white font-Mulish px-5 pt-2">Title</p>
          <input
            type="text"
            placeholder="Title"
            className="py-2 ml-5 bg-transparent border-b border-slate-500 outline-none text-gray-200 w-11/12"
          />
          <p className="text-white font-Mulish px-5 pt-3">Content</p>
          <input
            type="text"
            placeholder="Task content"
            className="py-2 ml-5 bg-transparent  resize-none border-b border-slate-500 outline-none text-gray-200 w-11/12"
          />
          <p className="text-white font-Mulish px-5 pt-2">Date</p>
          <input
            type="date"
            className="py-2 ml-5 bg-transparent border-b border-slate-500 outline-none text-gray-200 w-11/12"
          />
          <div className="flex justify-around my-5">
            <div>
              <p className="text-white font-Mulish">Start Time</p>
              <input
                type="time"
                placeholder="time"
                className="bg-transparent border-b border-slate-500 outline-none text-gray-200"
              />
            </div>
            <div>
              <p className="text-white font-Mulish">End Time</p>
              <input
                type="time"
                placeholder="time"
                className="bg-transparent border-b border-slate-500 outline-none text-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="my-8 w-fit mx-auto">
          <button className="loginButton text-white py-5 w-full px-20 rounded-lg mr-5">
            Add the task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskFrame;
