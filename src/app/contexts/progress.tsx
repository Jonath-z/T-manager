import { ITasks } from '../types';
import { localStorageGet } from '../utils/helpers/localStorage';
import { decrypt } from '../utils/helpers/cryptoJS';
import { useTasks } from './task';
import {
  useMemo,
  useEffect,
  useState,
  useContext,
  createContext,
} from 'react';

interface ProgressCxt {
  date: string;
  task: ITasks[];
  progress: number;
}

const initialState: ProgressCxt[] = [
  {
    date: '',
    task: [
      {
        id: 'id',
        title: 'title',
        content: '',
        remind: false,
        start_time: '00:00',
        end_time: '00:00',
        completed: false,
        owner_name: '',
        owner_email: '',
        date: '',
      },
    ],
    progress: 0,
  },
];

const Progress = createContext<ProgressCxt[]>(initialState);
export const useProgress = () => useContext(Progress);

const ProgressProvider = ({ children }: any) => {
  const { tasks, callback } = useTasks();
  console.log(tasks);
  // const dateMemo = useState<string>();
  const dateMemo = useMemo((): string[] => {
    return [];
  }, []);

  const sortedByDate = useMemo((): ProgressCxt[] => {
    return [];
  }, []);
  // const [sortedByDate] = useState<ISortedByDate[]>([]);
  const [userTasks, setUserTasks] = useState<ITasks[]>([]);
  const [progressArchives, setProgressArchives] = useState<
    ProgressCxt[]
  >([]);

  const token = localStorageGet('to_do_token_');
  const email = decrypt(token as string);

  useEffect(() => {
    tasks.length > 0 &&
      setUserTasks(
        tasks.filter((task) => task.owner_email === email),
      );
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

  ////////////////// remove diplicated data ////////////////////
  useEffect(() => {
    setProgressArchives(
      sortedByDate.filter(
        (data, index, self) =>
          index ===
          self.findIndex((element) => element.date === data.date),
      ),
    );
  }, [dateMemo, sortedByDate]);

  ///////////////// update progress //////////////////
  useEffect(() => {
    progressArchives.forEach((task) => {
      const completedTask = task.task.filter(
        (task) => task.completed,
      );
      const progress =
        (completedTask.length * 100) / task.task.length;
      task.progress = Math.floor(progress);
    });
  }, [
    progressArchives,
    tasks,
    userTasks,
    dateMemo,
    setProgressArchives,
    sortedByDate,
  ]);

  //   updateProgress();
  console.log(progressArchives);
  useEffect(() => {
    (async () => await callback())();
  }, []);

  return (
    <Progress.Provider value={progressArchives}>
      {children}
    </Progress.Provider>
  );
};

export default ProgressProvider;
