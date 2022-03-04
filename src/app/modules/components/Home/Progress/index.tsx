import { useProgress } from '../../../../contexts/progress';

const Progress = () => {
  const progress = useProgress();
  // console.log(progress);

  return (
    <div>
      <p className="text-white text-2xl px-8 font-Mulish font-extrabold py-1 flex justify-between items-center">
        Progress
      </p>
      <div className="flex flex-row progressContainer m-auto py-5">
        {progress
          .map((day, index) => {
            return (
              <div
                key={`index_${index}`}
                className="text-white progressComponent mx-3 py-5 px-5 bg-opacity-30 rounded-lg font-Mulish"
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
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
};

export default Progress;
