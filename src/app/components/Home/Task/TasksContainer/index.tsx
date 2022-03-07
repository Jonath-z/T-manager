import React, { useRef } from 'react';
import { ITasks } from '../../../../types';
import useWeb3 from '../../../../hooks/useWeb3';
import { useTasks } from '../../../../contexts/task';
import useIsVisibleOnScreen from '../../../../hooks/useIsVisibleOnScreen';
import TaskCard from '../__modules/TaskCard';
import useResponsive from '../../../../hooks/useResponsive';
import Clock from 'react-live-clock';

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
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  const date = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat'];

  const updateStatus = (e: any) => {
    (async () => {
      await updateTaskStatus(e.target.value);
      toggleTaskStatus(e.target.value);
    })();
  };

  return (
    <div className="2xl:flex 2xl:flex-col 2xl:w-full">
      <div
        ref={ref}
        className="root px-8 mt-9 absolute 2xl:relative bottom-0 left-0 right-0 top-1/2
         2xl:top-[unset] overflow-y-scroll py-1 pb-10 2xl:mt-0 scrollbar 
         2xl:scrollbar-thumb-gray-100 2xl:scrollbar-track-gray-900 scrollbar-thin"
      >
        {isDesk && (
          <p className="text-white text-2xl font-Mulish font-extrabold">
            Task
            {toDayTasks.length !== 0 && toDayTasks.length === 1
              ? ''
              : 's'}{' '}
            ({toDayTasks.length})
          </p>
        )}
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
