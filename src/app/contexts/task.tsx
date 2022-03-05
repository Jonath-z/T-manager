import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';

import useWeb3 from '../hooks/useWeb3';
import { ITasks } from '../types';

const initialState = {
  tasks: [
    {
      id: -1,
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
  toggleTaskStatus: () => null,
  deleteTaskInContext: () => null,
  updateAfterAddTask: async () => undefined,
};

interface TaskCxtType {
  tasks: ITasks[];
  toggleTaskStatus: (_task_id: number) => void;
  deleteTaskInContext: (_task_id: number) => void;
  updateAfterAddTask: () => Promise<void>;
}

interface AccountCxtType {
  account: string;
  walletConnected: boolean;
  failedToConnect: boolean;
}

const defaultAccountCxtData: AccountCxtType = {
  account: '',
  walletConnected: false,
  failedToConnect: false,
};

const TasksContext = createContext<TaskCxtType>(initialState);
export const useTasks = () => useContext(TasksContext);

const AccountContext = createContext<AccountCxtType>(
  defaultAccountCxtData,
);
export const useAccount = () => useContext(AccountContext);

const TasksProvider: FC = ({ children }): JSX.Element => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [account, setAccount] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [failedToConnect, setFailedToConnect] = useState(false);

  const { web3_provider, Contract } = useWeb3();

  const getTasks = async () => {
    try {
      const count = await Contract.methods.taskCount().call();
      const taskMemory = [];
      for (let i = 0; i <= count; i++) {
        const task = await Contract.methods.tasks(i).call();
        taskMemory.push(task);
      }
      setTasks(taskMemory);
      return taskMemory;
    } catch (err) {
      setFailedToConnect(true);
      setWalletConnected(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const account = await web3_provider.eth.requestAccounts();
        setAccount(account[0]);
        await getTasks();
        setWalletConnected(true);
        setFailedToConnect(false);
      } catch (err) {
        alert('error when connecting to Metamask');
        setFailedToConnect(true);
        setWalletConnected(false);
      }
    })();
  }, []);

  const toggleTaskStatus = (_task_id: number) => {
    setTasks((prevTasks) => {
      const updates = [...prevTasks];
      if (updates.length !== 0)
        updates.map((task) => {
          if (task.id === _task_id) task.completed = !task.completed;
        });
      return updates;
    });
  };

  const deleteTaskInContext = (_task_id: number) => {
    if (tasks.length !== 0) {
      const newTasks = tasks.filter((task) => task.id !== _task_id);
      setTasks(() => [...newTasks]);
    }
  };

  const updateAfterAddTask = async () => {
    await getTasks();
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        toggleTaskStatus,
        updateAfterAddTask,
        deleteTaskInContext,
      }}
    >
      <AccountContext.Provider
        value={{ account, walletConnected, failedToConnect }}
      >
        {children}
      </AccountContext.Provider>
    </TasksContext.Provider>
  );
};

export default TasksProvider;
