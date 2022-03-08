/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import useProgress from '../../../../hooks/useProgress';
import { ITasks } from '../../../../types';
import { useLongPress } from 'use-long-press';
import { stringify } from 'flatted';
import useClickOutside from '../../../../hooks/useClickOutside';
import useResponsive from '../../../../hooks/useResponsive';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ProgressDetails from '../../Task/ProgressDetails';

interface IProps {
  userTasks: ITasks[];
  tasks: ITasks[];
  toggleTaskDetails: () => void;
  toggleTaskContainer: () => void;
  setTaskDetails: (e: any) => void;
}

const Progress = ({
  userTasks,
  tasks,
  toggleTaskDetails,
  toggleTaskContainer,
  setTaskDetails,
}: IProps) => {
  const [isProgressDetails, setIsProgressDetails] = useState(false);
  const progress = useProgress(tasks, userTasks);
  const isDesk = useResponsive('(min-width: 1024px)')[0];

  window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const longPressAction = () => {
    if (!isDesk) {
      toggleTaskContainer();
      setIsProgressDetails(!isProgressDetails);
    }
  };

  const longPress = useLongPress(longPressAction, {
    threshold: 500,
  });
  const outSidRef = useClickOutside(longPressAction);

  const toggleProgressDetails = (e: any) => {
    if (e.target !== undefined) {
      const target =
        e.target.parentNode.parentNode.parentNode.getElementsByClassName(
          'progressDetails',
        )[0];

      const arrowDown =
        e.target.parentNode.parentNode.parentNode.getElementsByClassName(
          'arrowDown',
        )[0];
      const arrowTop =
        e.target.parentNode.parentNode.parentNode.getElementsByClassName(
          'arrowTop',
        )[0];
      const targetStyle = target.style.display;

      targetStyle.includes('none')
        ? (target.style.display = 'block')
        : (target.style.display = 'none');

      if (arrowDown.style.display.includes('none')) {
        arrowTop.style.display = 'none';
        arrowDown.style.display = 'block';
      } else {
        arrowTop.style.display = 'block';
        arrowDown.style.display = 'none';
      }
    }
  };

  return (
    <div ref={outSidRef} className="2xl:pr-6">
      <p className="text-white text-2xl px-8 2xl:px-2 font-Mulish font-extrabold py-1 flex justify-between items-center md:px-[6rem]">
        Progress
      </p>
      <div
        className={`flex flex-row 2xl:flex-col 2xl:w-[25rem] 2xl:h-[80vh] 2xl:overflow-y-auto md:w-[20rem]
        2xl:scrollbar-thumb-gray-100 2xl:scrollbar-track-gray-900 scrollbar-thin
         ${!isDesk && 'progressContainer'} m-auto py-5`}
      >
        {progress
          .map((day, index) => {
            return (
              <div
                key={`index_${index}`}
                data-task={stringify(day.task)}
                {...longPress}
                className={`text-white ${
                  !isDesk ? 'progressComponent' : 'addButton'
                }
                mx-3 py-5 px-5 rounded-lg font-Mulish 2xl:mt-2 h-fit md:w-[40rem]`}
              >
                <p className="w-96 2xl:w-80 2xl:flex 2xl:justify-between md:w-56">
                  {day.date}
                  {isDesk && (
                    <span>
                      <IoIosArrowDown
                        className="cursor-pointer arrowDown"
                        style={{ display: 'block' }}
                        task-date={day.date}
                        onClick={toggleProgressDetails}
                      />
                      <IoIosArrowUp
                        className="cursor-pointer arrowTop"
                        style={{ display: 'none' }}
                        task-date={day.date}
                        onClick={toggleProgressDetails}
                      />
                    </span>
                  )}
                </p>
                <p>
                  {day.task.length} task
                  {day.task.length === 1 ? '' : 's'}
                </p>
                <p className="flex justify-between items-center">
                  Progress <span>{day.progress}%</span>
                </p>
                <div className="w-full bg-white h-1 my-1 rounded-md">
                  <div
                    className="h-1 bg-amber-600 rounded-md"
                    style={{ width: `${day.progress}%` }}
                  />
                </div>
                {!isDesk ? (
                  <div className="max-h-96 bottom-0 overflow-y-auto">
                    {day.task.map((progressData, index) => {
                      return (
                        isProgressDetails && (
                          <ProgressDetails
                            key={`index_${index}`}
                            progressedTasks={progressData}
                            toggleTaskDetails={toggleTaskDetails}
                            setTaskDetails={setTaskDetails}
                          />
                        )
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className={`max-h-96 overflow-y-auto ${
                      isDesk && 'progressDetails'
                    } 2xl:max-h-max`}
                    style={{ display: 'none' }}
                  >
                    {day.task.map((progressData, index) => {
                      return (
                        <ProgressDetails
                          key={`index_${index}`}
                          progressedTasks={progressData}
                          toggleTaskDetails={toggleTaskDetails}
                          setTaskDetails={setTaskDetails}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default Progress;
