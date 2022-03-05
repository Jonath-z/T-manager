import React from 'react';
import { ITasks } from '../../../../../types';

interface IProps {
  progressedTasks: ITasks;
  toggleTaskDetails: () => void;
}

const ProgressView = ({
  progressedTasks,
  toggleTaskDetails,
}: IProps) => {
  return (
    <div
      key={`index_${progressedTasks.id}`}
      className={`tasks taskDetailsContainer py-5 px-2 rounded-lg mt-3 flex items-center  bg-opacity-70`}
    >
      <input
        type="checkbox"
        value={progressedTasks.id}
        name="task"
        className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
        checked={progressedTasks.completed}
      />
      <label
        htmlFor="task"
        className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
      >
        {progressedTasks.title}
        <span
          className="text-xs text-slate-200 pr-1"
          data-task={JSON.stringify(progressedTasks)}
          onClick={toggleTaskDetails}
        >
          view
        </span>
      </label>
    </div>
  );
};

export default ProgressView;
