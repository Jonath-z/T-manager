import { ITasks } from '../types';

const useProgress = (tasks: ITasks[], userTasks: ITasks[]) => {
  const dateMemo: string[] = [];
  const sortedByDate: {
    date: string;
    task: ITasks[];
    progress: number;
  }[] = [];

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
  });

  ////////////////// remove diplicated data ////////////////////
  const sortedByDateDiplicateRemoved = sortedByDate.filter(
    (data, index, self) =>
      index ===
      self.findIndex((element) => element.date === data.date),
  );

  ///////////////// update progress //////////////////
  sortedByDateDiplicateRemoved.forEach((task) => {
    const completedTask = task.task.filter((task) => task.completed);
    const progress = (completedTask.length * 100) / task.task.length;
    task.progress = Math.floor(progress);
  });
  return sortedByDateDiplicateRemoved;
};

export default useProgress;
