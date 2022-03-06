import { useCallback, useRef, useState } from 'react';
import useProgress from '../../../../../hooks/useProgress';
import { ITasks } from '../../../../../types';
import { useLongPress } from 'use-long-press';
import ProgressView from '../ProgressView';
import { stringify } from 'flatted';
import useClickOutside from '../../../../../hooks/useClickOutside';

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
  const [isProgressView, setIsProgressView] = useState(false);
  const progress = useProgress(tasks, userTasks);

  window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const longPressAction = () => {
    toggleTaskContainer();
    setIsProgressView(!isProgressView);
  };

  const longPress = useLongPress(longPressAction, {
    threshold: 500,
  });

  const clickRef = useClickOutside(longPressAction);

  return (
    <div ref={clickRef}>
      <p className="text-white text-2xl px-8 font-Mulish font-extrabold py-1 flex justify-between items-center">
        Progress
      </p>
      <div className="flex flex-row progressContainer m-auto py-5">
        {progress
          .map((day, index) => {
            return (
              <div
                key={`index_${index}`}
                data-task={stringify(day.task)}
                {...longPress}
                className="text-white progressComponent mx-3 py-5 px-5 rounded-lg font-Mulish"
              >
                <p className="w-[90vw]">{day.date}</p>
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
                <div className="max-h-96 bottom-0 overflow-y-scroll">
                  {isProgressView &&
                    day.task.map((progressData, index) => {
                      return (
                        <ProgressView
                          key={`index_${index}`}
                          progressedTasks={progressData}
                          toggleTaskDetails={toggleTaskDetails}
                          setTaskDetails={setTaskDetails}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default Progress;
