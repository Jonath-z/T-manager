import React, { useState } from 'react';
import { useTasks } from '../../../../contexts/task';
import { ITasks } from '../../../../types';
import { decrypt } from '../../../../utils/helpers/cryptoJS';
import { localStorageGet } from '../../../../utils/helpers/localStorage';
import TaskDetails from './TaskDetails';
import TaskContainer from './TasksContainer';
import Progress from './Progress';

const token = localStorageGet('to_do_token_');
const email = decrypt(token as string);

const Tasks = () => {
  const [isViewTask, setIsViewTask] = useState(false);
  const [isTaskContainer, setIsTaskContainer] = useState(true);
  const [taskDetails, setTaskDetails] = useState<ITasks>();
  const { tasks } = useTasks();

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
      <Progress
        tasks={tasks}
        userTasks={userTasks}
        toggleTaskDetails={toggleTaskDetails}
        toggleTaskContainer={toggleTaskContainer}
      />
      <p className="text-white text-2xl px-8 font-Mulish font-extrabold">
        Task
        {toDayTasks.length !== 0 && toDayTasks.length === 1
          ? ''
          : 's'}{' '}
        ({toDayTasks.length})
      </p>
      {isViewTask && (
        <TaskDetails
          task={taskDetails}
          toggleTaskDetails={toggleTaskDetails}
        />
      )}
      {isTaskContainer && (
        <TaskContainer
          toggleTaskDetails={(e) => {
            assignTaskData(e);
            setIsViewTask(!isViewTask);
          }}
          toDayTasks={toDayTasks}
        />
      )}
    </>
  );
};

export default React.memo(Tasks);
