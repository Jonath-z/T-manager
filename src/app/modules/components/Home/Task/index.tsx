import React, { useRef } from 'react';
import useIsVisibleOnScreen from '../../../../hooks/useIsVisibleOnScreen';
import { useTasks } from '../../../../contexts/task';
import { decrypt } from '../../../../utils/helpers/cryptoJS';
import { localStorageGet } from '../../../../utils/helpers/localStorage';
import useWeb3 from '../../../../hooks/useWeb3';

const Tasks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { tasks, callback } = useTasks();
  const { updateTaskStatus } = useWeb3();
  useIsVisibleOnScreen(
    {
      root: ref.current as HTMLDivElement,
      rootMargin: '0px',
      threshold: 1,
    },
    ref.current?.childNodes as NodeList,
  );
  const token = localStorageGet('to_do_token_');
  const email = decrypt(token as string);

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

  const toggleTaskStatus = (e: any) => {
    (async () => {
      await updateTaskStatus(e.target.value);
      callback();
    })();
  };

  return (
    <>
      <p className="text-white text-2xl px-8 font-Mulish font-extrabold">
        Task
        {toDayTasks.length !== 0 && toDayTasks.length === 1
          ? ''
          : 's'}
        ({toDayTasks.length})
      </p>
      <div
        ref={ref}
        className="root px-8 mt-9 absolute bottom-0 left-0 right-0 top-1/2 overflow-y-scroll py-1 pb-10"
      >
        {toDayTasks
          .map((userTask, index) => {
            return (
              <div
                key={`index_${index}`}
                className={`tasks bg-slate-600 py-5 px-2 rounded-lg mt-3 flex items-center  bg-opacity-70`}
              >
                <input
                  type="checkbox"
                  value={userTask.id}
                  onChange={toggleTaskStatus}
                  name="task"
                  className="form-checkbox rounded-full outline-hidden text-[#00B4D8]"
                  checked={userTask.completed}
                />
                <label
                  htmlFor="task"
                  className="pl-2 text-white font-Mulish inline-flex justify-between items-center w-full"
                >
                  {userTask.title}
                  <span className="text-xs text-slate-200">
                    {userTask.start_time} up to {userTask.end_time}
                  </span>
                </label>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default Tasks;
