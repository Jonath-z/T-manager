/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import TaskDetails from '../../Task/__modules/TaskDetails';
import { AiOutlineMinus } from 'react-icons/ai';
import { useSweepDown } from '../../../../contexts/sweepDown';
import { localStorageGet } from '../../../../utils/helpers/localStorage';
import { decrypt } from '../../../../utils/helpers/cryptoJS';
import { useTasks } from '../../../../contexts/task';
import useResponsive from '../../../../hooks/useResponsive';
import { stringify } from 'flatted';

interface IProps {
  inputValue: string;
}

const SearchTaskFrame = ({ inputValue }: IProps) => {
  const token = localStorageGet('to_do_token_');

  const email = () => token !== null && decrypt(token as string);
  const {
    frameContainer,
    frame,
    sweepDown,
    onTouchStart,
    onTouchend,
    onTouchmouve,
  } = useSweepDown();
  const [taskDetails, setTaskDetails] = useState();
  const [isTaskDetails, setIsTaskDetails] = useState(false);
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  const { tasks } = useTasks();
  const userTasks = tasks.filter(
    (task) => task.owner_email === email(),
  );

  const search = () => {
    const taskList = document.getElementsByClassName(
      'tasks',
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < taskList.length; i++) {
      const taskLabel = taskList[i].querySelectorAll('.taskLabel')[0];
      if (taskLabel !== undefined) {
        //   eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const labelText = taskLabel.children[0].innerHTML!;
        if (
          labelText.toUpperCase().indexOf(inputValue.toUpperCase()) >
          -1
        ) {
          taskList[i].style.display = 'flex';
        } else {
          taskList[i].style.display = 'none';
        }
      }
    }
  };
  search();

  const setTaskData = (e: any) => {
    const viewedTask = JSON.parse(e.target.getAttribute('data-task'));
    setTaskDetails(viewedTask);
    setIsTaskDetails(!isTaskDetails);
  };

  const toggleTaskDetails = () => {
    setIsTaskDetails(!isTaskDetails);
  };

  return (
    <>
      {isTaskDetails && (
        <TaskDetails
          task={taskDetails}
          toggleTaskDetails={toggleTaskDetails}
        />
      )}
      <div
        className="absolute top-40 bottom-0 left-0 right-0 z-10 overflow-y-auto
         rounded-t-3xl home 2xl:relative 2xl:top-0 2xl:w-[32rem] 2xl:mr-8 2xl:overflow-hidden 2xl:rounded-3xl"
        id="searchFrameContainer"
        ref={frameContainer}
      >
        <div
          className="rounded-t-3xl py-5 2xl:h-[80vh]  2xl:overflow-y-auto 2xl:scrollbar-thumb-gray-100 2xl:scrollbar-track-gray-900 scrollbar-thin md:px-[6rem]"
          ref={frame}
        >
          {!isDesk && (
            <div
              ref={sweepDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchmouve}
              onTouchEnd={onTouchend}
              id="sweepDown"
            >
              <AiOutlineMinus className="mx-auto text-slate-500 text-2xl font-Mulish" />
            </div>
          )}
          {userTasks
            .map((task, index) => {
              return (
                <div
                  key={`index_${index}`}
                  data-task={stringify(task)}
                  className={`tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 mx-8 flex items-center  bg-opacity-70`}
                >
                  <input
                    type="checkbox"
                    value={task.id}
                    readOnly
                    name="task"
                    className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
                    checked={task.completed}
                  />
                  <label
                    htmlFor="task"
                    className="taskLabel pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
                  >
                    <span>{task.title}</span>
                    <span
                      className="text-xs text-slate-200 pr-1 cursor-pointer"
                      data-task={JSON.stringify(task)}
                      onClick={setTaskData}
                    >
                      view
                    </span>
                  </label>
                </div>
              );
            })
            .reverse()}
        </div>
      </div>
    </>
  );
};

export default SearchTaskFrame;
