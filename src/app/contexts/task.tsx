import {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from 'react';

import web3Service from '../services/web3';

const initialState = [
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
];

type AccountCxtType = {
  account: string;
  walletConnected: boolean;
  failedToConnect: boolean;
};

const defaultAccountCxtData: AccountCxtType = {
  account: '',
  walletConnected: false,
  failedToConnect: false,
};

const TasksContext = createContext(initialState);
export const useTasks = () => useContext(TasksContext);

const AccountContext = createContext<AccountCxtType>(
  defaultAccountCxtData,
);
export const useAccount = () => useContext(AccountContext);

const UpdateTasksContext = createContext<any>(null);
export const useUpdateTasks = () => useContext(UpdateTasksContext);

const TasksProvider: FC = ({ children }): JSX.Element => {
  const [tasks] = useState<any[]>([]);
  const [account, setAccount] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [failedToConnect, setFailedToConnect] = useState(false);

  const taskExists = (taskCalled: string) => {
    return tasks.some((task) => {
      return JSON.stringify(task) === taskCalled;
    });
  };

  const getTasks = async () => {
    try {
      const count = await web3Service.Contract.methods
        .taskCount()
        .call();
      for (let i = 0; i <= count; i++) {
        const task = await web3Service.Contract.methods
          .tasks(i)
          .call();
        if (!taskExists(JSON.stringify(task))) tasks.push(task);
      }
    } catch (err) {
      setFailedToConnect(true);
      setWalletConnected(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const account =
          await web3Service.web3_provider.eth.requestAccounts();
        setAccount(account[0]);
        await getTasks();
        setWalletConnected(true);
        setFailedToConnect(false);
      } catch (err) {
        alert('error when connecting to Metamask');
        setFailedToConnect(true);
        setWalletConnected(false);
      }
    };
    load();
  }, []);

  return (
    <TasksContext.Provider value={tasks}>
      <AccountContext.Provider
        value={{ account, walletConnected, failedToConnect }}
      >
        <UpdateTasksContext.Provider value={getTasks}>
          {children}
        </UpdateTasksContext.Provider>
      </AccountContext.Provider>
    </TasksContext.Provider>
  );
};

export default TasksProvider;
