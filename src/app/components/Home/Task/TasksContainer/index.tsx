/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { ITasks } from '../../../../types';
import useWeb3 from '../../../../hooks/useWeb3';
import { useTasks } from '../../../../contexts/task';
import useIsVisibleOnScreen from '../../../../hooks/useIsVisibleOnScreen';
import TaskCard from '../__modules/TaskCard';

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
    (async () => {
      await updateTaskStatus(e.target.value);
      toggleTaskStatus(e.target.value);
    })();
  };

  return (
    <div className="flex flex-col w-full absolute top-[22rem] bottom-0 left-0 right-0 2xl:relative 2xl:top-0">
      <p className="text-white text-2xl font-Mulish font-extrabold pl-6 md:pl-[6rem]">
        Task
        {toDayTasks.length !== 0 && toDayTasks.length === 1
          ? ''
          : 's'}{' '}
        ({toDayTasks.length})
      </p>
      <div
        ref={ref}
        className="root px-8 mt-3 2xl:relative bottom-0 left-0 right-0 md:px-[6rem]
         2xl:top-[unset] overflow-y-auto py-1 pb-10 2xl:mt-0 scrollbar 
         2xl:scrollbar-thumb-gray-100 2xl:scrollbar-track-gray-900 scrollbar-thin"
      >
        {toDayTasks
          .map((userTask, index) => {
            return (
              <TaskCard
                task={userTask}
                index={index}
                onChange={updateStatus}
                onClick={toggleTaskDetails}
                allowOnChange={true}
                readonly={false}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default TaskContainer;
