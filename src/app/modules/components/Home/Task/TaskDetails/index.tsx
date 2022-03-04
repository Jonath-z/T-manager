import React from 'react';
import { useTasks } from '../../../../../contexts/task';
import useClickOutside from '../../../../../hooks/useClickOutside';
import useWeb3 from '../../../../../hooks/useWeb3';
import { ITasks } from '../../../../../types';

interface IProps {
  task: ITasks | undefined;
  toggleTaskDetails: () => void;
}

const TaskDetails = ({ task, toggleTaskDetails }: IProps) => {
  const clickRef = useClickOutside(toggleTaskDetails);
  const { deleteTask } = useWeb3();
  const { deleteTaskInContext } = useTasks();

  return (
    <div
      ref={clickRef}
      className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 z-10 px-5 flex justify-center items-center"
    >
      <div className="taskDetailsContainer text-white px-10 py-5 rounded-lg font-Mulish">
        <p className="text-2xl py-2">{task?.title}</p>
        <p className="text-sm py-5 break-words w-60">
          {task?.content}
        </p>
        <p className="flex flex-col py-3">
          <span className="text-slate-300">{task?.date}</span>
          <span className="text-slate-300">
            from {task?.start_time} up to {task?.end_time}
          </span>
        </p>
        <button
          className="bg-red-600 py-2 w-full rounded-lg"
          onClick={() => {
            deleteTask(task?.id as number);
            deleteTaskInContext(task?.id as number);
          }}
        >
          Delete this task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
