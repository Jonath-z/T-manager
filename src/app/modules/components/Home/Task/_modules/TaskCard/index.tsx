import React from 'react';
import { ITasks } from '../../../../../../types';

interface IProps {
  task: ITasks;
  index: number;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
  allowOnChange: boolean;
  readonly: boolean;
}

const TaskCard = ({
  task,
  index,
  onChange,
  onClick,
  allowOnChange,
  readonly,
}: IProps) => {
  return (
    <div
      key={`index_${index}`}
      className={`tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 flex items-center  bg-opacity-70`}
    >
      <input
        type="checkbox"
        value={task.id}
        onChange={(e) => allowOnChange && onChange(e)}
        readOnly={readonly}
        name="task"
        className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
        checked={task.completed}
      />
      <label
        htmlFor="task"
        className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
      >
        {task.title}
        <span
          className="text-xs text-slate-200 pr-1"
          data-task={JSON.stringify(task)}
          onClick={onClick}
        >
          view
        </span>
      </label>
    </div>
  );
};

export default TaskCard;
