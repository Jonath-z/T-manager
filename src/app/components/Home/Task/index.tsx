import React, { useState } from 'react';
import { useTasks } from '../../../contexts/task';
import { ITasks } from '../../../types';
import { decrypt } from '../../../utils/helpers/cryptoJS';
import { localStorageGet } from '../../../utils/helpers/localStorage';
import TaskDetails from './__modules/TaskDetails';
import TaskContainer from './TasksContainer';
import Progress from './Progress';
import SearchTaskFrame from '../Frames/Search';
import { useSweepDown } from '../../../contexts/sweepDown';
import useResponsive from '../../../hooks/useResponsive';

const token = localStorageGet('to_do_token_');
const email = decrypt(token as string);

interface IProps {
  inputValue: string;
}

const Tasks = ({ inputValue }: IProps) => {
  const [isViewTask, setIsViewTask] = useState(false);
  const [isTaskContainer, setIsTaskContainer] = useState(true);
  const [taskDetails, setTaskDetails] = useState<ITasks>();
  const { tasks } = useTasks();
  const { isSearchFrameOpened } = useSweepDown();
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  const userTasks = tasks.filter(
    (task) => task.owner_email === email,
  );

  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  };

  const toDayTasks = userTasks.filter(
    (task) => task.date === formatDate(new Date()),
  );

  const assignTaskData = (e: any) => {
    const viewedTask = JSON.parse(e.target.getAttribute('data-task'));
    setTaskDetails(viewedTask);
  };

  const toggleTaskDetails = () => {
    setIsViewTask(!isViewTask);
  };

  const toggleTaskContainer = () => {
    setIsTaskContainer(!isTaskContainer);
  };

  return (
    <>
      {!isDesk && (
        <Progress
          tasks={tasks}
          userTasks={userTasks}
          toggleTaskDetails={toggleTaskDetails}
          toggleTaskContainer={toggleTaskContainer}
          setTaskDetails={assignTaskData}
        />
      )}
      {isTaskContainer && !isDesk && (
        <p className="text-white text-2xl px-8 font-Mulish font-extrabold">
          Task
          {toDayTasks.length !== 0 && toDayTasks.length === 1
            ? ''
            : 's'}{' '}
          ({toDayTasks.length})
        </p>
      )}
      {isViewTask && (
        <TaskDetails
          task={taskDetails}
          toggleTaskDetails={toggleTaskDetails}
        />
      )}
      {isTaskContainer && !isDesk && (
        <TaskContainer
          toggleTaskDetails={(e) => {
            assignTaskData(e);
            setIsViewTask(!isViewTask);
          }}
          toDayTasks={toDayTasks}
        />
      )}
      {/* Responsive */}
      {isDesk && (
        <div className="flex">
          <TaskContainer
            toggleTaskDetails={(e) => {
              assignTaskData(e);
              setIsViewTask(!isViewTask);
            }}
            toDayTasks={toDayTasks}
          />
          {isSearchFrameOpened ? (
            <SearchTaskFrame inputValue={inputValue} />
          ) : (
            <Progress
              tasks={tasks}
              userTasks={userTasks}
              toggleTaskDetails={toggleTaskDetails}
              toggleTaskContainer={toggleTaskContainer}
              setTaskDetails={assignTaskData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(Tasks);
