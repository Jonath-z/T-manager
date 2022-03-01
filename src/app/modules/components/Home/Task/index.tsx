import React, { useRef } from 'react';
import { ITasks } from '../../../../types';
import useIsVisibleOnScreen from '../../../../hooks/useIsVisibleOnScreen';
import web3Service from '../../../../services/web3';

interface IProps {
  name: string | undefined;
  tasks: ITasks[];
}

const Tasks = ({ tasks }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useIsVisibleOnScreen(
    {
      root: ref.current as HTMLDivElement,
      rootMargin: '0px',
      threshold: 1,
    },
    ref.current?.childNodes as NodeList,
  );

  const toggleInputCheck = (e: any) => {
    (async () => {
      await web3Service.updateTaskStatus(e.target.value);
    })();
  };

  return (
    <div
      ref={ref}
      className="root px-8 mt-10 absolute bottom-0 left-0 right-0 top-1/2 overflow-y-scroll py-5"
    >
      {tasks.map((userTask, index) => {
        return (
          <div
            key={`index_${index}`}
            className={`tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 flex items-center  bg-opacity-70`}
          >
            <input
              type="checkbox"
              value={userTask.id}
              onChange={toggleInputCheck}
              name="task"
              className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
              checked={userTask.completed}
            />
            <label
              htmlFor="task"
              className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
            >
              {userTask.title}
              <span className="text-xs text-slate-200">
                {userTask.start_time} up to {userTask.end_time}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
