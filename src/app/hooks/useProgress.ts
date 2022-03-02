import { useEffect, useState } from 'react';
import { ITasks } from '../types';
import { localStorageGet } from '../utils/helpers/localStorage';
import { decrypt } from '../utils/helpers/cryptoJS';

interface ISortedByDate {
  date: string;
  task: ITasks[];
  progress: number;
}

const useProgress = (tasks: ITasks[]) => {
  const dateMemo = useState<string>();
  const [sortedByDate] = useState<ISortedByDate[]>([]);
  const [userTasks, setUserTasks] = useState<ITasks[]>([]);

  const token = localStorageGet('to_do_token_');
  const email = decrypt(token as string);

  useEffect(() => {
    setUserTasks(tasks.filter((task) => task.owner_email === email));
  }, [tasks]);

  userTasks.forEach(({ date }) => {
    if (dateMemo.indexOf(date) === -1) dateMemo.push(date);
  });

  dateMemo.map((memorizedDate) => {
    const DalyTask: ITasks[] = [];
    userTasks.map((task) => {
      if (task.date === memorizedDate) {
        DalyTask.push(task);
        return sortedByDate.push({
          date: memorizedDate as string,
          task: DalyTask,
          progress: 0,
        });
      }
    });
    return 0;
  });

  const progressArchive = sortedByDate.filter(
    (data, index, self) =>
      index ===
      self.findIndex((element) => element.date === data.date),
  );

  const updateProgress = () => {
    progressArchive.forEach((task) => {
      const completedTask = task.task.filter(
        (task) => task.completed,
      );
      const progress =
        (completedTask.length * 100) / task.task.length;
      task.progress = Math.floor(progress);
    });
  };

  updateProgress();

  return {
    progressArchive,
    updateProgress,
  };
};

export default useProgress;
