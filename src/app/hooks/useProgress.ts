import { useState } from 'react';
import { ITasks } from '../types';

interface ISortedByDate {
  date: string;
  task: ITasks[];
  progress: number;
}

const useProgress = (userTasks: ITasks[]) => {
  const dateMemo = useState<string>();
  const [sortedByDate] = useState<ISortedByDate[]>([]);

  userTasks.forEach(({ date }) => {
    if (dateMemo.indexOf(date) === -1) dateMemo.push(date);
  });

  dateMemo.forEach((memorizedDate) => {
    const DalyTask = [];
    for (let i = 0; i <= userTasks.length; i++) {
      if (userTasks[i] !== undefined) {
        if (userTasks[i].date === memorizedDate) {
          DalyTask.push(userTasks[i]);
          sortedByDate.push({
            date: memorizedDate as string,
            task: DalyTask,
            progress: 0,
          });
        }
      }
    }
  });

  const sortedByDateRemovedDuplicated = sortedByDate.filter(
    (data, index, self) =>
      index ===
      self.findIndex((element) => element.date === data.date),
  );

  sortedByDateRemovedDuplicated.forEach((task) => {
    task.task.forEach((currentTask, index) => {
      if (currentTask.completed) {
        const progress = (index * 100) / task.task.length;
        task.progress = progress;
      }
    });
  });

  // console.log(sortedByDateRemovedDuplicated);
  return sortedByDateRemovedDuplicated;
};

export default useProgress;
