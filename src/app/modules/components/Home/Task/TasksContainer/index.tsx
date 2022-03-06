import React, { useRef } from 'react';
import { ITasks } from '../../../../../types';
import useWeb3 from '../../../../../hooks/useWeb3';
import { useTasks } from '../../../../../contexts/task';
import useIsVisibleOnScreen from '../../../../../hooks/useIsVisibleOnScreen';
import TaskCard from '../_modules/TaskCard';

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
    <div
      ref={ref}
      className="root px-8 mt-9 absolute bottom-0 left-0 right-0 top-1/2 overflow-y-scroll py-1 pb-10"
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
  );
};

export default TaskContainer;
