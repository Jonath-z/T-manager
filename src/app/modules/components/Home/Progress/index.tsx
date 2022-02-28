import React from 'react';
import useProgress from '../../../../hooks/useProgress';

const Progress = ({ userTasks }: any) => {
  const progress = useProgress(userTasks);
  return (
    <div className="w-full flex">
      {progress.map((day) => {
        return (
          <div className="">
            <p>{day.date}</p>
            <p>{day.task.length} tasks </p>
            <p>
              Progress{' '}
              {day.progress === 0 && day.progress < 100
                ? `${day.progress} Task unacheved`
                : `${day.progress} All tasks acheved`}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;
