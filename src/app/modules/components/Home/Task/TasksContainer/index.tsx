import React, { useRef } from 'react';
import { ITasks } from '../../../../../types';
import useWeb3 from '../../../../../hooks/useWeb3';
import { useTasks } from '../../../../../contexts/task';
import useIsVisibleOnScreen from '../../../../../hooks/useIsVisibleOnScreen';

interface IProps {
  toDayTasks: ITasks[];
  toggleTaskDetails: (e: any) => void;
}

const TaskContainer = ({ toDayTasks, toggleTaskDetails }: IProps) => {
  const { updateTaskStatus } = useWeb3();
  const { toggleTaskStatus } = useTasks();
  const ref = useRef<HTMLDivElement>(null);
  useIsVisibleOnScreen(
    {
      root: ref.current as HTMLDivElement,
      rootMargin: '0px',
      threshold: 1,
    },
    ref.current?.childNodes as NodeList,
  );

  const updateStatus = (e: any) => {
    console.log(e.target.value);
    (async () => {
      await updateTaskStatus(e.target.value);
      toggleTaskStatus(e.target.value);
    })();
  };

  return (
    <div
      ref={ref}
      className="root px-8 mt-9 absolute bottom-0 left-0 right-0 top-1/2 overflow-y-scroll py-1 pb-10"
    >
      {toDayTasks
        .map((userTask, index) => {
          return (
            <div
              key={`index_${index}`}
              className={`tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 flex items-center  bg-opacity-70`}
            >
              <input
                type="checkbox"
                value={userTask.id}
                onChange={updateStatus}
                name="task"
                className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
                checked={userTask.completed}
              />
              <label
                htmlFor="task"
                className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
              >
                {userTask.title}
                <span
                  className="text-xs text-slate-200 pr-1"
                  data-task={JSON.stringify(userTask)}
                  onClick={toggleTaskDetails}
                >
                  view
                </span>
              </label>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default TaskContainer;
